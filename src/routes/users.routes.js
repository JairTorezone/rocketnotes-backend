const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../config/upload");

const UsersControllers = require("../controllers/UsersControllers");
const UserAvatarController = require("../controllers/UserAvatarController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const usersControllers = new UsersControllers();
const userAvatarController = new UserAvatarController();

usersRoutes.post("/", usersControllers.create);
usersRoutes.put("/", ensureAuthenticated, usersControllers.update);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
  // (request, response) => {
  //   console.log(request.file.filename);
  //   response.json();
  // }
);

module.exports = usersRoutes;
