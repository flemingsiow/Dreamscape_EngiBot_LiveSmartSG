import React from 'react';
import { Link } from 'react-router-dom';

class WorkflowPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item : {},
            url: ""

        };
    } //end constructor

    componentDidMount() {
        this.loadPage();
    }

    componentDidUpdate() {
        this.loadPage();
       
    }

    loadPage() {       

        let location_parts = location.href.split("/"); 
        let current_request_type = "create"

        if (location.href.indexOf("create")!=-1)
            current_request_type = "create"            

        const url = this.state.url;

        let id = location_parts[location_parts.length-1];
        let newurl = ""
        
        console.log(current_request_type);        

        if (current_request_type == "create"){
            newurl = "/api/workflow/create"
            
            fetch(newurl, { method: 'POST' })
            .then(response => {
                 response.json()
                            
            });
        }

    } //end loadPage

    render() {
        const {item,url } = this.state;        
        return (
            <div>
                <h1>Create workflow</h1>
                {url}

                
            </div>
        )
    }

} //end class

export { WorkflowPage };