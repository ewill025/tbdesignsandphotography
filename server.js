import { request } from 'https';

var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var bodyParser = require('body-parser');

app.post('/contact', function (req, res) {
  
  //Setup Nodemailer transport
  let transporter = nodemailer.createTransport( {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
      auth: {
          user: "ewill025@gmail.com",
          pass: "9122272856" 
      }
  });
  //Mail options
  let mailOpts = {
      from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
      to: 'ewill025@gmail.com',
      subject: 'New Message From' + req.body.name,
      text: req.body.message 
  };
  transporter.sendMail(mailOpts, function (error, response) {
      //Email not sent
      if (error) {
          res.render('contact', { msg: 'Error occured, message not sent.', err: true, page: 'contact' })
      }
      // Email sent
      else {
          res.render('contact', { msg: 'Message sent! Thank you.', err: false, page: 'contact' })
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
  
app.use('*',function(req, res){
  res.send('Error 404: Not Found!');
});
  
app.listen(3000,function(){
  console.log('Server running at Port 3000');
});