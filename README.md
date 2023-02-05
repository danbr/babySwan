# Standing Order Bitcoin

### A Bitcoin project built with Bitcoin Core, Typescript, Node, & PostgresDB.

## Requirements

- Nodejs
- A Running Bitcoin Core node on Signet or Testnet network
- PostgresDB installed

## Concept

How can we deal with standing order i.e. recurring future payments with Bitcoin? This project explores how it could be implemented.

## Purpose

This project is an opportunity to learn about Bitcoin development, and how to integrate it into a nodeJS webapp.
The backend uses Koa to expose the database (PostgressDB) and Bitcoin via a REST API. The backend runs a cron service. The cron checks the DB for any standing orders. If an order is ready, it is broadcast to the Bitcoin network. The backend communicates to a locally running Bitcoin core node via RPC.
The frontend is built using React.

## Status

Work-in-Progress

## How It (will) Works

- User registers a new account (saved to DB), a Segwit bech32 is created address for the user, zero balance.
- UTXO can be sent to the address.
- User Log-in, checks balance.
- User creates a standing order (a reoccuring future payment). The standing order transaction is signed and stored into the DB.
- A local worker checks the DB for standing orders that are ready to be executed. If one is found, the previously signed standing order transaction is broadcast to the Bitcoin network.
- User can add, delete, edit standing orders.

## How to Run

- Clone the project
- Run `npm install`
- Install knex `npm install knex -g`
- Start Bitcoin node by running `bitcoind`
- Confirm that node is running using `bitcoin-cli -getinfo`
- Create a .env file. (Start from .env_example)
- Migrate Database schemas `knex migrate:latest`
- Run `npm run dev`

## API ROUTES

- GET /v1 = Base route

- POST /v1/user/register = Register a user, create a Segwit bech32 address for the user
- POST /v1/user/login = User login
- GET /v1/user/address = Get user bitcoin segwit address to receive utxo
- GET /v1/user/balance = Get user bitcoin balance

- POST /v1/order/createOrder = Create a recurring order
- GET /v1/order/list = Get user's recurring order
- PUT /v1/order/:orderId = Edit recurring order
- DELETE /v1/order/:orderId = Delete recurring order

## Future Work

Extend the current functionality to support recccuring Ligthning payments.

## Acknowledgement

This was inspired by the projects built by Qala & @raphael_eyerin https://raphtyosaze.medium.com/
