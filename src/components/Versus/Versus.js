import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Versus.css';
import Title from "../Title/Title";
import Autosuggest from 'react-autosuggest';

class Versus extends Component {
    state = {
        charactersList: [],
        characterOne: '',
        characterTwo: '',

        suggestions: [],
        appearances: undefined,
        errorMessage: ''
    }

    componentDidMount() {
        this.getCharacters();
    }

    url = process.env.NODE_ENV === 'production' ? 'https://myfavchar-api.herokuapp.com' : 'http://localhost:8000';

    // When suggestion is clicked, Autosuggest needs to populate the input
    // based on the clicked suggestion. Teach Autosuggest how to calculate the
    // input value for every given suggestion.
    getSuggestionValue = suggestion => suggestion.name;

    // Use your imagination to render suggestions.
    renderSuggestion = suggestion => (
        suggestion.name
    );


    // Teach Autosuggest how to calculate suggestions for any given input value.
    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        const {charactersList} = this.state;

        return inputLength === 0 ? [] : charactersList.filter(c =>
            c.name.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    handleClick = () => this.props.onClose();

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onChangeCharacterOne = (e, {newValue}) => {
        console.log((this.state.appearances !== undefined));
        this.setState({characterOne: newValue});
    };

    onChangeCharacterTwo = (e, { newValue, method }) => {
        this.setState({characterTwo: newValue});
    };

    handleSearch = () => {
        this.setErrorMessage(null);
        const {characterTwo, characterOne} = this.state;

        if(
            (characterOne && characterTwo) &&
            (characterOne !== characterTwo)
        ) {
            const charOne = this.checkIfCharacterExists(characterOne);
            const charTwo = this.checkIfCharacterExists(characterTwo);

            if (charOne && charTwo) {
                this.getAppearances(charOne, charTwo)
            } else {
                this.setErrorMessage('Um dos personagens citados não existe')
            }
        } else {
            this.setErrorMessage('Digite personagens válidos');
        }
    }

    render() {
        const inputProps = {
            value: this.state.characterOne,
            onChange: this.onChangeCharacterOne,
            className: 'nes-input',
            name: 'characterOne'
        };

        const inputPropsDois = {
            value: this.state.characterTwo,
            onChange: this.onChangeCharacterTwo,
            className: 'nes-input',
            name: 'characterTwo'
        };

        const { suggestions, appearances, errorMessage } = this.state;

        const theme = {
            suggestionsContainerOpen: 'versus_react-autosuggest__suggestions-container--open',
            suggestionsList:          'versus_react-autosuggest__suggestions-list'
        }

        return (
            this.props.visible ?
                <div className="container-fluid">
                    <header className="header mt-3">
                        <i className="nes-icon close" onClick={this.handleClick}></i>
                        <Title title="Versus" />
                    </header>

                    <div className="container">
                    <div className="Versus mt-5">
                        <div className="row">
                            <div className="col-12 col-xl-4 offset-xl-1 col-lg-5 col-md-5">
                                <div className="nes-field">
                                    <label htmlFor="name_field">Personagem 1</label>
                                    <Autosuggest
                                        theme={theme}
                                        id="characterOne"
                                        suggestions={suggestions}
                                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                        getSuggestionValue={this.getSuggestionValue}
                                        renderSuggestion={this.renderSuggestion}
                                        inputProps={inputProps}

                                    />
                                </div>
                            </div>

                            <div className="divide-vs col-12 col-xl-2 col-lg-2 col-md-2">
                                <p className="">VS</p>
                            </div>

                            <div className="col-12 col-xl-4 offset-xl-0 col-lg-5 col-md-5">
                                <div className="nes-field">
                                    <label htmlFor="name_field">Personagem 2</label>
                                    <Autosuggest
                                        theme={theme}
                                        id="characterTwo"
                                        suggestions={suggestions}
                                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                        getSuggestionValue={this.getSuggestionValue}
                                        renderSuggestion={this.renderSuggestion}
                                        inputProps={inputPropsDois}

                                    />
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-12 text-center">
                                <p className="m-5">{errorMessage}</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="Balance col-12">
                                {
                                    appearances !== undefined && appearances.count > 0
                                    && appearances.characters.length > 0 ?
                                    (
                                        <div>
                                            <div className="row">
                                                <div className="col-12 text-right">
                                                    <p>
                                                        <b>Total</b> de <span className="is-warning" style={{fontSize: 24}}> {appearances.count} </span> {appearances.count > 1 ? 'aparições' : 'aparição'} entre os personagens
                                                    </p>
                                                    {
                                                        appearances.skips > 0 ?
                                                            (<p style={{fontSize: 11}}>
                                                                Por <b>{appearances.skips}</b> vez{appearances.skips > 1 ? 'es' : ''} alguém
                                                                decidiu <br/>
                                                                não votar em nenhum entre os dois
                                                            </p>) : ''
                                                    }
                                                    {
                                                        appearances.draw ?
                                                            (<p style={{fontSize: 11}}>
                                                                Em caso de empate, vence quem foi menos exibido
                                                            </p>) : ''
                                                    }
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-center mt-3">
                                                {
                                                    appearances.characters.map((character, index) =>
                                                        <div className={`col-12 col-xl-4 col-lg-5 col-md-5 mb-5`}>
                                                            <div className="Versus-Card text-center">
                                                                <section className="showcase">
                                                                    <section className="nes-container with-title">
                                                                        <h3 className="title">{character.name}</h3>
                                                                        <h6 className="subtitle">{character.sitcom.name}</h6>
                                                                        <figure className="position-relative">
                                                                            <img alt={character.name} srcSet={ character.img } style={{maxHeight: '250px'}} />
                                                                        </figure>

                                                                        {/*eslint-disable-next-line*/}
                                                                        <a href="#" className={`nes-badge hold-badge ${index < 1 ? 'is-icon' : ''}`}>
                                                                            {index < 1 ? (
                                                                                <span className="is-success"><i
                                                                                    className="nes-icon trophy is-small"></i></span>
                                                                            ) : ''}
                                                                            <span className={`count-votes ${index < 1 ? 'is-warning' : 'is-error'}`}>
                                                                                {character.votes_count} voto{character.votes_count > 1 ? 's' : ''}
                                                                            </span>
                                                                        </a>


                                                                    </section>
                                                                </section>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    ) : ''
                                }
                            </div>

                        </div>


                        <div className="text-center mb-5">
                            <button type="button" className="nes-btn is-primary btn-sm" onClick={this.handleSearch}>
                                Play
                            </button>
                        </div>
                    </div>
                    </div>
                </div>
                : ''
        )
    }

    getCharacters() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(this.url + '/api/all-chars', requestOptions)
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

                this.setState({charactersList: data});
            })
            .catch(error => {
                //this.setState({errorMessage: error});
                console.error('There was an error!', error);
            });
    }

    getAppearances(character_one, character_two) {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(this.url + '/api/appearances?' +
            `character_one=${character_one.id}&character_two=${character_two.id}`, requestOptions)
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

                console.log('in', data.votes);

                if(data.count < 1) {
                    this.setErrorMessage(`Não foi encontrado alguma aparição entre ${character_one.name} vs. ${character_two.name}`)
                }

                this.setState({appearances: data});
            })
            .catch(error => {
                //this.setState({errorMessage: error});
                console.error('There was an error!', error);
            }).finally(() => {
                console.log('final', this.state.appearances);
                this.setState({
                    characterOne: '',
                    characterTwo: ''
                });
        });
    }

    checkIfCharacterExists(characterName) {
        return this.state.charactersList.filter((item) => item.name === characterName).shift();
    }

    setErrorMessage(error) {
        this.setState({
            errorMessage: error
        })
    }
}

export default Versus;
