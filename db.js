let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/LostAndFound',{useNewUrlParser:true});

let LostAndFoundSchema = new mongoose.Schema({
    kind:String,
    describe:String,
    registeUsername:{unique:true,type:String},
    registePassword:String,
    // createDate:{type:Date,default:Date.now()}//用户的创建时间是系统现在的时间
})

module.exports = mongoose.model('LostAndFound',LostAndFoundSchema)

// let UserInformation = new mongoose.Schema({
//     registeUsername:{unique:true,type:String},
//     registePassword:String,
//     createDate:{type:Date,default:Date.now()}//用户的创建时间是系统现在的时间
// })

// module.exports = mongoose.model('LostAndFound',UserInformation)