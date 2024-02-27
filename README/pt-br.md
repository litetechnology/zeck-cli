# ZECK CLI
 <h3> Uma solução completa para todos os tipos de desenvolvedores</h3>

[![Downloads NPM](https://img.shields.io/npm/dm/zeck-cli.svg?style=flat)](https://npmcharts.com/compare/zeck-cli?minimal=true)
[![Tamanho da Instalação](https://packagephobia.now.sh/badge?p=zeck-cli)](https://packagephobia.now.sh/result?p=zeck-cli)
[![Versão](https://img.shields.io/npm/v/zeck-cli.svg)](https://npmjs.org/package/zeck-cli)
[![Licença](https://img.shields.io/npm/l/zeck-cli.svg)](https://github.com/lite-technology/zeck-cli/blob/main/package.json)


[english](README.md) | [portugues](README/pt-br.md)

## Guia
- [Recursos](#main-features)
- [Instalação](#installation)
- [Uso](#usage)
- [Início rápido](#quick-start)
- [Comandos](#commands)
    * [profile](#Profile)
    * [config](#Config)
    * [todo](#Todo)
    * [help](#Help)
    * [init](#Init)
    * [reset](#reset)
    * [version](#version)
    * [export](#export)
    * [import](#import)


## Recursos Principais
- Lista de tarefas completa
- Criação de perfis com diferentes configurações
- Recursos para desenvolvedores (logs, ping, status, build, templates)
- Monitoramento e gerenciamento fácil de projetos
- Multilíngue (Português e Inglês)
- Gerenciamento de VPS (upload, backup, start, etc)
- Backup local e remoto de projetos, automático ou não

### Instalação

```js
npm install -g zeck-cli
```

### Uso 
```js
//executar um comando
zeck COMANDO [...args]
```

### Início Rápido
Para ver todos os comandos, use
```js
zeck ( --help | help  )  
```

Imprimir a versão
```js
zeck ( --version | version )    
```

Para iniciar as configurações do zeck, use o comando init e responda às perguntas abaixo
```js
zeck init    
```
# Comandos

## Profile
Crie perfis ilimitados, cada um configurado com as informações que desejar
```js
//listar perfis e suas informações
zeck profile list 
zeck profile 

//criar um novo perfil enviando o nome via entrada
zeck profile add

//criar um novo perfil diretamente
zeck profile add [nome]

//Mudar para seu perfil atual enviando o nome via entrada
zeck profile checkout

//Mudar para seu perfil atual diretamente
zeck profile checkout [nome]

//Excluir um perfil
zeck profile remove [nome]

//Redefinir todos os perfis
zeck profile reset
```

## Config
Configure as informações do seu perfil atual
```js
//listar informações do seu perfil atual
zeck config list 
zeck config 

//Configurar todas as informações de uma vez enviando via entrada
zeck config all

//Alterar o idioma do zeck
zeck config language

//Configurar informações para usar comandos que acessam uma VPS
zeck config vps

//Configurar a URL para usar comandos de ping ou teste de desempenho
zeck config link
zeck config url
```

## Todo
Tenha uma lista de tarefas fácil de usar
```js
//listar todas as tarefas
zeck todo list 
zeck todo 

//criar uma nova tarefa enviando via entrada
zeck todo add

//criar uma nova tarefa diretamente
zeck todo add [tarefa]

//excluir uma tarefa via ID
zeck todo remove [ID da tarefa]

//alterar o status de uma tarefa via ID
zeck todo status [ID da tarefa]

//Redefinir todas as tarefas
zeck todo reset
```

## Help 
Mostrar o painel de ajuda
```js
zeck help
```

## Init 
Iniciar a configuração do zeck
```js
zeck init
```

## Reset 
Redefinir todas as configurações do zeck
```js
zeck reset
```

## Version 
Mostrar a versão do zeck
```js
zeck version
```

## Export 
Exportar configurações com segurança
```js
zeck export
```

## Import 
Importar configurações do zeck usando um token
```js
zeck import
```