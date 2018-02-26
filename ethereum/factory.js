import web3 from './web3';

import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface), "0x1C7E21A6148AcEc75830cBc91784352DD3eC45Ec");

export default instance;
