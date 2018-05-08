"use strict";

var fs = require("fs");
var http = require("http");
var url = require("url");
var path = require("path");

var rootPath = "./dist";

//mime 文件，用来做mine类型匹配的。网上能下载
var mime = {
      "css": "text/css",
      "gif": "image/gif",
      "html": "text/html",
      "ico": "image/x-icon",
      "jpeg": "image/jpeg",
      "jpg": "image/jpeg",
      "js": "text/javascript",
      "json": "application/json",
      "pdf": "application/pdf",
      "png": "image/png",
      "svg": "image/svg+xml",
      "swf": "application/x-shockwave-flash",
      "tiff": "image/tiff",
      "txt": "text/plain",
      "wav": "audio/x-wav",
      "wma": "audio/x-ms-wma",
      "wmv": "video/x-ms-wmv",
      "xml": "text/xml"
    };

var server = http.createServer(function(req,res){

  var reqPath = url.parse(req.url,true).pathname;

  if(reqPath == "/favicon.ico") return ;

  var extname = path.extname(reqPath);


  var mineType = mime[extname] || "text/plain";

  if(reqPath == "/") reqPath = "/index.html";

  var targetPath = rootPath + reqPath;


  fs.readFile(targetPath,function(err,data){
    if(err) {
      res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
      res.end("请求路径不合法");
    } else {
      res.writeHead(200,{"Context-Type":""+mineType+";charset=UTF-8"});
      res.end(data);
    }

  });

});

server.listen(9127,"0.0.0.0");
console.log("server run at:  http://127.0.0.1:9127")
