const UserDetails = require('../schema/UserDetails');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretToken = process.env.JWT_SECRET;

async function sign_up(req , res){
    let user = req.body;
    if(!user.name || !user.email || !user.password || !user.phone_number) {
        return { status:'error', sub_status : 'First Name, Email , Phone Number and Password are required' };
    }

    let user_exist = await UserDetails.findOne({email : user.email});

    if(user_exist){
        return res.status(400).json({message: 'Email id already exits'});
    }else{
        user.password = hash_password(user.password);
        await UserDetails.create(user);
        return res.status(200).json({message: 'SignUp Completed'});
    }


};
function hash_password(password) {
    return bcrypt.hashSync(password, 10);
}
async function login(req , res){
    const options = req.body;
    
    if(!options.email || !options.password) {
        return res.status(401).json({ message : `Please Fill Email Id and Password!`});
    }

    let user = await UserDetails.findOne({email : options.email.trim()});

    if(!user) {
        return res.status(404).json({ message : `User Doesn't Exists`});

    } else if(user && await compare_password(options.password,user.password)) {

        const token = jwt.sign(user._id.toString(), secretToken);

        return res.status(200).json({ message : 'Login Successfully!' , token });
    } else {
        return res.status(401).json({ message : 'Invalid Password!' });
    }
};
async function compare_password(password,hash_password) {

    const match = bcrypt.compareSync(password,hash_password);
    if(match) {
        return true;
    } else {
        return false;
    }
};

module.exports = {login , sign_up};