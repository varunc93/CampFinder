var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware/middleware");

//Comments Routes

router.get("/new", middleware.isLoggedIn, function(req,res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            req.flash("error", "Unable to find Campground!");
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            res.render("comments/new", {campground: campground});
        }
    });
});

router.post("/", middleware.isLoggedIn, function(req,res){
    
    //Find the campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if (err){
            req.flash("error", "Unable to find campground!");
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Unable to add comment!");
                    console.log(err);
                }
                else{
                    //Add username and ID to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //Save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Comment added successfully!");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

router.get("/:comment_id/edit", middleware.checkauthorizedusercomment, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
       if(err || !campground) {
           req.flash("error", "Campground not found!");
           res.redirect("back");
       }
       else {
            Comment.findById(req.params.comment_id, function(err, comment) {
                if(err){
                    req.flash("error", "Cannot find comment!");
                    console.log(err);
                }
                else {
                    res.render("comments/edit", {campgrounds_id: req.params.id, comment: comment});      
                }
            });
       }
    });
});

router.put("/:comment_id", middleware.checkauthorizedusercomment, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
        if(err){
            req.flash("error", "Cannot find comment!");
            console.log(err);
        }
        else {
            req.flash("success", "Comment edited successfully!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.delete("/:comment_id", middleware.checkauthorizedusercomment, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            req.flash("error", "Cannot find comment!");
            console.log(err);
        }
        else {
            req.flash("success", "Comment deleted successfully!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;
