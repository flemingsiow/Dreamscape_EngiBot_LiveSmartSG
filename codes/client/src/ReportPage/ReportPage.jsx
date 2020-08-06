import React from 'react';
import { Link } from 'react-router-dom';
import './ReportPage.css'

class ReportPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            requestType: "",
            pager: {},
            pageOfItems: [],
            url: "",
            current_title: "",
            prev_title: ""
            
        };        
        this.handleTitleOnChange = this.handleTitleOnChange.bind(this)
        this.handleFindByTitleRequest = this.handleFindByTitleRequest.bind(this);

    } //end constructor

    componentDidMount() {
        this.loadPage();
    }

    componentDidUpdate() {
        this.loadPage();       
    }

    handleTitleOnChange(event){
        this.setState({prev_title: this.state.current_title})
        this.setState({current_title: event.target.value});
    }

    createNewRecord(current_request_type,location_parts){
        const url = this.state.url;
        let title = location_parts[location_parts.length-1];        
        newurl = "/api/reports/create"

        if (newurl!=url){            
            
            let report = {     
                "title": this.state.report.title,
                "description": this.state.report.description,
                "price": this.state.report.price
            };  

            fetch('/api/reports/create', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},                
                body: JSON.stringify(report)
              }).then((response) =>{
                console.log("Report created successfully")
                console.log(response)                
                this.setState({refresh:true});
                return response.json();
              });
        }
    } //end createNewRecord

    findByID(current_request_type,location_parts){

    } //end findByTitle

    findByTitle(current_request_type,location_parts){
        console.log("In findByTitle...")
        
        const url = this.state.url;
        const params = new URLSearchParams(location.search);

        params.forEach(function(value, key) { 
            console.log(key,value); 
          }); 
                
        const page = parseInt(params.get('page')) || 1;
        let title = params.get('title');        

        if (!title){
            title = this.state.current_title;
        }               

        console.log("title is " + title)

        let newurl = "/api/reports/get"

        console.log("Old url = " + url)
        console.log("New url = " + newurl)

        if (title!= this.state.prev_title){                 
            console.log("Different URL, so let's hit the API")
            //if (params.get('page')== null || page !== this.state.pager.currentPage) {            
            if (params.get('page')== null || page !== this.state.pager.currentPage) {            
                console.log("Fetching URL")
                fetch(`${newurl}?page=${page}&title=${title}`, { method: 'GET' })
                .then(response => response.json())
                .then(({pager, pageOfItems}) => {
                    console.log("pager set")
                    this.setState({ pager: pager, pageOfItems:pageOfItems, url: newurl,requestType: current_request_type });
                });
            } // refresh is needed because it is a new page
            
        } // refresh is needed (new url is not the same as the one kept in stage)

    } //end findByTitle


    findAll(current_request_type,location_parts){
        console.log("In findAll...")

        const url = this.state.url;
        const params = new URLSearchParams(location.search);
        const page = parseInt(params.get('page')) || 1;

        let newurl = "/api/reports"

        console.log("Old url = " + url)
        console.log("New url = " + newurl)


        if (newurl!=url){                                    
            if (params.get('page')== null || page !== this.state.pager.currentPage) {            
                console.log("Fetching URL")
                fetch(`${newurl}?page=${page}`, { method: 'GET' })
                .then(response => response.json())
                .then(({pager, pageOfItems}) => {
                    console.log("pager set")
                    this.setState({ pager: pager, pageOfItems:pageOfItems, url: newurl,requestType: current_request_type });
                });
            } // refresh is needed because it is a new page
            
        } // refresh is needed (new url is not the same as the one kept in stage)

    } //end findAll


    loadPage() {       
        
        let location_parts = location.href.split("/"); 
        let current_request_type = "findAll"

        console.log("In loadPage Top.  Current request type is " + current_request_type)

        if (location.href.indexOf("/create")!=-1)
            current_request_type = "create"
        else if (location.href.indexOf("/id/")!=-1)
            current_request_type = "findByID"        
        else if (location.href.indexOf("/title")!=-1)
            current_request_type = "findByTitle"       

        if (current_request_type == "create") {
           this.createNewRecord(current_request_type,location_parts)
        }
        else if (current_request_type == "findByID") {
            this.findByID(current_request_type,location_parts)
        }        
        else if (current_request_type == "findByTitle") {
            this.findByTitle(current_request_type,location_parts)
        }
        else {
            this.findAll(current_request_type,location_parts)
        }

        console.log("In loadPage Bottom.  Current rqquest type is " + current_request_type)


    } //end loadPage

    handleFindByTitleRequest(event){

        console.log("In handleFindByTitleRequest")

        let location_parts = location.href.split("/"); 
        let current_request_type = "findByTitle"
        
        this.findByTitle(current_request_type, location_parts)        
        
    } //handleFindByTitleRequest

    render() {
        const { requestType, pager, pageOfItems,url } = this.state;

        console.log("in render")
        console.log("requestType: " + requestType)
        console.log("pageOfItems: " + pageOfItems.length)
        
        return (
                
                <div className="card-body">
                    <br/><br/>
                    <h3 className="card-header">Type of Business Reports for Purchase</h3>

                    <table className="table table-hover">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Price</th>                        
                            </tr>
                        </thead>
                        <tbody>
                        {pageOfItems.map(item =>
                        <tr key={item.id}>                            
                                <td>{item.title}</td>                                                        
                                <td><small>SGD</small> {item.price}</td>                            
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

export { ReportPage };