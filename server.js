const http = require('http');
const ws = require('ws');
const express = require('express');
const app = express();
function write(...args){ process.stdout.write(...args.map(a=>a.toString() + '\n')); }
app.get('/*',
  function(req, res){ 
    req.on('close', ()=>{ write('request complete'); });
    write(`${req.method} request at ${req.url}`);
                    req.url = req.url.split('?')[0].split('!')[0]; 
                     if(req.url === '/'){ write('sending homepage...'); log(
                        res.sendFile('homepage.html', {root: __dirname}, (err)=>{if(err?.stack){devErr(err.stack.split('\n').splice(0, 2)); } })); } else 
                     if(req.url.indexOf('.') !== -1){ log(`sending file: ${req.url}`); write(`sending ${req.url}...`); 
                     res.sendFile(`${req.url}`, {root: __dirname}, (err)=>{if(err?.stack){devErr(err.stack.split('\n').splice(0, 2));}}); } 
                     else { write(`sending ${req.url} .html...`); 
                     res.sendFile(`${req.url}.html`, {root: __dirname}, (err)=>{if(err?.stack){devErr(err.stack.split('\n').splice(0, 2));}}); }
});
const httpSrv = app.listen(process.env.PORT, '0.0.0.0'); httpSrv.keepAliveTimeout = 86400000; httpSrv.timeout = 86400000;
const server = new ws.Server({server: httpSrv}); server.keepAliveTimeout = 86400000; server.timeout = 86400000;