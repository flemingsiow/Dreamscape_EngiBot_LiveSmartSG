import React from 'react';
import { Link } from 'react-router-dom';
import './UserPage.css'

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {            
            pager: {},
            pageOfItems: [],            
            
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

        let newurl = "/api/users"

        if (page !== this.state.pager.currentPage) {            
            
                fetch(`${newurl}?page=${page}`, { method: 'GET' })
                .then(response => response.json())
                .then(({pager, pageOfItems}) => {

                    this.setState({ pager: pager, pageOfItems:pageOfItems });
                });
            
            
        } // refresh is needed (new url is not the same as the one kept in stage)

    } //end findAll


    loadPage() {       
                                
        this.findAll()
        
    } //end loadPage

    
    render() {
        const { pager, pageOfItems } = this.state;

        
        return (
                <div className="card-body">
                    <br/><br/>
                    <h3 className="card-header">Users Registered with ACRA</h3>
                    <table className="table table-hover">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>                        
                            </tr>
                        </thead>
                        <tbody>
                        {pageOfItems.map(item =>
                        <tr key={item.id}>                            
                                <td>{item.id}</td>                                                        
                                <td>{item.name}</td>                            
                        </tr>
                        )}
                        </tbody>
                        </table>                                
                

                </div>
        )


    } //end render

} //end class

export { UserPage };