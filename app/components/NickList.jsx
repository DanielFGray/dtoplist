import React, { Component, PropTypes } from 'react';

export default class NickList extends Component {
  static propTypes = { nicks: PropTypes.array, clickNick: PropTypes.func };

  render() {
    return (
      <div style={{ display: 'block-inline' }} className="pull-right text-right">
        <div>{this.props.nicks.length} users shown</div>
        <ul className="list-unstyled">
          {this.props.nicks.map(e => (
            <li key={e}>
              <a onClick={this.props.clickNick}>{e}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
