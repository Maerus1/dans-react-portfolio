import React, {Component} from 'react';

class Card extends Component {
    render() {
        return (
            <div className="card mt-3 mb-3">
                <div className="card-body">
                  <h3 className="card-title">{this.props.title}</h3>
                  <p className="cart-text">{this.props.desc}</p>
                  <a href={this.props.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">{this.props.buttonText}</a>
                </div>
              </div>
        );
    }
}

export default Card;