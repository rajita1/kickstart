import React, {Component} from 'react';
import {Button, Table} from 'semantic-ui-react';
import {Link} from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const {address} = props.query;

    const campaign = Campaign(address);

    const requestCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();
    console.log('Before return in static method');
    const requests = await Promise.all(
      Array(parseInt(requestCount)).fill().map((element, index) => {
        return campaign.methods.requests(index).call();
    })
  );
console.log('After promise thingy in static method');
      return {address, requests, requestCount, approversCount};
  }

  renderRows() {
  this.props.requests.map((request, index) => {
    return (<RequestRow
    key={index}
    id={index}
    request={request}
    address={this.props.address}
    approversCount={this.props.approversCount}
    />
  );
}) ;
  }

  render() {
      const {Header, Row, HeaderCell, Body} = Table;
      console.log('Inside Index.js REnder');
    return (

      <Layout>
      <h3>Request List</h3>
      <Link route={`/campaigns/${this.props.address}/requests/new`}>
      <a>
      <Button primary floated="right" style={{marginBottom: 10}}>Add Request</Button>
      </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
          <Body>{this.renderRows()}</Body>

        </Header>
      </Table>
           <div>Found {this.props.requestCount} requests.</div>
      </Layout>
    );
  }
}
export default RequestIndex;
