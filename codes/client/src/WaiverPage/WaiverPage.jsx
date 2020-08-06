import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment'
import {useLocation} from "react-router-dom";
import { Redirect } from "react-router-dom";

//const history = useHistory();

class WaiverPage extends React.Component {

    //let location = useLocation();
   
    constructor(props) {
        super(props);
        this.state = {
            item : {},
            pageOfItems: [],
            url: "",
            requestType: "items",
            comments: "Comments",
            workflowstatus: "Review",
            waiverid: 1,
            uen: "",
            redirect:false
        };

        //this.handleWaiverIDChange = this.handleWaiverIDChange.bind(this);
        //this.handleUENChange = this.handleUENChange.bind(this);
        this.loadPage = this.loadPage.bind(this)
        this.handleCommentsChange = this.handleCommentsChange.bind(this);
        this.handleWorkflowStatusChange = this.handleWorkflowStatusChange.bind(this)
        this.handleUpdateRequest = this.handleUpdateRequest.bind(this);
        
    } //end constructor

    componentDidMount() {
        this.loadPage();
    }

    componentDidUpdate() {
        this.loadPage();       
    }

    loadPage() {       

        let location_parts = location.href.split("/"); 
        let current_request_type = "items"

        if (location.href.indexOf("uen")!=-1)
            current_request_type = "uen"
            //this.setState({requestType: "uen"})

        const url = this.state.url;

        let id = location_parts[location_parts.length-1];
        let newurl = ""
        
        //console.log(current_request_type);        

        if (current_request_type == "items"){
            newurl = "/api/items/" + id;
        }
        else if (current_request_type == "uen"){
            newurl = "/api/uen/" + id
        }

        //console.log(newurl);

        if (url!= newurl || this.state.refresh) {            
            
            if (current_request_type == "items"){
                fetch(newurl, { method: 'GET' })
                    .then(response => response.json())
                    .then(myitem => {
                        let anotherurl = "/api/workflow/waiver/" + myitem.WaiverID;
                        fetch(anotherurl, {method: 'GET'})
                        .then(response2 => response2.json())
                        .then(myitem2 =>{
                            this.setState({url:newurl,item:myitem, pageOfItems:myitem2, requestType: current_request_type,refresh:false})  
                        });
                    });
            }
            else if (current_request_type == "uen"){                                
                
                fetch(newurl, { method: 'GET' })
                    .then(response => response.json())
                    .then(myitem => {
                        //this.setState({pageOfItems:myitem})
                        this.setState({url:newurl,pageOfItems:myitem, requestType: current_request_type,refresh:false})
                    });
            }
       
        }

    } //end loadPage

    //handleUpdateRequest = (event) => {

    handleUpdateRequest(event){

        alert('Comments: ' + this.state.comments);
        alert('Workflow Status: ' + this.state.workflowstatus);


        let workflow = {
            "waiverid": this.state.item.WaiverID,
            "comments": this.state.comments,
            "workflowstatus": this.state.workflowstatus,
            "uen": this.state.item.UEN
          };
                

        fetch('/api/workflow/create', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            // We convert the React state to JSON and send it as the POST body
            body: JSON.stringify(workflow)
          }).then((response) =>{
            console.log("Workflow created successfully")
            console.log(response)
            alert("Request has been updated!")
            //this.props.history.push(this.state.url)
            //this.props.history.push(location);
            //history.push(this.state.url)
            //this.loadPage()
            this.setState({refresh:true, requestType:"items"});

            //const sns_helper = require("../aws_helpers/sns_helpers")
            //console.log("Sending SMS (in workflowcontroller.js)")
            //var hp = "+6597492609"
            //var msg = "Congrats, your application has been approved"
            //sns_helper.publish_to_handphone(hp,msg)

            return response.json();
          });
    
        event.preventDefault();
    }

    handleCommentsChange(event) {
        this.setState({comments: event.target.value});
    }

    //handleUENChange(event) {
      //  this.setState({myuen: this.state.item.UEN});
        //this.setState({thisitem.UEN: event.target.value});
        //this.state.item.UEN = event.target.value
    //}

    //handleWaiverIDChange(event) {
      //  this.setState({waiverid: this.state.item.WaiverID});
        //this.state.item.WaiverID = event.target.value
    //}

    handleWorkflowStatusChange(event) {
        this.setState({workflowstatus: event.target.value});
    }

    render() {
        const {item,pageOfItems,url, requestType,redirect } = this.state;
        
        if (requestType == "items"){
        return (
            <div className="container-fluid text-center m-3">
                <br/><br/>
                <div className="jumbotron bg-warning">
                    <h3 className="display-4">Waiver Details</h3>
                </div>
                <div className="row">
                    <table className="col-md-6 table table-hover">
                        <tbody>
                            <tr><th scope="row">ID</th><td>{item.WaiverID}</td></tr>
                            <tr><th scope="row">Date Submitted</th><td>{item.RequestDate}</td></tr>
                            <tr><th scope="row">UEN</th><td>{item.UEN}</td></tr>                
                            <tr><th scope="row">Applicant</th><td>{item.ApplicantName}</td></tr>
                            <tr><th scope="row">Type</th><td>{item.WaiverType}</td></tr>                
                            <tr><th scope="row">Reasons</th><td>{item.Reasons}</td></tr>
                        </tbody>
                    </table>
                </div>

                <p></p>
                <p></p>
                <p></p>

                <div className="jumbotron bg-warning mt-5">
                    <h3 className="display-4">Process Waiver Request</h3>
                </div>
                <div className="row">
                    <div className="col-md-6"><span className="text-left">Waiver ID:</span> <input className="form-control" name="WaiverID" type="text" value={item.WaiverID}readOnly></input></div>
                    <div className="col-md-6"><span className="text-left">UEN:</span> <input className="form-control" name="UEN" type="text" value={item.UEN} readOnly></input></div>
                </div><br/><br/>
                    <label className="text-left" for="sel1">Select:</label>
                    <select className="form-control" id="sel1" name="WorkflowStatus" value={this.state.workflowstatus} onChange={this.handleWorkflowStatusChange} >
                        <option value="Review">Review</option>
                        <option value="Checked">Checked</option>
                        <option value="Approve">Approve</option>
                        <option value="Reject">Reject</option>
                    </select>
                

                <br/><br/>

                <label className="text-left" for="comment">Comments:</label>
                    <textarea name="Comments" value={this.state.comments} onChange={this.handleCommentsChange} className="form-control" rows="5" id="comment"></textarea>
                <br></br>

                
                <button onClick={this.handleUpdateRequest} className="btn btn-warning">Update</button>

                <p></p><p></p><p></p>

                <div className="jumbotron bg-warning mt-5">
                    <h3 className="display-4">Workflow History</h3>   
                </div>           
                <table className="table table-hover mb-5">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">WorkflowID</th>
                            <th scope="col">UEN</th>
                            <th scope="col">WaiverID</th>
                            <th scope="col">Date Processed</th>
                            <th scope="col">Staff</th>
                            <th scope="col">Status</th>
                            <th scope="col">Comments</th>
                        </tr>
                    </thead>
                <tbody>
                    {pageOfItems.map(myitem =>
                        <tr key={myitem.WorkflowID}>                            
                                <td>{myitem.WorkflowID}</td>
                                <td>{myitem.UEN}</td>
                                <td>{myitem.WaiverID}</td>                        
                                <td>{moment(myitem.ProcessedDate).format('DD-MMM-YYYY hh:mm')}</td>
                                <td>{myitem.StaffID}</td>
                                <td>{myitem.WorkflowStatus}</td>
                                <td>{myitem.Comments}</td>                    
                        </tr>
                    )}
                </tbody>
                </table>
                <p></p><p></p><p></p>
            </div>
        )
                    //this.state.uen =item.uen;
                    //this.state.waiverid = item.waiverid;

        }
        else
        return (
            <div className="card text-center m-3">
                <br/><br/>
                <h3 className="card-header">Waiver Requests Made by UEN:</h3>
                <table className="table table-hover">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Link</th>
                        <th scope="col">UEN</th>
                        <th scope="col">Type</th>
                        <th scope="col">Date Submitted</th>
                        <th scope="col">Applicant Name</th>
                        <th scope="col">Reasons</th>
                    </tr>
                </thead>
                <tbody>
                {pageOfItems.map(myitem =>
                <tr key={myitem.WaiverID}>                            
                        <td><Link to={`/items/${myitem.WaiverID}`} className="btn btn-primary">Details</Link></td>
                        <td><Link to={`/uen/${myitem.UEN}`}>{myitem.UEN}</Link></td>
                        <td>{myitem.WaiverType}</td>                            
                        <td>{moment(myitem.RequestDate).format('DD-MMM-YYYY hh:mm')}</td>
                        <td>{myitem.ApplicantName}</td>
                        <td>{myitem.Reasons}</td>
                    
                </tr>
                )}
                </tbody>
                </table>
            </div>            
        )
    }

} //end class

export { WaiverPage };