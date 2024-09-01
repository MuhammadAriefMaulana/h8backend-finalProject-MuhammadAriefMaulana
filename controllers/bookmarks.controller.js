const NotFoundError = require("../errors/NotFoundError");
const { Bookmark, Movie, User } = require("../models");

exports.index = async (req, res, next) => {
  try {
    const bookmarks = await Bookmark.findAll();
    res.status(200).json(bookmarks);
  } catch (error) {
    next(error);
  }
};

exports.show = async (req, res, next) => {
  const { id } = req.params;
  try {
    const bookmarks = await Bookmark.findByPk(id);
    if (!bookmarks) throw new NotFoundError();
    res.status(200).json(bookmarks);
  } catch (error) {
    next(error);
  }
};

exports.addToMyBookmark = async (req, res, next) => {
  try {
    const { id: userId } = req.user;   
    const { id: movieId } = req.params;

    const [bookmarks, created] = await Bookmark.findOrCreate({
      where: { userId: userId, movieId: movieId },
      defaults: {
      },
    });

    const message = created
      ? 'Success adding new bookmark'
      : 'Already bookmarked';

    const bookmarkWithMessage = {
      message,
      ...bookmarks.toJSON()      
    };

    res.status(200).json(bookmarkWithMessage);
  } catch (error) {
    next(error);
  }
};

exports.showMyBookmark = async (req, res, next) => {
  try {
    const { id } = req.user;    
    const bookmarks = await Bookmark.findAll({ 
      where: { userId: id },
      attributes: { exclude: ['id'] },
      include: {
        model: Movie
      }
      
    });
    res.status(200).json(bookmarks);
  } catch (error) {
    next(error);
  }
};