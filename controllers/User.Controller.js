import validator from 'validator';
import UserModel from '../models/User.model';


export const registerUser = async (req, res, next) => {

  const data = Object.assign({}, req.body) || {};

  if (!data.email || !data.username || !data.password) {
    return res.status(400).send('Email, password and Username are required fields');
  }

  if (data.email && !validator.isEmail(data.email)) {
    return res.status(400).send('Invalid email address.');
  }

  if (data.username && !validator.isAlphanumeric(data.username)
    && !validator.isLength(data.username, { min: 8, max: 24 })) {
    return res.status(400).send('Usernames must be alphanumeric and 8 to 24 chars');
  }

  if (data.password && !validator.isLength(data.password, { min: 8, max: 24 })) {
    return res.status(400).send('Password must be  8 - 24 chars');
  }
  
  let totalUserCount = await UserModel.find().count();
  
  if(totalUserCount === 0) {
    data.role = 1; // set the user as admin
  } else {
    // check if a role id was provided and it was not equal to admin role id, i.e., 1
    if(!(typeof data.role === Number) || data.role === 1){
      return res.status(400).send('Invalid value provided for role');
    }
  }

  let createdUser = await UserModel.create(data);
  res.json(createdUser);

  // UserModel.create(data)
  //   .then(user => {
  //     res.json(user);
  //   })
  //   .catch(err => {
  //     console.log('Error:', err);
  //     res.status(500).send('Internal Server Error');
  //   });
};
