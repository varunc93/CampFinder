var mongoose = require("mongoose");
var Campground = require("../models/campground");
var Comment = require("../models/comment");

var data = [
    {
        name: "Camp Twilight", 
        image:"https://images.unsplash.com/photo-1496080174650-637e3f22fa03?ixlib=rb-0.3.5&s=814ace99de31009314db375615401326&auto=format&fit=crop&w=1006&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec malesuada lorem, in venenatis tellus. Proin in suscipit odio. Nullam sodales sapien dapibus, feugiat neque non, mollis sapien. Vivamus malesuada eleifend tincidunt. Suspendisse potenti. Aenean venenatis commodo velit, sed finibus mauris lobortis et. Praesent eget justo auctor, elementum ante nec, volutpat quam. Curabitur varius leo vitae nibh bibendum dapibus. Nam nec pulvinar nulla, eu vestibulum neque. Curabitur eget diam eget arcu faucibus volutpat at et metus. Donec venenatis diam non ligula imperdiet congue. Etiam commodo odio ac risus tempor, at mollis ante sollicitudin."
        
    
    },
        
    
    {
        name: "Camp StarLight", 
        image:"https://images.unsplash.com/photo-1455122990967-5f5b1030f719?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=18e01f89892b18ede93bb4dd2ce1d070&auto=format&fit=crop&w=1050&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec malesuada lorem, in venenatis tellus. Proin in suscipit odio. Nullam sodales sapien dapibus, feugiat neque non, mollis sapien. Vivamus malesuada eleifend tincidunt. Suspendisse potenti. Aenean venenatis commodo velit, sed finibus mauris lobortis et. Praesent eget justo auctor, elementum ante nec, volutpat quam. Curabitur varius leo vitae nibh bibendum dapibus. Nam nec pulvinar nulla, eu vestibulum neque. Curabitur eget diam eget arcu faucibus volutpat at et metus. Donec venenatis diam non ligula imperdiet congue. Etiam commodo odio ac risus tempor, at mollis ante sollicitudin."
        
    },
        
    
    {
        name: "Camp SunLight", 
        image:"https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ffdbb5e90a2c129258d4540ef0f29d06&auto=format&fit=crop&w=1050&q=801",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec malesuada lorem, in venenatis tellus. Proin in suscipit odio. Nullam sodales sapien dapibus, feugiat neque non, mollis sapien. Vivamus malesuada eleifend tincidunt. Suspendisse potenti. Aenean venenatis commodo velit, sed finibus mauris lobortis et. Praesent eget justo auctor, elementum ante nec, volutpat quam. Curabitur varius leo vitae nibh bibendum dapibus. Nam nec pulvinar nulla, eu vestibulum neque. Curabitur eget diam eget arcu faucibus volutpat at et metus. Donec venenatis diam non ligula imperdiet congue. Etiam commodo odio ac risus tempor, at mollis ante sollicitudin."
        
    }
        
    ];

function seedDB(){
    // Delete Campgounds
    Campground.remove({}, function(err){
        if(err)
            console.log(err);
        else    
            console.log("Destroy!");
            Comment.remove({}, function(err){
                if(err)
                    console.log(err);
            });
    });
    
    //Create campgrounds
    data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if (err)
                console.log(err);
            else {
                console.log("Create");
                Comment.create(
                    {
                        text:"This is a comment!",
                        author:"XYZ"
                    }, function(err, comment){
                    if(err)
                        console.log(err);
                    else {
                        campground.comments.push(comment);
                        campground.save();
                    }
                });
            }
        });
    });
}

module.exports = seedDB;