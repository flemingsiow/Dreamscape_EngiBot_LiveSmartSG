import React from 'react';
import { Link } from 'react-router-dom';
import './PurchaseReportPage.css'

class PurchaseReportPage extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {    
            reload: true,
            data_loaded: {users_loaded:false,reports_loaded:false},
            reportid:"",
            userid:"",
            amountpaid:"",
            //purchasetransaction: {reportid:-1, userid:-1, amountpaid:""},
            reports: {pager:0, pageOfItems:[]},
            users: {pager:0, pageOfItems:[]}
        };        
        
        this.loadPage = this.loadPage.bind(this)
        this.handleUserIDChange = this.handleUserIDChange.bind(this)
        this.handleReportIDChange = this.handleReportIDChange.bind(this)        
        this.handlePurchaseReport = this.handlePurchaseReport.bind(this)
        this.renderPrice = this.renderPrice.bind(this)

    } //end constructor

    /* React inherited method that runs after the component output has been rendered to the DOM.  */
    componentDidMount() {
        this.loadPage();
    }

    /* React inherited method that is invoked immediately after updating occurs.  */
    componentDidUpdate() {
        this.loadPage();       
    }
        

    loadPage() {       
        
        const { reload } = this.state;

        if (reload){
            this.getUsers()
            this.getReports()
            this.setState({reload:false})
        }
        
        //let location_parts = location.href.split("/"); 
        

    } //end loadPage

    getReports(){

        let newurl = "/api/reports"

        fetch(`${newurl}`, { method: 'GET' })
                .then(response => response.json())
                .then(({pager, pageOfItems}) => {                    
                    this.setState({ 
                        reports: {pager: pager, pageOfItems: pageOfItems},
                                    data_loaded: {reports_loaded:true}
                                });
                });
    } //end getReports

    getReportByID(id){
        const {userid} = this.state

        let newurl = "/api/reports/id/" + id
        console.log(newurl)
            
        fetch(newurl, { method: 'GET' })
        .then(response => response.json())
        .then(myitem => {            
            var price = myitem[0].price           
            this.setState({userid: userid, reportid: id, amountpaid: price})
        });

        
    } //end getReportByID

    getUsers(){

        let newurl = "/api/users"

        fetch(`${newurl}`, { method: 'GET' })
                .then(response => response.json())
                .then(({pager, pageOfItems}) => {                    
                    this.setState({ 
                        users: {pager: pager, pageOfItems: pageOfItems},
                        data_loaded: {users_loaded:true}
                     }); 
                });
    } //end getReports

    handlePurchaseReport(event){    
        
        const {reportid, userid,amountpaid } = this.state

        if (reportid == -1){
                alert("Please choose a report to purchase")
                return
        }
        if (userid == -1){
            alert("Please choose a user")
            return;
        }
        if (amountpaid == ""){
            alert("Please choose a report to purchase")
            return;
        }

        let purchasetransaction = {
            "reportid": this.state.reportid,
            "userid": this.state.userid,
            "amountpaid": this.state.amountpaid
        };

        var bodycontent = JSON.stringify(purchasetransaction)
        console.log(bodycontent)

        fetch('/api/purchasetransactions/create', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            // We convert the React state to JSON and send it as the POST body
            body: bodycontent
          }).then((response) =>{
            if (response.status == 200){
                alert('Thank you for your purchase!')
                console.log("Transaction created successfully")
                console.log(response)    
                this.setState({reportid:-1,userid:-1,amountpaid:""} )        
                return response.json();
                
            }
            else{
                alert("Sorry, something went wrong while trying to complete your purchase")
            }
          });
            

    } //end function

    handleUserIDChange(event){
        
        var userid = event.target.value
        console.log("User ID: " + userid)
        this.setState({ userid: userid});                
    } //end handleReportChange

    handleReportIDChange(event){
        console.log(event.target)
        var reportid = event.target.value  
        console.log("Report ID:" + reportid)      
        this.getReportByID(reportid)
        
    } //end handleReportChange

    
    renderPrice(purchasetransaction)  {
            if (this.state.amountpaid!="") {
                let ctrl = (
                    <>
                    <div>
                        <label>Price</label><br/>
                        <input type="text" readOnly name="amountpaid" value={this.state.amountpaid} />
                    </div>
                    </>
                );
                return ctrl;
             } //end if
    } //end renderPrice
    

    /* React inherited method that is called everrytime the page needs to be refreshed */
    render() {
        
        const reports = this.state.reports.pageOfItems;
        const users = this.state.users.pageOfItems;        
        const priceElement = this.renderPrice(this.state.amountpaid);


        return (
                <div className="card-body">
                    <br/><br/>
                    <h3 className="card-header display-4">Buy a Report</h3>
                    <br/>
                   <label>User Buying Report</label><br/>
                   <select name="users" onChange={this.handleUserIDChange}>
                    {users.map(useritem =>
                        <option key={useritem.id} value={useritem.id}>{useritem.name}</option>
                    )}
                    </select>

                    <p></p>
                
                    <label>Report to Buy</label><br/>
                    <select name="reports" onChange={this.handleReportIDChange}>
                    {reports.map(reportitem =>
                        <option key={reportitem.id} value={reportitem.id} title={reportitem.description}>{reportitem.title}</option>
                    )}
                    </select>

                    <p></p>
                    
                    
                    {priceElement}

                    <p></p>
             
          
                <button className="btn btn-warning" onClick={this.handlePurchaseReport}>Purchase</button>

          
                </div>
        )


    } //end render

} //end class

export { PurchaseReportPage };