const express = require('express');
const router = express.Router();
var querystring = require('querystring');
var http = require('http');



router.post('/click', (req, res) => {
    console.log('Click Karan');

    var data = querystring.stringify({
        username: "myname",
        password: " pass"
    });
    var options = {
        host: 'localhost',
        port: 3002,
        path: '/abc',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength('data')
        }
      };
    
      var httpreq = http.request(options, function (response) {
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
          console.log("body: " + chunk);
        });
        response.on('end', function() {
          res.send('ok');
        })
      });
      httpreq.write(data);
      httpreq.end();

});



module.exports = router;