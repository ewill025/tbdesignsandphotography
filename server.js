var express = require('express');
var app = express();
var router = express.Router();
  
var path = __dirname + '/views/';
  
app.use('/',router);
  
router.get('/',function(req, res){
  res.sendFile(path + 'index.html');
});
  
router.get('/about',function(req, res){
  res.sendFile(path + 'about.html');});
  
router.get('/design',function(req, res){
  res.sendFile(path + 'design.html');
});

router.get('/drawing',function(req, res){
    res.sendFile(path + 'drawing.html');
  });
    
  router.get('/photography',function(req, res){
    res.sendFile(path + 'photography.html');});
    
  router.get('/contact',function(req, res){
    res.sendFile(path + 'contact.html');
  });
  
app.use('*',function(req, res){
  res.send('Error 404: Not Found!');
});
  
app.listen(3000,function(){
  console.log('Server running at Port 3000');
});