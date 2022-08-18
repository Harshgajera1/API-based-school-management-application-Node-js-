const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/school').then(()=>{console.log('mongodb connect')}).catch((err)=>{
    console.log(err);
});
