const express = require(`express`);
const path = require(`path`);
const app = express();
const port = process.env.PORT || 8080;
const publicPath = path.join(__dirname, '..', 'client');

app.use(express.static(publicPath));

app.use(express.static(path.join(publicPath, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

app.get('/ping', function (req, res) {
    return res.send({ping: "pong"});
});

app.listen(port, () => {
    console.log(`server is up on port ${port}!`);
});