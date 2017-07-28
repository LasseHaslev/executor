# @lassehaslev/executor
> Run a command every time a file change. Its that simple.

## Install
```bash
# Install project globaly
npm install -g @lassehaslev/executor

# Install executor per project
npm install @lassehaslev/executor --save-dev
```

## Usage
### Command line
```bash
# Doc
executor "<command>"
    [--run-on-first=true]
    [--watch="**/*"]
    [--ignore=""]

#example
executor './vendor/bin/phpunit' --watch='**/*.php' --ignore='node_modules/' --ignore='vendor/'
```

### Npm
package.json
```json
{
    "scripts": {
        "executor": "executor '<command>' [options]",
    }
}
```
Now you can run the command ```npm run executor``` from command line.

*If you run per project and not in a npm script the command is ```./node_modules/.bin/executor```.*

### Laravel TDD
I use this project to run Test Driven Development for my Laravel applications.

Check out [this Laracasts thread](https://laracasts.com/discuss/channels/testing/laravel-mix-and-phpunit?page=1#reply-341786) for more information.

Add `tdd` script to projects package.json
```json
{
  "scripts": {
    "tdd": "executor './vendor/bin/phpunit --color=always' --watch='**/*.php' --ignore='node_modules/' --ignore='vendor/'"
  }
}
```

Then run `npm run tdd` from your projects folder.

Alternatively (or in addition), you can add the script to `composer.json`.
```json
{
  "scripts": {
    "tdd": [
      "node_modules/.bin/executor './vendor/bin/phpunit --color=always' --watch='**/*.php' --ignore='node_modules/' --ignore='vendor/'"
    ]
  }
}
```

Then run `composer tdd` from your projects folder.


## Contributing
Follow these steps to contribute to project.

 1. **Fork** the repo on GitHub
 2. **Clone** the project to your own machine
 3. **Commit** changes to your own branch
 4. **Push** your work back up to your fork
 5. Submit a **Pull request** so that we can review your changes


## Development
```bash
# link to local command line
npm link

# compile to es6
npm run dev

# When you are finished unlink local command
npm unlink
```
