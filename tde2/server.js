const express = require("express");

const server = express();

server.listen(3000, () => {
    console.log('Server running on port 3000')
});

server.get("/health", (req, res) => {
    res.send("server is running")
})