import React from 'react';
import { Link } from 'react-router-dom';

class Navbara extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pager: {},
            pageOfItems: []
        };
    } //end constructor

    componentDidMount() {
        
    } // componentDidMount()

    componentDidUpdate() {
        
    } // componentDidUpdate()

    render() {

        return (
            

            <header>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <a className="navbar-brand" href="#">AcraEase</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav mr-auto">                            
                            <li className="nav-item">
                                <Link to={`/chatbot`} className="page-link">Acrabot</Link>
                            </li>

                            <li className="nav-item">
                                <Link to={`/mytextract`} className="page-link">Submit Request</Link>
                            </li>
                            
                            <li className="nav-item active">
                                <Link to={`/homepage`} className="page-link">Process</Link>                            
                            </li>                            
                            <li className="nav-item active">
                                <Link to={`/report`} className="page-link">Reports</Link>                            
                            </li>

                            <li className="nav-item active">
                                <Link to={`/purchasetransaction`} className="page-link">Transactions</Link>                            
                            </li>

                            <li className="nav-item active">
                                <Link to={`/purchasereport`} className="page-link">Purchase Reports</Link>                            
                            </li>

                            <li className="nav-item active">
                                <Link to={`/users`} className="page-link">Users</Link>                            
                            </li>

                            <li className="nav-item active">
                                <Link to={`/refundrequests`} className="page-link">Refund</Link>                            
                            </li>

                            <li className="nav-item active">
                                <Link to={`/companies`} className="page-link">Companies</Link>                            
                            </li>

                        </ul>
                    </div>
                </nav>
            
            </header>
            

        )

    } //end render

} //end class

export { Navbara};