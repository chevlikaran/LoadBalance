const body = require('body-parser');
const express = require('express');
const ejs = require('ejs');
const http = require('http');

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

app1.set('view engine', 'ejs');
app2.set('view engine', 'ejs');
app3.set('view engine', 'ejs');

//Making http request to ping main server in case of error
var flag = 0;
function makeRequest(a,b,func,port,res){
    if(flag==0){
        flag=1;
    const num = port-3002;
    const nport = (num+1)%3+3002;
    var data = JSON.stringify({
        'port': nport,
        'a' : a,
        'b' : b,
        'function' : func,
      });
  
    var options = {
        host: 'localhost',
        port: nport,
        path: '/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
      };
  
    var httpreq = http.request(options, (response) => {
      response.setEncoding('utf8');
      console.log("The response status code is : " + response.statusCode);
  
      if (response.statusCode == 200) {
        response.on('data', d => {
            console.log('\n');
            console.log('--------------');
            console.log(`Re-request response ${port}(error) --> ${nport} (resolved)`);
            console.log('Answer: '+d);
            console.log('Ending process at resolution server port');
            res.status(404);
            res.end();
        });
  
        response.on('end', () => {
          
        });
      
      }else{
        console.log('There was an unexpected failure. Request processed at another server');
      }
    });
  
      httpreq.write(data);
      httpreq.end();
    }
}

function add(a,b,res,port) {
    setTimeout(function () {
        addition = +a + +b;
        res.write('Port : '+port.toString()+' --> '+a.toString()+' + '+b.toString()+' = '+addition.toString());
        res.status(200);
        res.end();
        return;
    }, 5000);
}


function sub(a,b,res,port){
    setTimeout(function () {
        subtraction = +a - +b;
        res.write('Port : '+port.toString()+' --> '+a.toString()+' - '+b.toString()+' = '+subtraction.toString());
        res.status(200);
        res.end();
        return;
    }, 5000);
}

function mul(a,b,res,port){
    setTimeout(function () {
        multiplication = +a * +b;
        res.write('Port : '+port.toString()+' --> '+a.toString()+' * '+b.toString()+' = '+multiplication.toString());
        res.status(200);
        res.end();
        return;
    }, 5000);
}

function div(a,b,res,port){
    setTimeout(function () {
        division = +a / +b;
        res.write('Port : '+port.toString()+' --> '+a.toString()+' / '+b.toString()+' = '+division.toString());
        res.status(200);
        res.end();
        return;
    }, 5000);
}

app1.post('/', (req, res) => {
    if (req.body.function == "add") {
        console.log('Starting Addition at port 3002');
        try{
            var a1 = req.body.a;
            var b1 = req.body.b;
            var funct1 = req.body.function;
            var portz = req.body.port;
            add(a1,b1,res,portz);
        }catch(e){
            console.log('Error: '+e+' on port 3002... Redirecting request...');
            makeRequest(a1,b1,funct1,portz,res);
        }
        return;
    }
    else if (req.body.function == "sub") {
        console.log('Starting Substraction at port 3002');
        try{
            var a1 = req.body.a;
            var b1 = req.body.b;
            var funct1 = req.body.function;
            var portz = req.body.port;
            sub(a1,b1,res,portz);
        }catch(e){
            console.log('Error: '+e+' on port 3002... Redirecting request...');
            makeRequest(a1,b1,funct1,portz,res);
        }
        return;
    }else if (req.body.function == "mult") {
        console.log('Starting Multiplication at port 3002');
        try{
            var a1 = req.body.a;
            var b1 = req.body.b;
            var funct1 = req.body.function;
            var portz = req.body.port;
            mul(a1,b1,res,portz);
        }catch(e){
            console.log('Error: '+e+' on port 3002... Redirecting request...');
            makeRequest(a1,b1,funct1,portz,res);
        }
        return;
    }else if(req.body.function == "div"){
        console.log('Starting Division at port 3002');
        try{
            var a1 = req.body.a;
            var b1 = req.body.b;
            var funct1 = req.body.function;
            var portz = req.body.port;
            if(parseInt(b1, 10)==0&&flag==1){
                res.write('Port : '+portz.toString()+' --> Cannot be divided by zero');
                res.status(200);
                res.end();
                flag=0;
            }else if(parseInt(b1, 10)==0&&flag==0){
                throw new Error('Something Unexpected');
            }else{
                div(a1,b1,res,portz);
            }
        }catch(e){
            console.log('Error: '+e+' on port 3002... Redirecting request...');
            makeRequest(a1,b1,funct1,portz,res);
        }
        return;
    }
});

app2.post('/', (req, res) => {
    if (req.body.function == "add") {
        console.log('Starting Addition at port 3003');
        try{
            var a1 = req.body.a;
            var b1 = req.body.b;
            var funct1 = req.body.function;
            var portz = req.body.port;
            add(a1,b1,res,portz);
        }catch(e){
            console.log('Error: '+e+' on port 3003... Redirecting request...');
            makeRequest(a1,b1,funct1,portz,res);
        }
        return;
    }
    else if (req.body.function == "sub") {
        console.log('Starting Substraction at port 3003');
        try{
            var a1 = req.body.a;
            var b1 = req.body.b;
            var funct1 = req.body.function;
            var portz = req.body.port;
            sub(a1,b1,res,portz);
        }catch(e){
            console.log('Error: '+e+' on port 3003... Redirecting request...');
            makeRequest(a1,b1,funct1,portz,res);
        }
        return;
    }else if (req.body.function == "mult") {
        console.log('Starting Multiplication at port 3003');
        try{
            var a1 = req.body.a;
            var b1 = req.body.b;
            var funct1 = req.body.function;
            var portz = req.body.port;
            mul(a1,b1,res,portz);
        }catch(e){
            console.log('Error: '+e+' on port 3003... Redirecting request...');
            makeRequest(a1,b1,funct1,portz,res);
        }
        return;
    }else if(req.body.function == "div"){
        console.log('Starting Division at port 3003');
        try{
            var a1 = req.body.a;
            var b1 = req.body.b;
            var funct1 = req.body.function;
            var portz = req.body.port;
            if(parseInt(b1, 10)==0&&flag==1){
                res.write('Port : '+portz.toString()+' --> Cannot be divided by zero');
                res.status(200);
                res.end();
                flag=0;
            }else if(parseInt(b1, 10)==0&&flag==0){
                throw new Error('Something Unexpected');
            }else{
                div(a1,b1,res,portz);
            }
        }catch(e){
            console.log('Error: '+e+' on port 3003... Redirecting request...');
            makeRequest(a1,b1,funct1,portz,res);
        }
        return;
    }
});

app3.post('/', (req, res) => {
    if (req.body.function == "add") {
        console.log('Starting Addition at port 3004');
        try{
            var a1 = req.body.a;
            var b1 = req.body.b;
            var funct1 = req.body.function;
            var portz = req.body.port;
            add(a1,b1,res,portz);
        }catch(e){
            console.log('Error: '+e+' on port 3004... Redirecting request...');
            makeRequest(a1,b1,funct1,portz,res);
        }
        return;
    }
    else if (req.body.function == "sub") {
        console.log('Starting Substraction at port 3004');
        try{
            var a1 = req.body.a;
            var b1 = req.body.b;
            var funct1 = req.body.function;
            var portz = req.body.port;
            sub(a1,b1,res,portz);
        }catch(e){
            console.log('Error: '+e+' on port 3004... Redirecting request...');
            makeRequest(a1,b1,funct1,portz,res);
        }
        return;
    }else if (req.body.function == "mult") {
        console.log('Starting Multiplication at port 3004');
        try{
            var a1 = req.body.a;
            var b1 = req.body.b;
            var funct1 = req.body.function;
            var portz = req.body.port;
            mul(a1,b1,res,portz);
        }catch(e){
            console.log('Error: '+e+' on port 3004... Redirecting request...');
            makeRequest(a1,b1,funct1,portz,res);
        }
        return;
    }else if(req.body.function == "div"){
        console.log('Starting Division at port 3004');
        try{
            var a1 = req.body.a;
            var b1 = req.body.b;
            var funct1 = req.body.function;
            var portz = req.body.port;
            if(parseInt(b1, 10)==0&&flag==1){
                res.write('Port : '+portz.toString()+' --> Cannot be divided by zero');
                res.status(200);
                res.end();
                flag=0;
            }else if(parseInt(b1, 10)==0&&flag==0){
                throw new Error('Something Unexpected');
            }else{
                div(a1,b1,res,portz);
            }
        }catch(e){
            console.log('Error: '+e+' on port 3004... Redirecting request...');
            makeRequest(a1,b1,funct1,portz,res);
        }
        return;
    }
});

module.exports = router;