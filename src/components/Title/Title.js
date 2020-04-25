import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Title.css';

class Title extends Component {
    handleClick = () => this.props.onVote(this.props.id);

    render() {
        return (
            <div className={`Title ${this.props.className ? this.props.className : ''}`}>
                <h1>{this.props.title}</h1>
                {this.props.subtitle ? <h3>this.props.subtitle</h3> : ''}
            </div>
        );
    }
}

export default Title;
