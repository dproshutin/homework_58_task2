import React, {Component} from 'react';
import './JokesCollector.css';
import Joke from "../../components/Joke/Joke";
import uuid from 'uuid/v1';
import Button from "../../components/Button/Button";

class JokesCollector extends Component {
    state = {
        jokes: []
    };

    getJokes = (URL, number) => {
        const fetchResponsePromises = [];
        for (let i = 0; i < number; i++) {
            let fetchResponsePromise = fetch(URL).then(joke => joke.json());
            fetchResponsePromises.push(fetchResponsePromise);
        }
        return fetchResponsePromises;
    };
    componentDidMount() {
        const JOKES_URL = 'https://api.chucknorris.io/jokes/random';
        const promises = this.getJokes(JOKES_URL, 5);
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
                <Joke
                    value={joke.text}
                    key={joke.id}
                />
            ));
        }
        return (
            <div>
                <Button
                    value="Get jokes"
                />
                {jokesList}
            </div>
        );
    }
}

export default JokesCollector;