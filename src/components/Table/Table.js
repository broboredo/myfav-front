import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Table.css';
import Title from "../Title/Title";

class Table extends Component {
    handleClick = () => this.props.onClose();

    render() {
        return (
            this.props.visible && this.props.items.length  > 0 ?
                <div className="container-fluid">
                    <i className="nes-icon close" onClick={this.handleClick}></i>
                    <Title title="Ranking" className="mt-3" />
                    <div className="col-12 d-flex justify-content-center">
                        <div className="Table nes-table-responsive mt-3">
                            <table className="nes-table is-bordered is-centered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nome</th>
                                        <th>Série</th>
                                        <th>Votos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    this.props.items.map((character, index) =>
                                            <tr>
                                                <th>{index === 0 ? <i class="nes-icon trophy is-small"></i> : index + 1}</th>
                                                <th>{character.name}</th>
                                                <th>{character.sitcom.name}</th>
                                                <th>{character.votes_count}</th>
                                            </tr>

                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                : ''
        )
    }
}

export default Table;
