const filesharingschema = require('../MODEL/filesharingschema')
const filesharing = async (req, res) => {
    try {
        const filesharedinsert = new filesharingschema({
            fileId: req.body.filesharedId,
            sharedBy: req.body.sharedBy,
            sharedTo: req.body.sharedTo
        })
        const result = await filesharedinsert.save();
        res.send({
            msg: 'shared'
        })

    } catch (err) {
        res.send({ msg: 'sharing error k garne aba yestei ho..' })
    }
}

module.exports = filesharing; 