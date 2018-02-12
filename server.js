const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

app.use(bodyParser.urlencoded({extended: true}));
app.use(validator());


app.post('/send-email', function (req, res) {
  //validates contact form
  req.checkBody('name', "Name is required.").notEmpty();
  req.checkBody('email', "Enter a valid email address.").notEmpty().isEmail();
  req.checkBody('message', "Enter a message.").notEmpty();
 const errors = req.validationErrors();
  if (errors) {
    res.send(errors);
    return;
  } else {
    let mailOpts, smtpTrans;
    //Setup Nodemailer transport
    smtpTrans = nodemailer.createTransport( {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
        auth: {
            user: "ewill025@gmail.com",
            pass: "9122272856" 
        }
    });
    //Mail options
     mailOpts = {
        from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
        to: 'ericwilliamsjr@live.com',
        subject: 'You Have A New Message!',
        text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
    };
    smtpTrans.sendMail(mailOpts, function (error, response) {
        //Email not sent
        if (error) {
          res.redirect('/error')
        }
        // Email sent
        else {
        res.redirect('/sent')
        }
    });
  
  }
});


  
  

app.use(express.static(path.join(__dirname, '/public')));
//app.use(express.static(__dirname + '/views'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/Script'));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/fonts'));
app.use(express.static(__dirname + '/images'));
//Store all JS and CSS in Scripts folder.

  
app.use('/',router);

router.get('/',function(req, res){
  res.sendFile(path.join(__dirname+'/index.html'));
});
  
app.get('/home',function(req, res){
  res.sendFile(path.join(__dirname+'/home.html'));
});
  
router.get('/about',function(req, res){
  res.sendFile(path.join(__dirname+'/about.html'));
});
  
router.get('/graphic_designs',function(req, res){
 res.sendFile(path.join(__dirname+'/design.html'));
});

router.get('/drawing',function(req, res){
    res.sendFile(path.join(__dirname+'/drawing.html'));
  });
    
  router.get('/photography',function(req, res){
    res.sendFile(path.join(__dirname+'/photography.html'));
  });
    
  router.get('/contact',function(req, res){
    res.sendFile(path.join(__dirname+'/contact.html'));
  });

  router.get('/sent',function(req, res){
    res.sendFile(path.join(__dirname+'/sent.html'));
  });

  router.get('/error',function(req, res){
    res.sendFile(path.join(__dirname+'/error.html'));
  });

  router.get('/videos',function(req, res){
    res.sendFile(path.join(__dirname+'/videos.html'));
  });
  
app.use('*',function(req, res){
  res.send('Error 404: Not Found!');
});
  
app.listen(3000,function(){
  console.log('Server running at Port 3000');
});