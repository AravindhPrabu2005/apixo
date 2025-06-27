const express = require("express");
const router = express.Router();
const axios = require("axios");

const targets = new Map();

router.post("/monitor", (req, res) => {
     const { url } = req.body;
     if (!url) return res.status(400).json({ error: "URL is required" });

     if (targets.has(url)) return res.status(400).json({ error: "Already monitoring this URL" });

     const interval = setInterval(async () => {
          try {
               const response = await axios.get(url);
               if (global._io) {
                    global._io.to(link.userId).emit("log", `[UP] ${link.url} - ${res.status}`);
               }
          } catch (error) {
               if (global._io) {
                    global._io.to(link.userId).emit("log", `[DOWN] ${link.url}`);
               }
          }
     }, 60000);

     targets.set(url, interval);
     res.json({ message: `Started monitoring ${url}` });
});

router.post("/stop", (req, res) => {
     const { url } = req.body;
     const interval = targets.get(url);
     if (!interval) return res.status(404).json({ error: "URL not being monitored" });

     clearInterval(interval);
     targets.delete(url);
     res.json({ message: `Stopped monitoring ${url}` });
});

module.exports = router;
