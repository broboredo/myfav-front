import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Policies.css';
import Title from "../Title/Title";

class Policies extends Component {
    handleClick = () => this.props.onClose();

    render() {
        return (
            this.props.visible ?
                <div className="container-fluid">
                    <header className="header mt-3">
                        <i className="nes-icon close" onClick={this.handleClick}></i>
                        <Title title="Políticas de Privacidade" />
                    </header>
                    <div className="col-12 mt-5">
                        <ul>
                            <li>Terceiros, incluindo o Google, usam cookies para veicular anúncios com base em visitas
                                anteriores do usuário ao seu website ou a outros websites.</li>
                            <li>Com o uso de cookies de publicidade, o Google e os parceiros dele podem veicular anúncios
                                para os usuários com base nas visitas feitas aos seus sites e/ou a outros sites na
                                Internet.</li>
                            <li>Os usuários podem desativar a publicidade personalizada acessando as Configurações de
                                anúncios. Como alternativa, você pode orientar os usuários a acessar o site www.aboutads.info
                                para desativar o uso de cookies de publicidade personalizada de terceiros.</li>
                        </ul>
                    </div>
                </div>
                : ''
        );
    }
}

export default Policies;
