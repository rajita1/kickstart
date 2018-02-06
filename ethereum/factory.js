import web3 from 'web3';

import CampaignFactory from './build/CampaignFactory.json';

console.log(CampaignFactory);

const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface), "0xcb1E5e006E3447FF61C1078009e831A5C91F3151");

console.log('The Problem is above this line');

export default instance;
