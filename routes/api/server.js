const body = require('body-parser');
const express = require('express');

var http = require('http');

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
    // console.log("request received was : ", req);
    // console.dir(req.headers.content, {depth : null});
    // console.log("Contents are %j", req.headers.content);
    // console.log("Printing type :- %d", req);

    // console.log("Current Port no. is " + req.headers.content);
    // console.log("Current function is " + req.headers.function);
    // console.log(req.headers.a);
    // console.log(req.headers.b);

    if (req.headers.function == "add") {
        res.status(200);
        var addition = +(req.headers.a) + +(req.headers.b);
        res.write(addition.toString());
        res.write('0');
        res.end();
        return;
    }
    else if (req.headers.function == "sub") {
        res.status(200);
        var addition = +(req.headers.a) - +(req.headers.b);
        res.write(addition.toString());
        res.write('0');
        res.end();
        return;
    }
    else if (req.headers.function == "mult") {
        res.status(200);
        var addition = +(req.headers.a) * +(req.headers.b);
        res.write(addition.toString());
        res.write('0');
        res.end();
        return;
    }

    //fails if it's division

    console.log("Starting task at port 3002");
    console.log("There was an error encountered while processing request on this server");
    console.log("The process will take place on new server");

    var data = JSON.stringify({
      server_no: 3003
    });

    var options = {
        host: 'localhost',
        port: 3003,
        path: '/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'content': 3003,
            'a': req.headers.a,
            'b': req.headers.b,
            'function': req.headers.function,
            'Content-Length': data.length
        }
    };

    var caller = http.request(options, (response) => {
      console.log("Request has been sent to server");
      response.setEncoding('utf8');
        var ans = "";
        response.on('data', d => {
            // console.log("####### SERVER SERVER SERVER SERVER SERVER SERVER" + d);
            numb = parseInt(d, 10);
            if (ans == "") {
                ans = d;
            }
            else {
                // console.log("$$$$$$$ SERVER SERVER SERVER SERVER SERVER SERVER" + numb);
                cur = 3002 + numb;
                console.log(`Ending process at server port ${cur}`);
            }
        });


        response.on('end', () => {
            if ((ans == "Division Operation Failed") || (ans == "Sever Failed")) {
                console.log(ans);
            }
            else {
                console.log("The answer for the operations performed is " + ans);
            }
        });

        // response.on('data', d => {
        //   numb = parseInt(d, 10);
        //   cur = 3002 + numb;
        //   console.log(`Ending process at server port ${cur}`);
        // });

        // response.on('end', () => {
        // });

    });
    caller.write(data);
    caller.end();

    res.statusMessage = "The request on port 3002 failed!!";
    res.status(404);
    res.write("Server Failed");
    res.write('1');
//ends the request made
});

app2.post('/', (req, res) => {
    console.log("Starting task at port 3003");

    // console.log("Current Port no. is " + req.headers.content);
    // console.log("Current function is " + req.headers.function);
    // console.log(req.headers.a);
    // console.log(req.headers.b);

    if (req.headers.function == "add") {
        res.status(200);
        var addition = +(req.headers.a) + +(req.headers.b);
        // console.log("################################" + addition);
        res.write(addition.toString());
        res.write('1');
        res.end();
        return;
    }
    else if (req.headers.function == "sub") {
        res.status(200);
        var addition = +(req.headers.a) - +(req.headers.b);
        // console.log("################################" + addition);
        res.write(addition.toString());
        res.write('1');
        res.end();
        return;
    }
    else if (req.headers.function == "mult") {
        res.status(200);
        var addition = +(req.headers.a) * +(req.headers.b);
        // console.log("################################" + addition);
        res.write(addition.toString());
        res.write('1');
        res.end();
        return;
    }
    else{
        res.status(200);
        if (req.headers.b == 0) {
            res.write("Division Operation Failed");
            res.write('1');
            res.end();
            return;
        }
        var addition = +(req.headers.a) / +(req.headers.b);
        res.write(addition.toString());
        res.write('1');
        res.end();
        return;
    }
});

app3.post('/', (req, res) => {
    console.log("Starting task at port 3004");

    // console.log("Current Port no. is " + req.headers.content);
    // console.log("Current function is " + req.headers.function);
    // console.log(req.headers.a);
    // console.log(req.headers.b);

    if (req.headers.function == "add") {
        res.status(200);
        var addition = +(req.headers.a) + +(req.headers.b);
        // console.log("################################" + addition);
        res.write(addition.toString());
        res.write('2');
        res.end();
        return;
    }
    else if (req.headers.function == "sub") {
        res.status(200);
        var addition = +(req.headers.a) - +(req.headers.b);
        // console.log("################################" + addition);
        res.write(addition.toString());
        res.write('2');
        res.end();
        return;
    }
    else if (req.headers.function == "mult") {
        res.status(200);
        var addition = +(req.headers.a) * +(req.headers.b);
        // console.log("################################" + addition);
        res.write(addition.toString());
        res.write('2');
        res.end();
        return;
    }
    else {
        res.status(200);
        if (req.headers.b == 0) {
            res.write("Division Operation Failed");
            res.write('2');
            res.end();
            return;
        }
        var addition = +(req.headers.a) / +(req.headers.b);
        res.write(addition.toString());
        res.write('2');
        res.end();
        return;
    }
});


module.exports = router;