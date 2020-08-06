import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Jumbotron from 'react-bootstrap/Jumbotron';
import {Navbara} from '../Navbara'

//https://morioh.com/p/11e32397cc89

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pager: {},
            pageOfItems: []
        };
    }

    componentDidMount() {
        this.loadPage();
    }

    componentDidUpdate() {
        this.loadPage();
    }
    

    loadPage() {        
        // get page of items from api
        const params = new URLSearchParams(location.search);
        console.log("Params" + params)
        const page = parseInt(params.get('page')) || 1;
        console.log("Page" + page)
        if (page !== this.state.pager.currentPage) {
            console.log("Fetching new page")
            fetch(`/api/items?page=${page}`, { method: 'GET' })
                .then(response => response.json())
                .then(({pager, pageOfItems}) => {
                    this.setState({ pager, pageOfItems });
                });
        }
        else{
            console.log("Still the same page")
        }
    }

    handleApprove(e){

    }

    render() {
        const { pager, pageOfItems } = this.state;

        return (
    
          

            <div className="card text-center m-3">

                <Navbara />
                <br/><br/>
                <h3 className="card-header">ACRA Waiver Requests</h3>
                <div className="card-body">
                    <table className="table table-hover">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Link</th>
                                <th scope="col">UEN</th>
                                <th scope="col">Type</th>
                                <th scope="col">Date Submitted</th>
                                <th scope="col">Applicant Name</th>
                                <th scope="col">Reasons</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                    <tbody>
                    {pageOfItems.map(item =>
                    <tr key={item.WaiverID}>                            
                            <td><Link to={`/items/${item.WaiverID}`} className="btn btn-outline-primary">Details</Link></td>
                            <td><Link to={`/uen/${item.UEN}`}>{item.UEN}</Link></td>
                            <td>{item.WaiverType}</td>                            
                            <td>{moment(item.RequestDate).format('DD-MMM-YYYY hh:mm')}</td>
                            <td>{item.ApplicantName}</td>
                            <td>{item.Reasons}</td>
                            <td>{moment(item.workflow[item.workflow.length-1].ProcessedDate).format('DD-MMM-YYYY hh:mm')}<br/>{item.workflow[item.workflow.length-1].WorkflowStatus}</td>
                        
                    </tr>
                    )}
                    </tbody>
                    </table>
                </div>



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
        );
    }
}

export { HomePage };