import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';
import AddFlat from './components/addflat.jsx';
import FlatsListTable from './components/list.jsx';

class NewFlat extends React.Component {
    render() {
        return (
            <div className="container">
                <NavLink to="/" className="backTo">Strona główna</NavLink>
                <h2>Nowa nieruchomość</h2>
                <AddFlat dict={this.props.dict} />
            </div>
        )
    }
}


class FlatsList extends React.Component {
    render() {
        return (
            <div className="container">
                <NavLink to="/" className="backTo">Strona główna</NavLink>
                <h2>Lista nieruchomości</h2>
                <FlatsListTable dict={this.props.dict} />
            </div>
        )
    }
}



class Monitoring extends React.Component {
    render() {
        return (
            <div className="container">
                <NavLink to="/" className="backTo">Strona główna</NavLink>
                <h2>Monitoruj zyski i koszty</h2>
            </div>
        )
    }
}

class Main extends React.Component {
    state = {
        info: []
    }
    componentDidMount() {
        this.setState({
            info: this.props.test,
        })
    }
    render() {
        // console.log("test");
        // console.log(this.props.test[0]);

        return (
            <div>
                <div id="navigation">
                    <NavLink to="/newflat" className="nav">Dodaj nieruchomość</NavLink>
                    <NavLink to="/flatslist" className="nav">Zobacz listę nieruchomości</NavLink>
                    <NavLink to="/monitoring" className="nav">Monitoruj zyski i koszty</NavLink>
                </div>
                <div id="alerts">
                    {/* <h1>{this.props.test[0].number}</h1> */}
                    <h1>Przypomnienie 2</h1>
                    <h1>Przypomnienie 3</h1>
                </div>
            </div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dict: [],
            info: [],
        }
    }

    fetchDiki = () => {
        const url = 'http://localhost:3000/dictionaries';
        fetch(url)
            .then(resp => resp.json())
            .then(resp => {
                this.setState({
                    dict: resp[0],
                });
            }).catch(err => {
                console.log(err);
            })
    }

    fetchSetData = () => {
        const url = "http://localhost:3000/info";
        fetch(url)
            .then(resp => resp.json())
            .then(resp => {
                console.log(resp);
                this.setState({
                    info: resp,
                });
            }).catch(err => {
                console.log(err);
            });
    };

    componentDidMount() {
        setTimeout(this.fetchDiki, 1);
        setTimeout(this.fetchSetData, 2);
        // const url = 'http://localhost:3000/dictionaries';
        // let respone = fetch(url);
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <h1 id="appName">Dev-App</h1>
                    <Switch>
                        <Route exact path='/'
                            render={(props) => <Main test={this.state.info} />}
                        // component={Main}
                        />
                        <Route path='/newflat'
                            render={(props) => <NewFlat dict={this.state.dict} />}
                        />
                        <Route path='/flatslist'
                            render={(props) => <FlatsList dict={this.state.dict} />}
                        />
                        <Route path="/monitoring" component={Monitoring} />
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}


document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});