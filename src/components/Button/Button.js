import React, {PureComponent} from 'react';
import './Button.css';

class Button extends PureComponent {

    render() {
        return (
            <button
                className="Button"
                onClick={this.props.click}
            >
                {this.props.value}
            </button>
        );
    }
}

export default Button;