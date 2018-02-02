var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
  

//app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(__dirname + '/views'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/Script'));
//Store all JS and CSS in Scripts folder.

  
app.use('/',router);
  
router.get('/',function(req, res){
  res.sendFile('/index.html');
});
  
router.get('/about',function(req, res){
  res.sendFile('/about.html');
});
  
router.get('/design',function(req, res){
 res.sendFile('design.html');
});

router.get('/drawing',function(req, res){
    res.sendFile('drawing.html');
  });
    
  router.get('/photography',function(req, res){
    res.sendFile('photography.html');
  });
    
  router.get('/contact',function(req, res){
    res.sendFile('contact.html');
  });
  
app.use('*',function(req, res){
  res.send('Error 404: Not Found!');
});
  
app.listen(3000,function(){
  console.log('Server running at Port 3000');
});