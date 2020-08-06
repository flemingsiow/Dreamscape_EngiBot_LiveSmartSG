import React from 'react';
import { Link } from 'react-router-dom';

class ChatbotPage extends React.Component {
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
            
            <div style={{marginTop: '5em',marginLeft:'2em', border:'0'}}>
                <iframe width="96%" height="680" marginwidth="0" marginheight="0" align="top" 
                scrolling="No" frameborder="0" hspace="0" vspace="0" 
                src="https://d15lucx47of3a9.cloudfront.net/index.html"></iframe>
            </div>
            

        )

    } //end render

} //end class

export { ChatbotPage};