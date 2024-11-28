const user = require('../MODEL/signup')
const fetchusers = async (req, res) => {
    try {
        const getuser = await user.find({  });
        if (!getuser) { return res.send({ msg: 'something went wrong' }) }
        res.send({ user: getuser })

    } catch (err) {
        res.send({ msg: 'error showing friends' })
    }

}


module.exports = fetchusers;