const fs = require('fs');

module.exports = function loggermiddleware(req,res,next){
    const log = `\nTime :[${Date.now()}] ;request: [${req.method}] ;path : [${req.path}]`
    fs.appendFile('log.txt',log,(err)=>{
        console.log(err);
    });
    next();
}