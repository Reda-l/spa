const fs = require('fs');

const path = `${process.env.NODE_ENV ? __dirname + '/' + process.env.NODE_ENV.toLowerCase() : __dirname + '/dev'}`;

exports.path = path;


