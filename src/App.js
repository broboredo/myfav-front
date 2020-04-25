import React, {Component} from 'react';
import './App.css';
import Spinner from "./components/Spinner/Spinner";
import Card from './components/Card/Card';
import Title from "./components/Title/Title";
import Table from "./components/Table/Table";
import Versus from "./components/Versus/Versus";
import Policies from "./components/Policies/Policies";
import About from "./components/About/About";

class App extends Component {
    state = {
        characters: [],
        appearanceId: null,
        loading: true,
        rankingList: [],
        visibleRanking: false,
        visibleVersus: false,
        visiblePolicies: false,
        visibleAbout: false
    };

    url = process.env.NODE_ENV === 'production' ? 'https://myfavchar-api.herokuapp.com' : 'http://localhost:8000';

    componentDidMount() {
        this.getCharacters();
    }

    handleEvent = characterId => {
        // eslint-disable-next-line
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
                        this.state.visiblePolicies ? (<Policies visible={this.state.visiblePolicies}
                                                                onClose={this.closePolicies} />) :
                            this.state.visibleAbout ? (<About visible={this.state.visibleAbout}
                                                                    onClose={this.closeAbout} />) :
        <div className="container">
            <Title title="Qual o seu favorito?" className="mb-6 mt-3" />


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


            <div className="col-12 d-flex justify-content-center m-3">
                <button type="button" onClick={this.showRanking} className="nes-btn btn-sm text-uppercase mr-3">
                    ranking
                </button>
                <button type="button" onClick={this.showVersus} className="nes-btn btn-sm text-uppercase mr-3">
                    1x1
                </button>
                <button type="button" onClick={this.showPolicies} className="nes-btn btn-sm text-uppercase mr-3">
                    Políticas
                </button>{/*
                <button type="button" onClick={this.showAbout} className="nes-btn btn-sm text-uppercase">
                    Sobre
                </button>*/}
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

    showPolicies = () => {
        this.setState({
            visiblePolicies: true
        })
    }

    closePolicies = () => {
        this.setState({
            visiblePolicies: false
        })
    }

    showAbout = () => {
        this.setState({
            visibleAbout: true
        })
    }

    closeAbout = () => {
        this.setState({
            visibleAbout: false
        })
    }
}

export default App;
