const fileshared=require('../MODEL/filesharingschema')
const files = require('../MODEL/fileupload')
const deletefile = async (req, res) => {

    try {

        const did = req.body.deleteid;
        const finder=await files.findOne({filename:did});
        const result = await files.deleteOne({ filename: did });
        console.log(result);
        if (result.deletedCount == 1) {
         
const deletesharedfile= await fileshared.deleteMany({fileId:finder._id});
            res.send({
                msg: 'file deleted'
            })
        } else {

            res.send({
                msg: 'file not deleted'
            })
        }

    } catch (e) {
        res.send({
            msg: 'server problem:error deletion'
        })
        console.log('error deletion');

    }



}
module.exports = deletefile