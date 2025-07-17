var mongoose = require("mongoose");

    mongoose.connect("mongodb+srv://user:user@cluster0.qkcortn.mongodb.net/MovieApp?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>{console.log("PRESENTING TEAMBLACKS POPCORNPIX,CONNECTION SUCCESSFULL!!!!!!!")

    })
    .catch((err)=>{console.log(err)

    });