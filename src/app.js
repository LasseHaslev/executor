#!/usr/bin/env node

console.log(process.argv);
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

parser.addArgument( [ '-fr', '--run-on-first' ], {
    help: 'Should the script run one time first time run run the command.',
    type: Boolean,
    defaultValue: true,
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

let options = parser.parseKnownArgs()[0];

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
    console.log('');
    console.log( 'Running command "' + options.command + '". ' + triggeredString );
    shelljs.exec( options.command );
}

if (options['run-on-first']) {
    runCommand();
}

watcher.on( 'change', function( path, stats ) {
    runCommand( path );
} )
