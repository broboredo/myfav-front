import React, {Component} from 'react';
import './App.css';
import Spinner from "./components/Spinner/Spinner";
import Card from './components/Card/Card';
import Title from "./components/Title/Title";

class App extends Component {
    state = {
        characters: [],
        loading: true,
        refreshWord: ''
    };

    url = process.env.NODE_ENV === 'production' ? 'https://myfavchar-api.herokuapp.com' : 'http://localhost:8000';

    refreshWords = [
        'D`OH!',
        'blah',
        'nenhum!'
    ]

    componentDidMount() {
        this.getRandomRefreshWord();
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
                    {this.state.refreshWord}
                </button>
            </div>
        </div>)
    }

    vote(characterId) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({character_id: characterId})
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
        this.getRandomRefreshWord();
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

                this.setState({characters: data});
            })
            .catch(error => {
                this.setState({errorMessage: error});
                console.error('There was an error!', error);
            }).finally(() => this.setState({loading: false}));
    }

    getRandomRefreshWord() {
        const word = this.refreshWords[Math.floor(Math.random() * this.refreshWords.length)];
        this.setState({ refreshWord:word });
    }
}

export default App;
