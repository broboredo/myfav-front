import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Card.css';

class Card extends Component {
    handleClick = () => this.props.onVote(this.props.id);

    render() {
        return (
            <div className="Card text-center c-pointer" onClick={this.handleClick}>
                <section className="showcase">
                    <section className="nes-container with-title">
                        <h3 className="title">{this.props.name}</h3>
                        <h6 className="subtitle">{this.props.sitcomName}</h6>
                        <img srcSet={ this.props.img } style={{maxHeight: '250px'}} className="img-fluid" />

                        <div className="justify-content-center">
                            <button type="button" className="nes-btn is-primary btn-sm mt-3">Escolher</button>
                        </div>
                    </section>
                </section>
            </div>
        );
    }
}

export default Card;
