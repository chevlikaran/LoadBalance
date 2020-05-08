const express = require('express');
const router = express.Router();
var http = require('http');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended : false});

var server_no = -1;
var number_of_server = 3;
// var serverCount = [];
// serverCount[0]=0;
// serverCount[1]=0;
// serverCount[2]=0;

var numb;
var cur;

router.get('/add', (req, res)=>{
  console.log(req.query);
  res.render('index');
});

router.post('/add', urlencodedParser, (req, res) => {

  console.log(req.body);
  // console.log(req.body.a);
  // console.log(res);
  // console.log("The content of the request is %d", req.body);
  // console.log("The content of the response is %d", res);

    server_no = (server_no+1)%number_of_server;
    // serverCount[server_no]=serverCount[server_no]+1;
    final_no = server_no+3002;
    console.log(`Sending request at ${final_no}`)
    
    var data = JSON.stringify({
        server_no: final_no
      });

    var options = {
        host: 'localhost',
        port: final_no,
        path: '/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'content' : final_no,
            'a' : req.body.a,
            'b' : req.body.b,
            'function' : req.body.funct,
            'Content-Length': data.length
        }
      };

    var httpreq = http.request(options, (response) => {
      	console.log("Request has been sent to server");
        response.setEncoding('utf8');
        console.log("The response status code is : " + response.statusCode);
        console.log("The response message received is : " + response.statusMessage);

        if (response.statusCode != 404) {

          var ans = "";
          response.on('data', d => {
            // console.log("@@@@@@@@@@@@@@@@@@@@@" + d);
            numb = parseInt(d, 10);
            if (ans == "") {
              ans = d;
            }
            else{
              // console.log("############" + numb);
              cur = 3002 + numb;
              console.log(`Ending process at server port ${cur}`);
              res.render('index');
            }
          });

          response.on('end', () => {
            if ((ans == "Division Operation Failed") || (ans == "Sever Failed")) {
              console.log(ans);              
            }
            else{
              console.log("The answer for the operations performed is " + ans);
            }
          });
        }
        else{

          var ans = "", cur, numb, store;
          response.on('data', d => {
            // console.log("$$$$$$$$$$$$$$$$$$" + d + " ans = " + ans);
            if (ans == "") {
              ans = d;
            }
            else {
              numb = parseInt(d, 10);
              store = numb;
              server_no = store;
              // console.log("############" + numb);
              numb--;
              numb += 3;
              numb %= 3;
              cur = 3002 + numb;
              // console.log("New server no. is" + server_no);
              console.log(`Failed process at server port ${cur}`);
              res.render('index');
            }
          });

          response.on('end', () => {
            if ((ans == "Division Operation Failed") || (ans == "Sever Failed")) {
              console.log(ans);
            }
            else {
              console.log("The answer for the operations performed is " + ans);
            }
            // console.log("========================================" + server_no);
            server_no = store;
          });
        }
      });

      httpreq.write(data);
      httpreq.end();

});

// create similar for subtraction

// create similar for multiplication 

// create similar for divison 


module.exports = router;