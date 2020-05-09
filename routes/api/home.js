const express = require('express');
const router = express.Router();
var http = require('http');
var bodyParser = require('body-parser');
//var urlencodedParser = bodyParser.urlencoded({extended : false});
router.use(bodyParser.json());


var server_no = -1;
var number_of_server = 3;

router.post('/', (req, res) => {
  server_no = (server_no+1)%number_of_server;
  final_no = server_no+3002;
  var port = req.body.port;

  //Checking if request is not sent to the same server from where error is thrown
  if (port==final_no){
    server_no = (server_no+1)%number_of_server;
    final_no = server_no+3002;
  }
  console.log('\n');
  console.log('------------------------------------');
  console.log(`Sending request at ${final_no}`);
  
  var data = JSON.stringify({
      'port': final_no,
      'a' : req.body.a,
      'b' : req.body.b,
      'function' : req.body.function,
    });

  var options = {
      host: 'localhost',
      port: final_no,
      path: '/',
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length
      }
    };

  var httpreq = http.request(options, (response) => {
    response.setEncoding('utf8');

    if (response.statusCode == 200) {

      response.on('data', d => {
          console.log('Answer: '+d);
          console.log('Ending process at server port');
          res.render('index');
      });

      response.on('end', () => {
        
      });
    
    }else{
      console.log('There was an unexpected failure. And request has been resolved');
      res.render('index');
    }
  });

    httpreq.write(data);
    httpreq.end();

});

module.exports = router;