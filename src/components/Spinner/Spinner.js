import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Spinner.css';

class Spinner extends Component {
    render() {
        const {enable} = this.props;

        return (
            enable ? (
                <div className="Spinner">
                    <div className="content">
                        <div className="loading"></div>
                    </div>
                </div>
                )
                : ''
        )
    }
}

export default Spinner;
