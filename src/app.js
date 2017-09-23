#!/usr/bin/env node

const ArgumentParser = require('argparse').ArgumentParser;
const chokidar = require( 'chokidar' );
const shelljs = require( 'shelljs' );

var parser = new ArgumentParser({
    version: '0.0.1',
    addHelp:true,
    description: 'Argparse example'
})

// parser.addArgument( [ '-c', '--command' ], {
parser.addArgument( [ 'command' ], {
    help: 'Command you want to run each time.',
} );

parser.addArgument( [ '-nfr', '--no-first-run' ], {
    help: 'Prevent from running on first',
    action: 'storeTrue',
    nargs: 0,
} );

parser.addArgument( [ '-i', '--ignore' ], {
    help: 'What files should be ignored',
    type: String,
    multiple: true,
    defaultValue: /(^|[\/\\])\../,
} );

parser.addArgument( [ '-w', '--watch' ], {
    help: 'Which files should be watched.',
    type: String,
    defaultValue: '**/*',
} );

let result = parser.parseKnownArgs();
let options = result[0];
let remainingArgs = result[1];

var watcher = chokidar.watch(options.watch, {
  ignored: options.ignore,
  persistent: true,
  usePolling: true,
});

// Stop if no command is set
if (!options.command) {
    console.error('No command provided');
    process.exit();
};

var runCommand = function( triggered ) {
    var triggeredString = triggered ? 'Triggered by "' + triggered + '".' : '';

    var fullCommand = options.command + ' ' + remainingArgs.join( ' ' );

    console.log();
    console.log();
    console.log( 'Running command "' + fullCommand + '". ' + triggeredString );
    console.log();


    shelljs.exec( fullCommand );
}

if ( ! options.no_first_run) {
    runCommand();
}

watcher.on( 'change', function( path, stats ) {
    runCommand( path );
} )
