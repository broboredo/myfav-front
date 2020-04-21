import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

class Card extends Component {
    handleClick = () => this.props.onVote(this.props.id);

    render() {
        return (
            <div className="App" onClick={this.handleClick}>
                <div className="p-2 border">
                    <img srcSet={ this.props.img } style={{maxHeight: '250px'}} className="img-fluid" /> <br />
                    <h4>{this.props.name}</h4>
                    <h6>{this.props.sitcomName}</h6>
                </div>
            </div>
        );
    }
}

export default Card;
