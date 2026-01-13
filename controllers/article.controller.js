const Article = require("../models/Article");

// CREATE artikel
exports.createArticle = async (req, res) => {
  try {
    const { image_url, title, description } = req.body;

    const article = new Article({
      image_url,
      title,
      description,
    });

    await article.save();

    res.status(201).json({
      message: "Article created successfully",
      data: article,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ semua artikel
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Articles retrieved successfully",
      data: articles,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ artikel by ID
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json({
      message: "Article retrieved successfully",
      data: article,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE artikel
exports.updateArticle = async (req, res) => {
  try {
    const { image_url, title, description } = req.body;

    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { image_url, title, description },
      { new: true, runValidators: true }
    );

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json({
      message: "Article updated successfully",
      data: article,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE artikel
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json({
      message: "Article deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
