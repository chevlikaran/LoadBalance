const body = require('body-parser');
const express = require('express');

const router = express.Router();

const app1 = express();
const port = process.env.PORT || 3002;



const app2 = express();

// Parse the request body as JSON
app1.use(body.json());

app1.listen(port, () => {
    console.log(`Server running at ${port}`);
});

app2.use(body.json());

const handler = serverNum => (req, res) => {
  console.log(`server ${serverNum}`, req.method, req.url, req.body);
  res.send(`Hello from server ${serverNum}!`);
};

console.log('Inside server')
// Only handle GET and POST requests
// app1.get('*', handler(1)).post('*', handler(1));
// app2.get('*', handler(2)).post('*', handler(2));


//app1.listen(3001);
//app2.listen(3002);

app1.post('/abc', (req, res) => {
    console.log("Hello Karan Here")
    return 'KaranResponse'
});


module.exports = router;