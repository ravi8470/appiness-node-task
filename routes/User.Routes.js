const { registerUser } = require("../controllers/User.Controller");

module.exports = api => {
	api.route('/users/register').post(registerUser);
};