var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res){
    res.render("landingpage");
});

//Authorization Routes

router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    if(req.body.adminCode === 'secretcode123') {
      newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message, page: 'register'});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to CampFinder, " + req.body.username + "!");
            res.redirect("/campgrounds");    
        });
    }); 
});

router.get("/login", function(req, res){
    res.render("login", {page: 'login'});
});

router.post("/login", passport.authenticate("local", {
    //successRedirect: "/campgrounds",
    failureRedirect: "/login",
    failureFlash:'Login failed'
}),function(req,res){
    req.flash("success", "You have logged in successfully!");
    res.redirect("/campgrounds");
});

//Logout Route
router.get("/logout", function(req, res){
   req.logout(); 
   req.flash("success", "You have logged out successfully!");
   res.redirect("/campgrounds");
});


module.exports = router;