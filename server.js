const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.post('/send-email', function (req, res) {

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
        return console.log(error,'Message was not sent')
      }
      // Email sent
      else {
          res.render('/contact')
      }
  });
});
  

app.use(express.static(path.join(__dirname, '/public')));
//app.use(express.static(__dirname + '/views'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/Script'));
//Store all JS and CSS in Scripts folder.

  
app.use('/',router);

router.get('/',function(req, res){
  res.sendFile(path.join(__dirname+'/index.html'));
});
  
router.get('/home',function(req, res){
  res.sendFile(path.join(__dirname+'/home.html'));
});
  
router.get('/about',function(req, res){
  res.sendFile(path.join(__dirname+'/about.html'));
});
  
router.get('/design',function(req, res){
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
  
app.use('*',function(req, res){
  res.send('Error 404: Not Found!');
});
  
app.listen(3000,function(){
  console.log('Server running at Port 3000');
});