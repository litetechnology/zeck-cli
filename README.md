# ZECK CLI
 <h3> A complete solution for every type of developer</h3>

[![NPM Downloads](https://img.shields.io/npm/dm/zeck-cli.svg?style=flat)](https://npmcharts.com/compare/zeck-cli?minimal=true)
[![Install Size](https://packagephobia.now.sh/badge?p=zeck-cli)](https://packagephobia.now.sh/result?p=zeck-cli)
[![Version](https://img.shields.io/npm/v/zeck-cli.svg)](https://npmjs.org/package/zeck-cli)
[![License](https://img.shields.io/npm/l/zeck-cli.svg)](https://github.com/lite-technology/zeck-cli/blob/main/package.json)

[english](README.md) | [portugues](README/pt-br.md)

## Guide
- [Features](#main-features)
- [Installation](#installation)
- [Usage](#usage)
- [Quick start](#quick-start)
- [Commands](#commands)
    * [profile](#Profile)
    * [config](#Config)
    * [todo](#Todo)
    * [help](#Help)
    * [init](#Init)
    * [reset](#reset)
    * [version](#version)
    * [export](#export)
    * [import](#import)

## Main features
- Complete task list
- Creating profiles with different configurations
- Resources for developers (logs, ping, status, build, templates)
- Easy project monitoring and management
- Multilingual (Portugues and English)
- VPS management (upload, backup, start, etc)
- Local and remote backup of projects, automatic or not

### Installation

```js
npm install -g zeck-cli
```

### Usage 
```js
//execute a command
zeck COMMAND [...args]
```

### Quick Start
To see all commands, use
```js
zeck ( --help | help  )  
```

Print the version
```js
zeck ( --version | version )    
```

To start zeck configurations, use the init command and answer the questions below
```js
zeck init    
```
# Commands

## Profile
Create unlimited profiles, each configured with the information you want
```js
//listing profiles and their information
zeck profile list 
zeck profile 

//create a new profile by sending name via input
zeck profile add

//create a new profile directly
zeck profile add [name]

//Changing your current profile by sending name via input
zeck profile checkout

//Changing your current profile directly
zeck profile checkout [name]

//Deleting a profile
zeck profile remove [name]

//Resetting all profiles
zeck profile reset
```

## Config
Configure your current profile information
```js
//list your current profile information
zeck config list 
zeck config 

//Configure all information at once by sending via input
zeck config all

//Change zeck language
zeck config language

//Configure information to use commands that access a vps
zeck config vps

//Configure the url to use ping or performance testing commands
zeck config link
zeck config url
```

## Todo
Have an easy-to-use to-do list
```js
//listing all tasks
zeck todo list 
zeck todo 

//create a new task sending via input
zeck todo add

//create a new task directly
zeck todo add [task]

//deleting a task via id
zeck todo remove [taskID]

//changing the status of a task via id
zeck todo status [taskID]

//Resetting all tasks
zeck todo reset
```

## Help 
Show help panel
```js
zeck help
```

## Init 
Start zeck configuration
```js
zeck init
```

## Reset 
Reset zeck all configuration
```js
zeck reset
```

## Version 
Show zeck version
```js
zeck version
```

## Export 
Export as settings securely
```js
zeck export
```

## Import 
Import zeck settings using a token
```js
zeck import
```

