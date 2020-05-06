const express = require('express');
const router = express.Router();
var querystring = require('querystring');
var http = require('http');

var server_no = -1;

router.post('/click', (req, res) => {
    console.log('Click Karan');

    server_no = (server_no+1)%2;
    final_no = server_no+3002;
    console.log(`Sending request at ${final_no}`)
    
    var data = 'Data to be sent'
    var options = {
        host: 'localhost',
        port: final_no,
        path: '/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(data)
        }
      };
    
      var httpreq = http.request(options, function (response) {
        response.setEncoding('utf8');
        // response.on('data', function (chunk) {
        //   console.log("body: " + chunk);
        // });
        response.on('end', function() {
          //res.send('ok');
          console.log('respond received')
        })
      });
      
      httpreq.write(data);
      httpreq.end();

});



module.exports = router;