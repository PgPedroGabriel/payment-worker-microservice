# Payment Microservice

## Features

* Receive payment contract from RabbitMQ Queue worker
* Dispatch RabbitMQ exchange that payment data of external gateway system
* (Sentry to trace error logs)[https://sentry.io/]

### Checks

- [ ] make sure that .env file is created
- [ ] make sure if you will use docker

### Using docker

1. To build:

``` docker-compose up --build -d ```

2. Install RabbitMQ container and make sure that container is in order-network, sample:

2.1 - install RabbitMQ container

``` docker run -d --hostname my-rabbit --name some-rabbit -p 8080:15672 rabbitmq:3-management ```

2.2 - Add rabbitmq container payment network

``` docker network ls ```

``` docker network connect payment-worker-microservice_default some-rabbit ```


### Using your local machine

1. download yarn
2. yarn install
3. yarn dev

To build to production

``` yarn run build ```

the dist folder will be generated


To test

``` yarn test ```


### Deploy using a docker image

Build your own docker image, remember to change .env vars

``` docker build -f .\Dockerfile.prod -t orders-microservice-prod . ```

### Trick to vscode devolopment

Install plugins

1. ESLINT
2. Prettier
3. REST Client (to run requests inside vscode on requests file in root folder)
4. Editorconfig
5. Docker

### Development pending tasks

- [ ] Add client model to payment contract (queue)
- [ ] Add Type of Payment model (card/boleto/débito) to payment contract (queue)
- [ ] Add client Address Model to payment contract (queue)
- [ ] Add database to save payments
- [ ] Code coverge > 80%
- [x] Add Logging traces
- [x] Add ALARM when errors occur
- [ ] Revison of production dockerfile builder
- [ ] Create CI/CD pipelines with docker-compose to GCP Cloud Builder
- [ ] Send pod to Kubernets Cluster
