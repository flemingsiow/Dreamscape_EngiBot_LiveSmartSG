import React from 'react';

import { HomePage } from '../HomePage';
import { WaiverPage } from '../WaiverPage';
import { WorkflowPage } from '../WorkflowPage';
import { ReportPage } from '../ReportPage';
import { PurchaseTransactionPage } from '../PurchaseTransactionPage';
import { PurchaseReportPage } from '../PurchaseReportPage';
import { ChatbotPage } from '../ChatbotPage';
import { TextractPage } from '../TextractPage';
import { UserPage } from '../UserPage';
import { RefundRequestPage } from '../RefundRequestPage';
import { CompanyPage } from '../CompanyPage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {Navbara} from '../Navbara'
import {Footera} from '../Footera'

class App extends React.Component {
    render() {
        return (            
              <Router>
           <div>
              <Navbara />
            </div>
            <div>
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/homepage" component={HomePage}></Route>
              
              <Route path="/items/:id" component={WaiverPage}/> 

          <Route path="/uen/:id">
            <WaiverPage/>
          </Route>

          <Route path="/workflow/uen/:id">
            <WorkflowPage/>
          </Route>

          <Route path="/workflow/create">
            <WorkflowPage/>
          </Route>

          <Route exact path="/report" component={ReportPage}></Route>
          <Route path="/report/id/:id" component={ReportPage}></Route>
          <Route path="/report/title" component={ReportPage}></Route>
          <Route exact path="/report/create" component={ReportPage}></Route>

          <Route exact path="/purchasetransaction" component={PurchaseTransactionPage}></Route>
          <Route exact path="/purchasereport" component={PurchaseReportPage}></Route>

          <Route exact path="/chatbot" component={ChatbotPage}></Route>
          <Route exact path="/mytextract" component={TextractPage}></Route>

          <Route exact path="/users" component={UserPage}></Route>

          <Route exact path="/refundrequests" component={RefundRequestPage}></Route>

          <Route exact path="/companies" component={CompanyPage}></Route>


            </Switch>
      </div>

      <div>
        <Footera />
      </div>

    </Router>
    
    
        );
    } //end render

} //end App

function About() {
  return <h2>About</h2>;
}




export { App }; 