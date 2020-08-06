import React from 'react';
import { Link } from 'react-router-dom';

class TextractPage extends React.Component {
    constructor(props) {
        super(props);        
    } //end constructor

    componentDidMount() {
        
    } // componentDidMount()

    componentDidUpdate() {
        
    } // componentDidUpdate()

    render() {

        return (
            
            <div style={{marginTop: '5em',marginLeft:'2em'}}>
                <h1>Textract</h1>

                <iframe width="96%" height="620" marginwidth="0" marginheight="0" align="top" 
                scrolling="No" frameborder="0" hspace="0" vspace="0"
                src="https://2645wrrfgk.execute-api.us-east-1.amazonaws.com/dev"></iframe>
         

            </div>
            

        )

    } //end render

} //end class

export { TextractPage};