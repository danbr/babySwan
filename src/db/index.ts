const env = process.env.NODE_ENV || 'development'

import {knex} from 'knex';
import {development} from './knexfile';

//@TODO - add production and test environments
const KnexSetup = knex(development);
export default KnexSetup