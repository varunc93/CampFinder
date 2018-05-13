var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/middleware");

router.get("/", function(req, res){
   Campground.find({}, function(err, campground){
        if(err) {
            req.flash("error", "No campground found!");
            console.log(err);
        }
        else {
            res.render("campgrounds/index",{campgrounds: campground, page: 'campgrounds'});
        }
   });
});

router.post("/", middleware.isLoggedIn, function(req, res){
    var campname = req.body.name;
    var image = req.body.imgsrc;
    var description = req.body.description;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var campgroundnew = {name: campname, image:image, description:description, price:price, author:author};
    Campground.create(campgroundnew, function(err,campground){
        if(err) {
            req.flash("error", "Campground cannot be created!");
            console.log(err);
        }
        else{
            req.flash("success", "Campground created succesfully!");
            res.redirect("/campgrounds");
        }    
    });
});

//Create a  campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

//Shows info about one campground
router.get("/:id", function(req, res){
    //find Campgrounds using provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
        if(err){
            req.flash("error", "Campground cannot be found!");
            res.redirect("back");
            console.log(err || !campground);
        } 
        //render show template with the Campground that is found
        else {
            res.render("campgrounds/show", {campgrounds:campground});
        }
    });
});

//Edit campground route
router.get("/:id/edit", middleware.checkauthorizedusercampground, function(req, res){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, campground){
            if(err){
                req.flash("error", "Campground cannot be found!");
                console.log(err);
            }
            else { 
                if(campground.author.id.equals(req.user._id)) {
                    res.render("campgrounds/edit", {campgrounds:campground});
                }    
            } 
        });
    }
});

//Update campground route
router.put("/:id", middleware.checkauthorizedusercampground, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
       if(err){
           req.flash("error", "Campground cannot be found!");
           console.log(err);
        } 
       else{
            req.flash("success", "Campground updated successfully!");
            res.redirect("/campgrounds/" + req.params.id);   
        }
    });
});

//Delete campground route
router.delete("/:id", middleware.checkauthorizedusercampground, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            req.flash("error", "Campground cannot be found!");
            console.log(err);
        }
        req.flash("success", "Campground edited successfully!");
        res.redirect("/campgrounds"); 
    });    
});


module.exports = router;
