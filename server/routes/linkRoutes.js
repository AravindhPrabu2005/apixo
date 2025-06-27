const express = require("express");
const router = express.Router();
const Link = require("../models/links");



// Add Link
router.post("/link", async (req, res) => {
  const { userId, url } = req.body;
  const newLink = new Link({ userId, url });
  await newLink.save();
  res.json({ message: "Link added" });
});

// Get Links by User
router.get("/link/:userId", async (req, res) => {
  const links = await Link.find({ userId: req.params.userId });
  res.json(links);
});

// Delete Link
router.delete("/link/:id", async (req, res) => {
  await Link.findByIdAndDelete(req.params.id);
  res.json({ message: "Link deleted" });
});

module.exports = router;
