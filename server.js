const http = require('http');
const ws = require('ws');
const express = require('express');
const util = require('util');
const app = express();
const bodyParser = require('body-parser');
function write(...args){ process.stdout.write(...args.map(a=>`${a}\n`)); }
app.use(express.json());
app.get('/*',
  function(req, res){ 
    req.on('close', ()=>{ write('request complete'); });
    write(`${req.method} request at ${req.url}`);
    if (req.url === '/hgjsFg'){ 
      write(
        res.sendFile('homepage.html', {root: __dirname}, (err)=>{if(err?.stack){write(err.stack.split('\n').splice(0, 2)); } })); 
     }
                    req.url = req.url.split('?')[0].split('!')[0]; 
                     if(req.url === '/'){ write('sending homepage...'); write(
                        res.sendFile('homepage.html', {root: __dirname}, (err)=>{if(err?.stack){write(err.stack.split('\n').splice(0, 2)); } })); } else 
                     if(req.url.indexOf('.') !== -1){ write(`sending file: ${req.url}`); write(`sending ${req.url}...`); 
                     res.sendFile(`${req.url}`, {root: __dirname}, (err)=>{if(err?.stack){write(err.stack.split('\n').splice(0, 2));}}); } 
                     else { write(`sending ${req.url} .html...`); 
                     res.sendFile(`${req.url}.html`, {root: __dirname}, (err)=>{if(err?.stack){write(err.stack.split('\n').splice(0, 2));}}); }
});
app.post('/*',
  function(req, res){ 
    write(`${req.method} request at ${req.url} with body ${util.inspect(req.body, {depth: Infinity})}`);
    mailTo('chlebicl@arcig.cz', ...req.body);
    req.on('close', ()=>{ write('request complete'); });
});
const httpSrv = app.listen(process.env.PORT, '0.0.0.0'); httpSrv.keepAliveTimeout = 86400000; httpSrv.timeout = 86400000;
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