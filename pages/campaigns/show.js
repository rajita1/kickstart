import React, {Component} from 'react';
import Layout from '../../components/Layout';
import {Grid, Card, Button} from 'semantic-ui-react';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import {Link} from '../../routes';


class CampaignShow extends Component {

   static async getInitialProps(props){
     const campaign = Campaign(props.query.address);
      console.log(props.query.address);
     const methods = await campaign.methods;
    console.log(methods);
     const summary = await campaign.methods.getSummary().call();
     console.log(summary);
     return {
       address: props.query.address,
       minimumContribution: summary[0],
       balance: summary[1],
       requestsCount: summary[2],
       approversCount: summary[3],
       manager: summary[4]

     };


   }

   renderCards() {
     const
       {
         balance,
         manager,
         minimumContribution,
         requestsCount,
         approversCount
       } = this.props;

     const items = [
       {
         header: manager,
         meta: 'Address of Manager',
         description: 'The manager created this campaign and can create requests to withdraw money',
         style: {overflowWrap: 'break-word'}
       },
       {
         header: minimumContribution,
         meta: 'Min Contribution (wei)',
         description:  'You must contribute at least this much wei to become an approver'
       },
{
         header: requestsCount,
         meta: 'Number of requests',
         description:  'A request tries to withdraw from the contract'
       },
       {
       header: approversCount,
       meta: 'Number of requests',
       description:  'Number of people who have already donated to the campaign'
     },
     {
     header: web3.utils.fromWei(balance, 'ether'),
     meta: 'Campaign Balance (ether)',
     description:  'The balance is how much money has left to spend'
     }

     ];
     return <Card.Group items = {items}/>;
   }

   render() {
       console.log('In show render');
     return (
       <Layout>
              <h3>Campaign Show</h3>
              <Grid>
              <Grid.Row>
                 <Grid.Column width={10}>
                     {this.renderCards()}

                  </Grid.Column>
               <Grid.Column width={6}>

                  <ContributeForm address = {this.props.address}/>

               </Grid.Column>
               </Grid.Row>



               </Grid>


     </Layout>

      );
         console.log('Render Complete');
   }
}

export default CampaignShow;
