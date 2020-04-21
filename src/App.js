import React, {Component} from 'react';
import './App.css';
import Card from './components/Card';

class App extends Component {
    state = {
        characters: []
    };

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

    handleRefresh = () => {
        // this.getCharacters()
    }

    render() {
        const cards = this.state.characters.map(character => (
            <div className="col-6">
                <Card key={character.id}
                      id={character.id}
                      name={character.name}
                      sitcomName={character.sitcom.name}
                      img={character.img}
                      onVote={this.handleEvent}/>
            </div>
        ));

        return <div className="container">
            <div className="row">
                {cards}
            </div>
            {/*<div className="row">
                <a href="#" onRefresh={this.handleRefresh()}>Refresh</a>
            </div>*/}
        </div>
    }

    vote(characterId) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({character_id: characterId})
        };
        fetch('http://localhost:8000/api/vote', requestOptions)
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
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch('http://localhost:8000/api/characters', requestOptions)
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
            });
    }
}

export default App;
