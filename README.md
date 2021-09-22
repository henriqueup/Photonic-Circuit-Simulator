# Photonic Crystal Logic Circuit Simulator 

- [Photonic Crystal Logic Circuit Simulator](#photonic-crystal-logic-circuit-simulator)
  - [1. Instructions](#1-instructions)
    - [1.1 Running](#11-running)
    - [1.2 Configuring the DB](#12-configuring-the-db)

## 1. Instructions

### 1.1 Running
To run the system using docker, simply use the command: 
  - docker-compose up (--build)

Then, access it in the browser on localhost:3000 (frontend) and localhost:8080 (backend)

### 1.2 Configuring the DB
With the container running, access it via the command:
  - docker exec -it ***mongoContainer*** bash

Then, for the appUser configuration, do the following:
  - Enter mongo as the root user
  - Set the current database
  - Create the application's user
  - Exit and reconnect as the new user
  - Exit and finish

To do so, use the commands:
  - mongo -u ***rootUser*** -p ***rootPwd*** 
  - use ***database***
  - db.createUser({user: '***appUser***', pwd: '***appPwd***', roles: [{role: 'readWrite', db: '***database***'}]})
  [//]: <> (db.createUser({user: 'appUser', pwd: 'phcsim123', roles: [{role: 'readWrite', db: 'phcsim'}]}))
  - exit
  - mongo -u ***appUser*** -p ***appPwd*** --authenticationDatabase ***database***
  - exit