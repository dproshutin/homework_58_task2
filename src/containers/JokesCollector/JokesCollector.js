import React, {Component} from 'react';
import uuid from 'uuid/v1';
import Button from "../../components/Button/Button";
import JokesSection from "../../components/JokesSection/JokesSection";

class JokesCollector extends Component {
    state = {
        jokes: [],
        number: 5
    };

    getJokes = (URL, number) => {
        const fetchResponsePromises = [];
        for (let i = 0; i < number; i++) {
            let fetchResponsePromise = fetch(URL).then(joke => joke.json());
            fetchResponsePromises.push(fetchResponsePromise);
        }
        return fetchResponsePromises;
    };
    changeJokes = () => {
        const JOKES_URL = 'https://api.chucknorris.io/jokes/random';
        const promises = this.getJokes(JOKES_URL, this.state.number);
        Promise.all(promises)
            .then(response => {
                return response.map(joke => {
                    return joke.value;
                })
            }).then(jokes => {
            const updatedJokes = jokes.map(joke => {
                return {
                    text: joke,
                    id: uuid()
                }
            });
            this.setState({jokes: updatedJokes});
        });
    };

    onChange = (event) => {
        const re = /^[0-9\b]+$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            this.setState({number: event.target.value})
        }
    };

    componentDidMount() {
        this.changeJokes();
    }

    render() {
        let jokesList = null;
        if (this.state.jokes.length === 0) {
            jokesList = (
                <form>
                    <p>No jokes about Chuck Norris</p>
                </form>
            );
        } else {
            jokesList = this.state.jokes.map(joke => (
                <JokesSection
                    value={joke.text}
                    key={joke.id}
                />
            ));
        }
        return (
            <div>
                <input
                    value={this.state.number}
                    onChange={this.onChange}
                />
                <Button
                    value="Get jokes"
                    click={this.changeJokes}
                />
                {jokesList}
            </div>
        );
    }
}

export default JokesCollector;