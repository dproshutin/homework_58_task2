import React, {Component} from 'react';
import Joke from '../Joke/Joke';

class JokesSection extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.value !== this.props.value;
    }
    render() {
        return (
            <div>
                <Joke
                    value={this.props.value}
                />
            </div>
        );
    }
}

export default JokesSection;