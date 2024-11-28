const fileupload_M = require('../MODEL/fileupload')
const jwt = require('jsonwebtoken');
const User = require('../MODEL/signup')


const myfiles = async (req, res) => {


   try {
      const token = req.cookies.token;
      // console.log(token.token);
      if (!token) { return res.send({ success: false, msg: 'cookie failed' }) }
      try {

         const token_data = jwt.verify(token, 'key');
         const data = await fileupload_M.find({ userId: token_data.userId }).populate('userId');
         const clientdata = {
            data: data
         }
         res.send(clientdata)


      } catch (er) {
         res.send({ msg: 'token error' })
      }

   } catch (e) {
      console.log(e);

   }

}

module.exports = myfiles