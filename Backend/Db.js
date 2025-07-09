var mongoose = require("mongoose");

    mongoose.connect("mongodb+srv://user:user@cluster0.qkcortn.mongodb.net/MovieApp?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>{console.log("db connected")

    })
    .catch((err)=>{console.log(err)

    });