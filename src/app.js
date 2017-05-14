#!/usr/bin/env node

import chokidar from 'chokidar';
// console.log(fs);
// import args from 'command-line-args';

console.log('Hello world');

console.log(process.cwd());

var watcher = chokidar.watch('**/*.js', {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

watcher.on( 'change', function( path, stats ) {
    console.log(path);
    console.log(path);
} )
