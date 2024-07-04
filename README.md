### Documentazione Tecnica del Progetto

#### Indice

1. Introduzione
2. Descrizione delle Entità
   - User
   - Technician
   - RequestsAction
3. Relazioni tra Entità
4. Chiamate API
   - User API
   - Technician API
   - RequestsAction API
5. Processo di Deploy Continuo

---

#### Introduzione

Questo documento descrive la struttura del database e le API di un sistema per la gestione delle richieste di intervento tecnico. Il sistema è sviluppato utilizzando il framework NestJS con TypeORM per la gestione delle entità e delle relazioni nel database. Il database è relazionale e configurato utilizzando Amazon RDS, un servizio fornito da AWS per la gestione dei database.

#### Descrizione delle Entità

**User**
L'entità User rappresenta un utente del sistema. Ogni utente può fare molte richieste di intervento tecnico.

**Technician**
L'entità Technician rappresenta un tecnico che può essere assegnato a varie richieste di intervento.

**RequestsAction**
L'entità RequestsAction rappresenta una richiesta di intervento tecnico fatta da un utente.

#### Relazioni tra Entità

Le relazioni tra le entità sono definite come segue:

- Ogni utente (User) può fare molte richieste (RequestsAction), creando una relazione uno-a-molti tra User e RequestsAction.
- Ogni richiesta (RequestsAction) è associata a un solo utente, creando una relazione molti-a-uno tra RequestsAction e User.

#### Chiamate API

**User API**

- `GET /users`: Restituisce una lista di tutti gli utenti.
- `POST /users`: Crea un nuovo utente.
- `GET /users/:id`: Restituisce i dettagli di un utente specifico.
- `PUT /users/:id`: Aggiorna i dettagli di un utente specifico.
- `DELETE /users/:id`: Elimina un utente specifico.
- Altre chiamate per verifica di email e recupero password.

**Technician API**

- `GET /technicians`: Restituisce una lista di tutti i tecnici.
- `POST /technicians`: Crea un nuovo tecnico.
- `GET /technicians/:id`: Restituisce i dettagli di un tecnico specifico.

**RequestsAction API**

- `GET /requests`: Restituisce una lista di tutte le richieste di intervento.
- `POST /requests`: Crea una nuova richiesta di intervento.
- `GET /requests/:id`: Restituisce i dettagli di una richiesta di intervento specifica.
- `PUT /requests/:id`: Aggiorna i dettagli di una richiesta di intervento specifica.
- `DELETE /requests/:id`: Elimina una richiesta di intervento specifica.

#### Processo di Deploy Continuo

L'immagine seguente illustra il flusso di deploy continuo per un'applicazione NestJS utilizzando servizi AWS e GitHub. Ecco una descrizione dettagliata di ogni fase del processo:

**Inizio (Start)**
Il processo inizia con lo sviluppo di un progetto NestJS (Node.js). NestJS è un framework per costruire applicazioni server-side efficienti e scalabili utilizzando TypeScript.

**Repository GitHub**
Una volta sviluppato, il codice del progetto NestJS viene caricato su un repository GitHub. GitHub serve come sistema di controllo delle versioni, permettendo di gestire il codice sorgente e collaborare con altri sviluppatori.

**AWS CodePipeline**
AWS CodePipeline è un servizio di integrazione e consegna continua che automatizza i passaggi necessari per il deploy delle applicazioni. Ogni volta che c'è una modifica nel repository GitHub (ad esempio un push), CodePipeline avvia il processo di build e deploy. CodePipeline è configurato per monitorare il repository GitHub e avviare automaticamente la pipeline quando vengono rilevati nuovi commit o modifiche.

**AWS CodeBuild**
AWS CodeBuild è un servizio di integrazione continua che compila il codice sorgente, esegue i test e produce pacchetti software pronti per il deploy. CodeBuild recupera il codice dal repository GitHub, lo compila e lo testa, assicurandosi che sia privo di errori e pronto per l'uso in produzione.

**AWS Elastic Beanstalk**
AWS Elastic Beanstalk è un servizio di gestione delle applicazioni che facilita il deploy e il ridimensionamento delle applicazioni web e dei servizi sviluppati con diversi linguaggi e piattaforme. Dopo che il codice è stato costruito e testato da CodeBuild, Elastic Beanstalk prende il pacchetto pronto e lo distribuisce su un ambiente preconfigurato. Elastic Beanstalk gestisce automaticamente il provisioning della capacità, il bilanciamento del carico, il monitoraggio delle prestazioni e l'applicazione delle patch.

**Fine (End)**
Il processo di deploy si conclude con il codice dell'applicazione in esecuzione su AWS Elastic Beanstalk, pronto per essere utilizzato dagli utenti finali.

---

Questa documentazione fornisce una panoramica completa della struttura del database, delle API e del processo di deploy continuo per l'applicazione NestJS.
