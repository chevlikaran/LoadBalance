const body = require('body-parser');
const express = require('express');
const app = express();
const router = express.Router();

const app1 = express();
const app2 = express();

// Parse the request body as JSON
app1.use(body.json());
app2.use(body.json());

const handler = serverNum => (req, res) => {
  console.log(`server ${serverNum}`, req.method, req.url, req.body);
  res.send(`Hello from server ${serverNum}!`);
};

// Only handle GET and POST requests
app1.get('*', handler(1)).post('*', handler(1));
app2.get('*', handler(2)).post('*', handler(2));


//app1.listen(3001);
//app2.listen(3002);

app1.post('/click', (req, res) => {
    console.log("Hello Karan Here")
});

const loadtest = require('loadtest');
const options = {
    url: 'http://localhost:3000',
    maxRequests: 1,
};
loadtest.loadTest(options, function(error, result)
{
    if (error)
    {
        return console.error('Got an error: %s', error);
    }
    console.log('Tests run successfully');
    console.log(result);
});

module.exports = router;