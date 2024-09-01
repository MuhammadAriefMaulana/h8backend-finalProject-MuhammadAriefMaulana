const { showMyBookmark } = require("../controllers/bookmarks.controller");
const auth = require("../middlewares/auth.middleware");
const router = require("express").Router();

router.use(require("./auth"));

router.use(auth);
router.use("/movies", require("./movies"));

router.use("/bookmark", require("./bookmarks"));
router.use("/mybookmark", showMyBookmark);

module.exports = router;
