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

        suggestions: []
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
        this.setState({characterOne: newValue});
    };

    onChangeCharacterTwo = (e, { newValue, method }) => {
        this.setState({characterTwo: newValue});
    };

    handleSearch = () => {
        const {characterTwo, characterOne} = this.state;

        if(
            (characterOne && characterTwo) &&
            (characterOne !== characterTwo)
        ) {
            const charOne = this.checkIfCharacterExists(characterOne);
            const charTwo = this.checkIfCharacterExists(characterTwo);

            console.log(charOne, charTwo);

            if (charOne && charTwo) {
                this.getAppearances(charOne, charTwo)
            }
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

        const { suggestions } = this.state;

        const theme = {
            suggestionsContainerOpen: 'versus_react-autosuggest__suggestions-container--open',
            suggestionsList:          'versus_react-autosuggest__suggestions-list'
        }

        return (
            this.props.visible ?
                <div className="container">
                    <i className="nes-icon close is-large" onClick={this.handleClick}></i>
                    <Title title="Versus" />

                    <div className="Versus nes-table-responsive">
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

                            <div className="">
                                <a className="btn-sm btn" onClick={this.handleSearch}>
                                    a
                                </a>
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

                console.log(data);
            })
            .catch(error => {
                //this.setState({errorMessage: error});
                console.error('There was an error!', error);
            });
    }

    checkIfCharacterExists(characterName) {
        return this.state.charactersList.filter((item) => item.name === characterName).shift();
    }
}

export default Versus;
