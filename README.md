<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
<a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
<a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
<a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

Running the app

# development

$ yarn run start

# watch mode

$ yarn run start:dev

# production mode

$ yarn run start:prod

Test

# unit tests

$ yarn run test

# e2e tests

$ yarn run test:e2e

# test coverage

$ yarn run test:cov

Support
Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please read more here.

Stay in touch
Author - Kamil Myśliwiec
Website - https://nestjs.com
Twitter - @nestframework
License
Nest is MIT licensed.

Documentazione Tecnica del Progetto
Indice
Introduzione
Descrizione delle Entità
User
Technician
RequestsAction
Relazioni tra Entità
Chiamate API
User API
Technician API
RequestsAction API
Processo di Deploy Continuo
Introduzione
Questo documento descrive la struttura del database e le API di un sistema per la gestione delle richieste di intervento tecnico. Il sistema è sviluppato utilizzando il framework NestJS con TypeORM per la gestione delle entità e delle relazioni nel database. Il database è relazionale e configurato utilizzando Amazon RDS, un servizio fornito da AWS per la gestione dei database.

Descrizione delle Entità
User
L'entità User rappresenta un utente del sistema. Ogni utente può fare molte richieste di intervento tecnico.

Technician
L'entità Technician rappresenta un tecnico che può essere assegnato a varie richieste di intervento.

RequestsAction
L'entità RequestsAction rappresenta una richiesta di intervento tecnico fatta da un utente.

Relazioni tra Entità
Le relazioni tra le entità sono definite come segue:

Ogni utente (User) può fare molte richieste (RequestsAction), creando una relazione uno-a-molti tra User e RequestsAction.
Ogni richiesta (RequestsAction) è associata a un solo utente, creando una relazione molti-a-uno tra RequestsAction e User.
Chiamate API
User API

GET /users: Restituisce una lista di tutti gli utenti.
POST /users: Crea un nuovo utente.
GET /users/:id: Restituisce i dettagli di un utente specifico.
PUT /users/:id: Aggiorna i dettagli di un utente specifico.
DELETE /users/:id: Elimina un utente specifico.
Altre chiamate per verifica di email e recupero password.
Technician API

GET /technicians: Restituisce una lista di tutti i tecnici.
POST /technicians: Crea un nuovo tecnico.
GET /technicians/:id: Restituisce i dettagli di un tecnico specifico.
RequestsAction API

GET /requests: Restituisce una lista di tutte le richieste di intervento.
POST /requests: Crea una nuova richiesta di intervento.
GET /requests/:id: Restituisce i dettagli di una richiesta di intervento specifica.
PUT /requests/:id: Aggiorna i dettagli di una richiesta di intervento specifica.
DELETE /requests/:id: Elimina una richiesta di intervento specifica.
Processo di Deploy Continuo

L'immagine sopra illustra il flusso di deploy continuo per un'applicazione NestJS utilizzando servizi AWS e GitHub. Ecco una descrizione dettagliata di ogni fase del processo:

Inizio (Start)
Il processo inizia con lo sviluppo di un progetto NestJS (Node.js). NestJS è un framework per costruire applicazioni server-side efficienti e scalabili utilizzando TypeScript.

Repository GitHub
Una volta sviluppato, il codice del progetto NestJS viene caricato su un repository GitHub. GitHub serve come sistema di controllo delle versioni, permettendo di gestire il codice sorgente e collaborare con altri sviluppatori.

AWS CodePipeline
AWS CodePipeline è un servizio di integrazione e consegna continua che automatizza i passaggi necessari per il deploy delle applicazioni. Ogni volta che c'è una modifica nel repository GitHub (ad esempio un push), CodePipeline avvia il processo di build e deploy. CodePipeline è configurato per monitorare il repository GitHub e avviare automaticamente la pipeline quando vengono rilevati nuovi commit o modifiche.

AWS CodeBuild
AWS CodeBuild è un servizio di integrazione continua che compila il codice sorgente, esegue i test e produce pacchetti software pronti per il deploy. CodeBuild recupera il codice dal repository GitHub, lo compila e lo testa, assicurandosi che sia privo di errori e pronto per l'uso in produzione.

AWS Elastic Beanstalk
AWS Elastic Beanstalk è un servizio di gestione delle applicazioni che facilita il deploy e il ridimensionamento delle applicazioni web e dei servizi sviluppati con diversi linguaggi e piattaforme. Dopo che il codice è stato costruito e testato da CodeBuild, Elastic Beanstalk prende il pacchetto pronto e lo distribuisce su un ambiente preconfigurato. Elastic Beanstalk gestisce automaticamente il provisioning della capacità, il bilanciamento del carico, il monitoraggio delle prestazioni e l'applicazione delle patch.

Fine (End)
Il processo di deploy si conclude con il codice dell'applicazione in esecuzione su AWS Elastic Beanstalk, pronto per essere utilizzato dagli utenti finali.
