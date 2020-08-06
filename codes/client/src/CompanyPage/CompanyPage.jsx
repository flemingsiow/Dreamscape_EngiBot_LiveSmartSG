import React from 'react';
import { Link } from 'react-router-dom';
import './CompanyPage.css'
import {Navbara} from '../Navbara'

class CompanyPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {            
            pager: {},
            pageOfItems: [],            
            
        };        
        
    } //end constructor

    componentDidMount() {
        this.findAll();
    }

    componentDidUpdate() {
        this.findAll();       
    }


    findAll(){
        
        const params = new URLSearchParams(location.search);
        const page = parseInt(params.get('page')) || 1;

        let newurl = "/api/companies"

        if (page !== this.state.pager.currentPage) {            
            
                fetch(`${newurl}?page=${page}`, { method: 'GET' })
                .then(response => response.json())
                .then(({pager, pageOfItems}) => {

                    this.setState({ pager: pager, pageOfItems:pageOfItems });
                });
            
            
        } // refresh is needed (new url is not the same as the one kept in stage)

    } //end findAll

    
    render() {
        const { pager, pageOfItems } = this.state;

        
        return (
                <div className="card text-center m-3">
    

                    <Navbara />
                    <br/><br/>
                    <h3 className="card-header">Companies Registered with ACRA</h3>
                    <div className="card-body">
                        <table className="table table-hover">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Company Name</th>
                                    <th scope="col">UEN</th>     
                                    <th scope="col">Status</th>  
                                    <th scope="col">Address</th>                     
                                    <th scope="col">Industry</th>  
                                </tr>
                            </thead>
                            <tbody>
                            {pageOfItems.map(item =>
                                <tr key={item.UEN}>                            
                                    <td>{item.CompanyName}</td>                                                        
                                    <td>{item.UEN}</td>
                                    <td>{item.Status}</td>    
                                    <td>{item.ADDRESS}</td>                                
                                    <td>{item.Industry}</td>    
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
        )


    } //end render

} //end class

export { CompanyPage };