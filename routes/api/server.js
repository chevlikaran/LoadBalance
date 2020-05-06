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

const app3 = express();
const port3 = process.env.PORT || 3004;
app3.use(body.json());
app3.listen(port3, () => {
    console.log(`Server running at ${port3}`);
});


app1.post('/', (req, res) => {
    console.log("Starting task at port 3002");
    setTimeout(function () {
        console.log("Ending task at port 3002");
        res.status(200).send('0');
    }, 5000);
    
});

app2.post('/', (req, res) => {
    console.log("Starting task at port 3003");
    setTimeout(function () {
        console.log("Ending task at port 3003");
        res.status(200).send('1');
    }, 5000);
    
});

app3.post('/', (req, res) => {
    console.log("Starting task at port 3004");
    setTimeout(function () {
        console.log("Ending task at port 3004");
        res.status(200).send('2');
    }, 5000);
    
});


module.exports = router;