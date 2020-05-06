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

function myFunc(arg) {
    console.log(`arg was => ${arg}`);
    return;
  }

app1.post('/', (req, res) => {
    console.log("Inside slave");
    setTimeout(function () {
        console.log('After timeout 3002');
        res.status(200).send('Response: Hello  3002');
    }, 5000);
    
});

app2.post('/', (req, res) => {
    console.log("Inside slave");
    setTimeout(myFunc, 6000, '3003');
    console.log('After timeout 3003')
    //res.status(200).send('Response: Hello  3003');
});


module.exports = router;