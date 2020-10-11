# appiness-node-task

This app seeds certain user roles such as admin. The first user that is created is assigned the role of admin. Rest users are assigned a role from the existing roles with the exception of admin role.

# Tech/framework used

1. node.js
2. mongodb

# Installation

  ### prerequisite : docker and docker-compose should be installed 
1. clone the project
2. go to project root directory
3. run cmd - 'npm i'

# How to use?

1. Run Command 'npm start' to start the server
2. send POST request to localhost:3000/users/register to test the route
3. sample request object is as follows:
    ```
    {
      "username": "John12345",
      "email": "Smith@gmail.com",
      "password":"12345667",
      "role":2 // role field can be omitted if creating admin user
    }
    ```


# Workflow

1. Initially app seeds roles from ./utils/seeders/roles.seeders.js into the roles collection.
2. When adding a user, app checks if db has no users in which case it assigns the user admin role, otherwise it requires a role id to be provided with the request.