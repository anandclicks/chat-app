const userModel = require("../models/user.model");

const sendAllUsersList = async (req, res) => {
  const allUsers = await userModel.find().select("-password");
  if (allUsers) {
    res.json({
      sucess: true,
      status: 200,
      users: allUsers,
    });
  }
};

const loguot = (req, res) => {
  try {
    res.cookie("token", "");
    return res.json({
      message: "Logout Sucessfully!",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: error.message,
      success: false,
    });
  }
};
module.exports = {sendAllUsersList,loguot};
