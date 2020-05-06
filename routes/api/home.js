const express = require('express');
const router = express.Router();
var http = require('http');

var server_no = -1;

router.post('/click', (req, res) => {
    console.log('Click Karan');

    server_no = (server_no+1)%2;
    final_no = server_no+3002;
    console.log(`Sending request at ${final_no}`)
    
    var data = JSON.stringify({
        server_no: final_no
      })
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
    
      var httpreq = http.request(options, function (response) {
        response.setEncoding('utf8');
        // response.on('data', function (chunk) {
        //   console.log("body: " + chunk);
        // });
        response.on('data', d => {
            process.stdout.write(d)
            console.log('respond received data')
          });
        response.on('end', function() {
          //
          console.log('respond received end');
        })
      });
      
      httpreq.write(data);
      httpreq.end();

});



module.exports = router;