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
        visibleAbout: false,
        appInstalled: false
    };

    url = process.env.NODE_ENV === 'production' ? 'https://myfavchar-api.herokuapp.com' : 'http://localhost:8000';
    installPrompt = null;

    componentDidMount() {
        this.getCharacters();

        window.addEventListener('beforeinstallprompt',e=>{
            // For older browsers
            e.preventDefault();
            console.log("Install Prompt fired");
            this.installPrompt = e;
            // See if the app is already installed, in that case, do nothing
            if(!this.mobileAndTabletCheck && (window.matchMedia &&
                window.matchMedia('(display-mode: standalone)').matches) ||
                window.navigator.standalone === true){
                return false;
            }
        });
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


            <div className="menu col-lg-12 col-md-12 col-xl-12 col-sm-12 col-12 mt-3 mb-3">
                <button type="button" onClick={this.showRanking} className="nes-btn btn-sm text-uppercase">
                    ranking
                </button>
                <button type="button" onClick={this.showVersus} className="nes-btn btn-sm text-uppercase">
                    1x1
                </button>
                <button type="button" onClick={this.showPolicies} className="nes-btn btn-sm text-uppercase">
                    Políticas
                </button>
                {!this.state.appInstalled ?
                    (<button type="button" onClick={this.installApp} className="nes-btn btn-sm text-uppercase">
                        App
                    </button>) : ''
                }
                {/*
                <button type="button" onClick={this.showAbout} className="nes-btn btn-sm text-uppercase">
                    Sobre
                </button>
                */}
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

    installApp = async (e) => {
        if(!this.installPrompt) return false;

        this.installPrompt.prompt();

        let outcome = await this.installPrompt.userChoice;
        if(outcome.outcome === 'accepted') {
            console.log("App Installed")
        } else {
            console.log("App not installed");
        }

        // Remove the event reference
        this.installPrompt=null;
    }

    mobileAndTabletCheck = function() {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };
}

export default App;
