const axios = require("axios");
const Link = require("../models/links");

const monitoredLinks = new Map();

const monitorLink = (url) => {
    if (monitoredLinks.has(url)) return;

    const interval = setInterval(async () => {
        try {
            const res = await axios.get(url);
            console.log(`[UP] ${url} - ${res.status}`);
        } catch {
            console.log(`[DOWN] ${url}`);
        }
    }, 60000);

    monitoredLinks.set(url, interval);
};

const startMonitoring = async () => {
  setInterval(async () => {
    const links = await Link.find();
    const currentUrls = links.map(link => link.url);

    links.forEach(link => {
      if (!monitoredLinks.has(link.url)) {
        const interval = setInterval(async () => {
          try {
            const res = await axios.get(link.url);
            console.log(`[UP] ${link.url} - ${res.status}`);
            if (global._io) {
              console.log(">> EMITTING TO:", link.userId); // 🔥 log this
              global._io.to(link.userId).emit("log", `[UP] ${link.url} - ${res.status}`);
            }
          } catch {
            console.log(`[DOWN] ${link.url}`);
            if (global._io) {
              console.log(">> EMITTING TO:", link.userId); // 🔥 log this
              global._io.to(link.userId).emit("log", `[DOWN] ${link.url}`);
            }
          }
        }, 60000);
        monitoredLinks.set(link.url, interval);
      }
    });

    // remove stopped ones
    for (let url of monitoredLinks.keys()) {
      if (!currentUrls.includes(url)) {
        clearInterval(monitoredLinks.get(url));
        monitoredLinks.delete(url);
      }
    }
  }, 60000);
};


const stopMonitoring = (url) => {
    if (monitoredLinks.has(url)) {
        clearInterval(monitoredLinks.get(url));
        monitoredLinks.delete(url);
    }
};

module.exports = { startMonitoring, stopMonitoring };
