const express = require('express');
const app = express();
function write(...args){ process.stdout.write(...args.map(a=>`${a}\n`)); }
app.use(express.json());
app.get('/*',
  function(req, res){ 
    req.on('close', ()=>{ write('request complete'); });
    write(`${req.method} request at ${req.url}`);
    if((req.url === '/') || (req.url === '/hgjsFg')){
      write(
        res.sendFile(
          'homepage.html', 
          {root: __dirname}, 
          (err)=>{ if(err?.stack){write(err.stack.split('\n').splice(0, 2)); } }
        )
      ); 
    }
  });
/*const httpSrv = app.listen(process.env.PORT, '0.0.0.0'); httpSrv.keepAliveTimeout = 86400000; httpSrv.timeout = 86400000;
const server = new ws.Server({server: httpSrv}); server.keepAliveTimeout = 86400000; server.timeout = 86400000;
var nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    host: "smtp.zoho.eu",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'system.dawnofempires',
      pass: 'tBPM5VU8rEdc', 
    },
  });

function mailTo(addr, title, content){
    transporter.sendMail({
        from: 'Dawn of Empires II <system.dawnofempires@zohomail.eu>',
        to: addr,
        subject: title,
        text: ``,
        html: content
        }, (err, res)=>{ res.writeHead(200); res.end(); if(err){throw err;} });
}
        */