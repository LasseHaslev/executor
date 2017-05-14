#!/usr/bin/env node

import argumentor from 'command-line-args';
import chokidar from 'chokidar';
import shelljs from 'shelljs';

var options = argumentor( [
    {
        name: 'command',
        type: String,
        defaultOption: true 
    },
    {
        name: 'run-on-first',
        type: Boolean,
        defaultValue: true,
    },
    {
        name: 'ignore',
        type: String,
        multiple: true,
        defaultValue: /(^|[\/\\])\../,
    },
    {
        name: 'watch',
        type: String,
        defaultValue: '**/*',
    },
] );
var watcher = chokidar.watch(options.watch, {
  ignored: options.ignore,
  persistent: true,
  usePolling: true,
});

// Stop if no command is set
if (!options.command) {
    console.log('Cannot watch and run command:');
    console.log('No command provided');
    process.exit();
};

var runCommand = function( triggered ) {
    var triggeredString = triggered ? 'Triggered by "' + triggered + '".' : '';
    console.log( 'Running command "' + options.command + '". ' + triggeredString );
    shelljs.exec( options.command );
}

if (options['run-on-first']) {
    runCommand();
}

watcher.on( 'change', function( path, stats ) {
    runCommand( path );
} )
