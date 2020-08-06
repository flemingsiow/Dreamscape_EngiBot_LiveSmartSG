import React from 'react';
import { Link } from 'react-router-dom';
import './RefundRequestPage.css'
import moment from 'moment'

class RefundRequestPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {     
            reload: true,         
            pager: {},
            pageOfItems: []            
        };        
        
    } //end constructor

    componentDidMount() {
        this.loadPage();
    }

    componentDidUpdate() {
        this.loadPage();       
    }


    findAll(){
        
        const params = new URLSearchParams(location.search);
        const page = parseInt(params.get('page')) || 1;

        let newurl = "/api/refundrequests"

        if (page !== this.state.pager.currentPage) {            
            
                fetch(`${newurl}?page=${page}`, { method: 'GET' })
                .then(response => response.json())
                .then(({pager, pageOfItems}) => {

                    this.setState({ pager: pager, pageOfItems:pageOfItems });
                });
            
            
        } // refresh is needed (new url is not the same as the one kept in stage)

    } //end findAll


    loadPage() {       
                                
        console.log(location)

        const { reload } = this.state;

        if (reload)
            this.findAll()
        
    } //end loadPage

    
    render() {
        const { pager, pageOfItems } = this.state;

        
        return (
                <div className="card-body">
                    <br/><br/>
                    <h3 className="card-header">Refund for Duplicate Purchases</h3>
                    <table className="table table-hover">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Request ID</th>
                                <th scope="col">Purchase ID</th>
                                <th scope="col">Approval Status</th>   
                                <th scope="col">Remarks</th>                       
                                <th scope="col">Submission Date</th>   
                            </tr>
                        </thead>
                        <tbody>
                        {pageOfItems.map(item =>
                        <tr key={item.id}>                            
                                <td>{item.id}</td>                                                        
                                <td>{item.purchaseid}</td>
                                <td>{item.approvalstatus}</td>   
                                <td>{item.remarks}</td>   
                                <td>{moment(item.createdAt).format('DD-MMM-YYYY hh:mm')}</td>                     
                        </tr>
                        )}
                        </tbody>
                        </table>                                
                

                </div>
        )


    } //end render

} //end class

export { RefundRequestPage };