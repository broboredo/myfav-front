import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Title from "../Title/Title";

class About extends Component {
    handleClick = () => this.props.onClose();

    render() {
        return (
            this.props.visible ?
                <div className="container-fluid">
                    <header className="header mt-3">
                        <i className="nes-icon close" onClick={this.handleClick}></i>
                        <Title title="Quem somos" />
                    </header>
                    <div className="col-12 mt-5">
                        <section className="nes-container is-dark member-card">
                            <div className="avatar">
                                <img data-src="https://instagram.flis8-1.fna.fbcdn.net/v/t51.2885-19/s150x150/83889205_508822616448110_8267809510769295360_n.jpg?_nc_ht=instagram.flis8-1.fna.fbcdn.net&_nc_ohc=dmPYThEqpTAAX8ZA3KL&oh=d52eee5a3fdd5416971df738a1634763&oe=5ECCE574"
                                     alt="Bruno Roboredo"
                                     className="" src="https://instagram.flis8-1.fna.fbcdn.net/v/t51.2885-19/s150x150/83889205_508822616448110_8267809510769295360_n.jpg?_nc_ht=instagram.flis8-1.fna.fbcdn.net&_nc_ohc=dmPYThEqpTAAX8ZA3KL&oh=d52eee5a3fdd5416971df738a1634763&oe=5ECCE574" />
                            </div>
                            <div className="profile">
                                <h4 className="name">Bruno Roboredo</h4>
                                <p>Developer</p>
                                <div>
                                    <a href="https://github.com/broboredo" target="_blank" rel="noopener noreferrer"
                                       aria-label="github"><i className="nes-icon github"></i>
                                    </a>
                                    <a href="https://instagram.com/broboredo" target="_blank" rel="noopener noreferrer"
                                       aria-label="instagram"><i className="nes-icon instagram"></i>
                                    </a>
                                </div>
                            </div>
                        </section>
                        <section className="nes-container is-dark member-card">
                            <div className="avatar">
                                <img data-src="https://instagram.flis8-1.fna.fbcdn.net/v/t51.2885-19/s150x150/30855228_165639614124423_4517819284835008512_n.jpg?_nc_ht=instagram.flis8-1.fna.fbcdn.net&_nc_ohc=n5CfxyZm1HkAX-QydFv&oh=1e6d12901931281eeb462a7194c5c208&oe=5ECCC1E0"
                                     alt="Rafael Froés"
                                     className="" src="https://instagram.flis8-1.fna.fbcdn.net/v/t51.2885-19/s150x150/30855228_165639614124423_4517819284835008512_n.jpg?_nc_ht=instagram.flis8-1.fna.fbcdn.net&_nc_ohc=n5CfxyZm1HkAX-QydFv&oh=1e6d12901931281eeb462a7194c5c208&oe=5ECCC1E0" />
                            </div>
                            <div className="profile">
                                <h4 className="name">Rafael Froés</h4>
                                <p>UX/UI</p>
                                <div>
                                    <a href="https://instagram.com/rafaelfroes" target="_blank" rel="noopener noreferrer"
                                       aria-label="instagram"><i className="nes-icon instagram"></i>
                                    </a>
                                </div>
                            </div>
                        </section>
                    </div>
                </div> : ''
        )
    }
}

export default About;
