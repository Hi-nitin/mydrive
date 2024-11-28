const fileupload_M = require('../MODEL/fileupload')
const jwt = require('jsonwebtoken');
const User = require('../MODEL/signup')
const sharedfile=require('../MODEL/filesharingschema')


const myfiles = async (req, res) => {


   try {
      const token = req.cookies.token;
      // console.log(token.token);
      if (!token) { return res.send({ success: false, msg: 'cookie failed' }) }
      try {

         const token_data = jwt.verify(token, 'key');
         const data = await sharedfile.find({ sharedTo: token_data.userId }).populate('sharedBy fileId');
         const clientdata = {
            data: data
         }
         console.log(clientdata);
         
         res.send(clientdata)


      } catch (er) {
         res.send({ msg: 'token error'+er })
      }

   } catch (e) {
      console.log(e);

   }

}

module.exports = myfiles