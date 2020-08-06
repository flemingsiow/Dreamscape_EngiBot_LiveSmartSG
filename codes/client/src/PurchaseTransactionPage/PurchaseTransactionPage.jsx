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
        this.findAll();
    }

    /* React inherited method that is invoked immediately after updating occurs.  */
    componentDidUpdate() {
        this.findAll();       
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

                        <div className="card-footer pb-0 pt-3">
                            {pager.pages && pager.pages.length &&
                            <ul className="pagination">
                                <li className={`page-item first-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                                    <Link to={{ search: `?page=1` }} className="page-link">First</Link>
                                </li>
                                <li className={`page-item previous-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                                    <Link to={{ search: `?page=${pager.currentPage - 1}` }} className="page-link">Previous</Link>
                                </li>
                                {pager.pages.map(page =>
                                    <li key={page} className={`page-item number-item ${pager.currentPage === page ? 'active' : ''}`}>
                                        <Link to={{ search: `?page=${page}` }} className="page-link">{page}</Link>
                                    </li>
                                )}
                                <li className={`page-item next-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                                    <Link to={{ search: `?page=${pager.currentPage + 1}` }} className="page-link">Next</Link>
                                </li>
                                <li className={`page-item last-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                                    <Link to={{ search: `?page=${pager.totalPages}` }} className="page-link">Last</Link>
                                </li>
                            </ul>
                            }                   
                        </div>

                </div>
        )


    } //end render

} //end class

export { PurchaseTransactionPage };