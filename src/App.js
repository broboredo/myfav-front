import React, {Component} from 'react';
import './App.css';
import Spinner from "./components/Spinner/Spinner";
import Card from './components/Card/Card';
import Title from "./components/Title/Title";
import Table from "./components/Table/Table";
import Versus from "./components/Versus/Versus";

class App extends Component {
    state = {
        characters: [],
        appearanceId: null,
        loading: true,
        rankingList: [],
        visibleRanking: false,
        visibleVersus: false
    };

    url = process.env.NODE_ENV === 'production' ? 'https://myfavchar-api.herokuapp.com' : 'http://localhost:8000';

    componentDidMount() {
        this.getCharacters();
    }

    handleEvent = characterId => {
        this.state.characters.map(character => {
            if (character.id === characterId) {
                this.vote(character.id);
            }
        });
    };

    handleRefresh = () => this.getCharacters()

    render() {
        const cards = this.state.characters.map((character, index) => (
            <div className={`col-12 col-xl-4 offset-xl-${index < 1 ? '1' : '0'} col-lg-5 col-md-5`}>
                <Card key={character.id}
                      id={character.id}
                      name={character.name}
                      sitcomName={character.sitcom.name}
                      img={character.img}
                      isFirst={character.is_first}
                      onVote={this.handleEvent}/>
            </div>
    ));

        return (



            this.state.loading ? (<Spinner enable={this.state.loading} />) :
                this.state.visibleRanking ? (<Table items={this.state.rankingList}
                                                    visible={this.state.visibleRanking}
                                                    onClose={this.closeRanking} />) :
                    this.state.visibleVersus ? (<Versus visible={this.state.visibleVersus}
                                                        onClose={this.closeVersus} />) :
        <div className="container">
            <Title title="Qual o seu favorito?"/>


            <div className="row">
                {cards[0]}
                <div className="divide-vs col-12 col-xl-2 col-lg-2 col-md-2">
                    <p className="">VS</p>
                </div>
                {cards[1]}
            </div>

            <div className="text-center mt-5">
                <button type="button" onClick={this.handleRefresh} className="nes-btn btn-sm is-warning text-uppercase">
                    NENHUM
                </button>
            </div>



            {/*<div className="">
                <button type="button" onClick={this.showRanking} className="nes-btn btn-sm text-uppercase mr-5">
                    ranking
                </button>
                <button type="button" onClick={this.showVersus} className="nes-btn btn-sm text-uppercase">
                    vs
                </button>
            </div>*/}

            <div style={{color: 'white', height: '0px', overflow: 'hidden'}}>
                <h1>Políticas de Privacidade</h1>
                <ul>
                    <li>Terceiros, incluindo o Google, usam cookies para veicular anúncios com base em visitas anteriores do usuário ao seu website ou a outros websites.</li>
                    <li>Com o uso de cookies de publicidade, o Google e os parceiros dele podem veicular anúncios para os usuários com base nas visitas feitas aos seus sites e/ou a outros sites na Internet.</li>
                    <li>Os usuários podem desativar a publicidade personalizada acessando as Configurações de anúncios. Como alternativa, você pode orientar os usuários a acessar o site www.aboutads.info para desativar o uso de cookies de publicidade personalizada de terceiros.</li>
                </ul>

                <h1>Sobre</h1>
                <p>
                    Somos um mini-game de rankeamento de personagens
                </p>
            </div>
        </div>)
    }

    vote(characterId) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                character_id: characterId,
                appearance_id: this.state.appearanceId
            })
        };
        fetch(this.url + '/api/vote', requestOptions)
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }


                this.getCharacters();
            })
            .catch(error => {
                this.setState({errorMessage: error});
                console.error('There was an error!', error);
            });
    }

    getCharacters() {
        this.setState({loading: true});
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch(this.url + '/api/characters', requestOptions)
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

                this.setState({
                    characters: data.chosenCharacters,
                    appearanceId: data.appearanceId});
            })
            .catch(error => {
                this.setState({errorMessage: error});
                console.error('There was an error!', error);
            }).finally(() => this.setState({loading: false}));
    }

    showRanking = () => {
        this.setState({visibleRanking: false});
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(this.url + '/api/vote', requestOptions)
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

                this.setState({rankingList: data, visibleRanking: true});
            })
            .catch(error => {
                this.setState({errorMessage: error, visibleRanking: false});
                console.error('There was an error!', error);
            });
    }

    closeRanking = () => {
        this.setState({
            visibleRanking: false,
            ranking: []
        })
    }

    showVersus = () => {
        this.setState({
            visibleVersus: true
        })
    }

    closeVersus = () => {
        this.setState({
            visibleVersus: false
        })
    }
}

export default App;
