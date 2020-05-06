const body = require('body-parser');
const express = require('express');

const router = express.Router();

const app1 = express();
const port1 = process.env.PORT || 3002;
app1.use(body.json());
app1.listen(port1, () => {
    console.log(`Server running at ${port1}`);
});

const app2 = express();
const port2 = process.env.PORT || 3003;
app2.use(body.json());
app2.listen(port2, () => {
    console.log(`Server running at ${port2}`);
});


console.log('Inside server.js outside')
// Only handle GET and POST requests
// app1.get('*', handler(1)).post('*', handler(1));
// app2.get('*', handler(2)).post('*', handler(2));


//app1.listen(3001);
//app2.listen(3002);

// http.createServer((request, response) => {
//     const { headers, method, url } = request;
//     let body = [];
//     request.on('error', (err) => {
//       console.error(err);
//     }).on('data', (chunk) => {
//       body.push(chunk);
//     }).on('end', () => {
//       body = Buffer.concat(body).toString();
//       // At this point, we have the headers, method, url and body, and can now
//       // do whatever we need to in order to respond to this request.
//     });
//   }).listen(8080); // Activates this server, listening on port 8080.

function myFunc1(arg) {
    console.log(`arg was => ${arg}`);
  }

  function myFunc2(arg) {
    console.log(`arg was => ${arg}`);
  }

app1.post('/', (req, res) => {
    console.log("Inside slave");
    setTimeout(myFunc1, 6000, '3002');
    res.send('Responce: Hello  3002');
});

app2.post('/', (req, res) => {
    console.log("Inside slave");
    setTimeout(myFunc2, 6000, '3003');
    res.send('Responce: Hello  3003');
});


module.exports = router;