const User = require("../models/UserModel.js");
const bcrypt = require("bcrypt");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const salt = await bcrypt.genSalt(10); 
    const hashPassword = await bcrypt.hash(password, salt); 

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    const user = await User.create({
      name,
      email,
      password: hashPassword
    })
    console.log(user)
    // res.status(201).json(user)
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ messaege: error.messaege })
  }
};


exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;

      
  
      const user = await User.findOne({ email });
      if (!user) {
        console.log('Invalid email ')
        return res.status(400).json({ error: 'User not found' });
      }
  
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
 
      if (!isPasswordValid) {
        console.log('Invalid password')
        return res.status(400).json({ error: 'Invalid password' });
      }
  
      console.log('Login successfully:', user);
      res.status(200).json({ message: 'Login successfully', user }); 
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

};