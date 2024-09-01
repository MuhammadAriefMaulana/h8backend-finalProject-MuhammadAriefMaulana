const {
    index,
    show,
    showMyBookmark,
    addToMyBookmark
  } = require("../controllers/bookmarks.controller");
  
const router = require("express").Router();

// router.get("/mybookmark", showMyBookmark);

// router.post("/", index);
router.post("/:id", addToMyBookmark);

module.exports = router;