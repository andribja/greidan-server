var chgpass = require('config/chgpass'); 
var register = require('config/register'); 
var login = require('config/login');   
var ad = require('config/ad');

module.exports = function(app) {        


     app.get('/', function(req, res) {       

          res.end("Node-Android-Project");    
     });     

     app.post('/login',function(req,res){        
          var email = req.body.email;             
          var password = req.body.password;       

          login.login(email,password,function (found) {           
               console.log(found);             
               res.json(found);    
          });    
     });     

     app.post('/register',function(req,res){         
          var email = req.body.email;             
          var password = req.body.password;     

          console.log("got", email, password);  

          register.register(email,password,function (found) {             
               console.log(found);             
               res.json(found);    
          });     
     });

     app.get('/ad', function(req, res) {
            var ad = ad.getAd;
            res
     });

     app.post('/ad', function(res, req) {
          var title = req.body.title;
          var content = req.body.content;
          var category = req.body.category;
          var author = req.body.email;

          ad.postAd(title, content, category, author, function(found) {
               console.log(found);
               res.json(found);
          });
     });

     app.post('/api/chgpass', function(req, res) {       
          var id = req.body.id;                 
               var opass = req.body.oldpass;         
          var npass = req.body.newpass;       

          chgpass.cpass(id,opass,npass,function(found){           
               console.log(found);             
               res.json(found);    
          });     
     });     

     app.post('/api/resetpass', function(req, res) {         

          var email = req.body.email;         

          chgpass.respass_init(email,function(found){             
               console.log(found);             
               res.json(found);    
          });     
     });     

     app.post('/api/resetpass/chg', function(req, res) {         
          var email = req.body.email;         
          var code = req.body.code;       
          var npass = req.body.newpass;       

     chgpass.respass_chg(email,code,npass,function(found){           
          console.log(found);             
          res.json(found);    
     
          });
     });
};
