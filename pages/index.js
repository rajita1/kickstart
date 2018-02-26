import React, {Component} from 'react';
import {Card, Button} from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import {Link} from '../routes';

class CampaignIndex extends Component {

static async getInitialProps() {
  //before rendering, that makes it faster so it's executed on the class, not the instance
  const campaigns = await factory.methods.getDeployedCampaigns().call();

  return {campaigns};
}

renderCampaigns() {
const items = this.props.campaigns.map(address => {
  return{
    header: address,
    description: <Link route={`/campaigns/${address}`}><a>View Campaign</a></Link>,
    fluid: true //width of the card is arbitrary
};
});
  return <Card.Group items={items}/>;
}

render() {
  return(
      <Layout>
<div>

<h3>Open Campaigns</h3>
<Link route={`/campaigns/new`}>
<a>
<Button floated="right" content="Create Campaign" icon="add circle" primary></Button>
</a>
</Link>
{this.renderCampaigns()}
</div>
</Layout>
);

}
}
export default CampaignIndex;
