import Mocha from 'mocha';
import './interfaces/bdd';

import getClient from './client';
// const reflowClient = require('reflow-client');

Mocha.prototype.initClient = async function(clientSettings) {
  this.client = await getClient(clientSettings);
  return this.client
}

export default Mocha
