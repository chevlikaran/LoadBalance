const express = require('express');
const router = express.Router();
var http = require('http');

var server_no = -1;
var number_of_server = 3;
var serverCount = [];
serverCount[0]=0;
serverCount[1]=0;
serverCount[2]=0;
var numb;
var cur;

router.post('/click', (req, res) => {

    server_no = (server_no+1)%number_of_server;
    serverCount[server_no]=serverCount[server_no]+1;
    final_no = server_no+3002;
    console.log(`Sending request at ${final_no}`)

    
        console.log('In here');
        res.render('index', {
           server1: serverCount[0],
           server2: serverCount[1],
           server3: serverCount[2],
           msg: `Sending request to server at port : ${final_no}`
       });
    
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

        response.on('data', d => {
            numb = parseInt(d, 10);
            cur = 3002+numb;
            serverCount[numb]=serverCount[numb]-1;
            console.log(`Ending process at server port ${cur}`);
          })

          response.on('end', () => {
           // myFun();
          })
        
         // console.log(response)
        });
      
      httpreq.write(data);

      
    httpreq.end();

    function myFun(){
        res.render('index', {
            server1: serverCount[0],
            server2: serverCount[1],
            server3: serverCount[2],
            msg: `Job done!!\nRequest to server at port : ${cur} complete`
        });
    }

});



module.exports = router;