import React from 'react';
import { Link } from 'react-router-dom';
import './PurchaseTransactionPage.css'
import moment from 'moment'

class PurchaseTransactionPage extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {    
            reload: true,        
            pager: {},
            pageOfItems: []
        };        
        

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
        
        console.log(location)

        const { reload } = this.state;

        if (reload)
            this.findAll()
        
        //let location_parts = location.href.split("/"); 
        

    } //end loadPage

    findAll(){
        
        var newurl = "/api/purchasetransactions"
        const params = new URLSearchParams(location.search);
        const page = parseInt(params.get('page')) || 1;

        if (page !== this.state.pager.currentPage) {     
            fetch(`${newurl}?page=${page}`, { method: 'GET' })
            .then(response => response.json())
            .then(({pager, pageOfItems}) => {                
                this.setState({ pager: pager, pageOfItems:pageOfItems, reload: false });
            });
        } //end if 
            

    } //end findAll

    
    /* React inherited method that is called everrytime the page needs to be refreshed */
    render() {

        const { pager, pageOfItems } = this.state;

        return (
                <div className="card-body">
                    <br/><br/>
                    <h3 className="card-header mx-auto">Report Transactions</h3>
                    <table className="table table-hover">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Transaction ID</th>
                                <th scope="col">Report ID</th>                        
                                <th scope="col">Report Title</th>                        
                                <th scope="col">User ID</th>                        
                                <th scope="col">User Name</th>                        
                                <th scope="col">Amount Paid</th>
                                <th scope="col">Date Purchased</th>
                            </tr>
                        </thead>
                        <tbody>
                        {pageOfItems.map(item =>
                        <tr key={item.id}>                            
                                <td>{item.id}</td>                                                        
                                <td>{item.reportid}</td>   
                                <td>{item.report.title}</td>                            
                                <td>{item.userid}</td>                            
                                <td>{item.user.name}</td>                            
                                <td><small>SGD</small> {item.amountpaid}</td>                            
                                <td>{moment(item.createdAt).format('DD-MMM-YYYY hh:mm')}</td>    
                        </tr>
                        )}
                        </tbody>
                        </table>
                        
                        <p></p>

                </div>
        )


    } //end render

} //end class

export { PurchaseTransactionPage };