const mongoose=require('mongoose');
const filesharingschema=new mongoose.Schema({

fileId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'File',
    require:true
},

sharedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'UserRegister',
    require:true
},

sharedTo:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'UserRegister',
    require:true
},
sharedDate: {
    type: Date,
    default: Date.now,
  }

});

const filesharing=mongoose.model('fileshared',filesharingschema);

module.exports=filesharing