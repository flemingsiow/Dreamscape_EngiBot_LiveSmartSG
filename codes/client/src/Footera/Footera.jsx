import React from 'react';

class Footera extends React.Component {
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
            

            <footer className="footer bg-dark">
                <div className="container">
                    <div className="text-center">
                        <p>
                            <a className="text-light" href="https://www.acra.gov.sg" target="_top">ACRA</a>
                        </p>
                    </div>
                </div>
          </footer>
            

        )

    } //end render

} //end class

export { Footera};