import { RoleModel } from "../../models/Roles.model"

let data = [
  {
    id: 1,
    name: 'admin',
    description: 'Admin Role. Has all privileges',
  },
  {
    id: 2,
    name: 'user',
    description: 'Basic user role',
  }
]

export const seedRoles = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let count = await RoleModel.estimatedDocumentCount();
      // console.log('count was', count);
      if (count === 0) {
        await RoleModel.create(data);
        resolve(1);
      } else {
        resolve(1);
      }
    } catch (err) {
      console.log('Error: ', err);
      reject(err);
    }
  })
}