const Client = require('bitcoin-core');
import dotenv from 'dotenv';

dotenv.config();

const rpcClient = new Client({ 
    host:process?.env.RPC_URL,
    port: process?.env.RPC_PORT, 
  username: process?.env.RPC_USER, 
  password: process?.env.RPC_PASS, 
  timeout: process?.env.RPC_TIMEOUT,
});

export default rpcClient;