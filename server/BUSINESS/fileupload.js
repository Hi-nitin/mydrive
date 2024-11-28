const fileupload_MD = require('../MODEL/fileupload');
const jwt = require('jsonwebtoken');


const fileupload = (req, res) => {


    try {
        const token = req.cookies.token;

        jwt.verify(token, 'key', (err, decoded) => {
            if (err) {
                console.error('Token verification failed:', err);
            } else {

                req.files.map(async (val) => {
                    const filedata = new fileupload_MD({
                        originalname: val.originalname,
                        filename: val.filename,
                        userId: decoded.userId
                    })

                    const savedata = await filedata.save();
                    console.log(savedata);
                })

                res.send({
                    succcess: true
                })
            }
        });

    } catch (e) {
        console.log('error is:' + e);
        res.send({msg:'error file upload'})

    }

}

module.exports = fileupload