import { create } from 'core-js/fn/object';
import validator from 'validator';
import { RoleModel } from '../models/Roles.model';
import { UserModel } from '../models/User.model';


export const registerUser = async (req, res) => {

  try {
    const data = Object.assign({}, req.body) || {};

    if (!data.email || !data.username || !data.password) {
      return res.status(400).send('Email, password and Username are required fields');
    }

    if (data.email && !validator.isEmail(data.email)) {
      return res.status(400).send('Invalid email address.');
    }

    if (data.username && (
      !validator.isAlphanumeric(data.username)
      ||
      !validator.isLength(data.username, { min: 8, max: 24 })
    )) {
      return res.status(400).send('Usernames must be alphanumeric and 8 to 24 chars');
    }

    if (data.password && !validator.isLength(data.password, { min: 8, max: 24 })) {
      return res.status(400).send('Password must be  8 - 24 chars');
    }

    let totalUserCount = await UserModel.estimatedDocumentCount();

    if (totalUserCount === 0) {
      data.role = 1; // set the user as admin
    } else {
      // check if a role id was provided and it was not equal to admin role id, i.e., 1
      if (!(typeof data.role === "number") || data.role === 1) {
        return res.status(400).send('Invalid value provided for role');
      }
      // check if the provided role id exists in role collection
      let roleCount = await RoleModel.countDocuments({ id: data.role });
      if (roleCount !== 1) {
        return res.status(400).send('No roles matching the given value found');
      }
    }
    // check if username/email already exists
    let duplicateUserCount = await UserModel.countDocuments({
      $or: [
        { username: data.username },
        { email: data.email }
      ]
    });
    if(duplicateUserCount > 0){
      return res.status(400).send('User already exists with given parameters');
    }

    let createdUser = await UserModel.create(data);
    createdUser = createdUser.toObject();
    delete createdUser.password;
    res.status(201).json(createdUser);

  } catch (err) {
    console.log('Error: ', err);
    res.status(500).json('Internal Server Error');
  }
};
