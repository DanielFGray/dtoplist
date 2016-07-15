import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class NickList extends Component {
  static propTypes = { nicks: PropTypes.array, clickNick: PropTypes.func };

  constructor(props) {
    super(props);
    this.filterChange = this.filterChange.bind(this);
    this.state = { nickFilter: '' };
  }

  filterChange(e) {
    this.setState({ nickFilter: e.target.value });
  }

  render() {
    const nicks = this.props.nicks
      .filter(n => n.toLowerCase().indexOf(this.state.nickFilter.toLowerCase()) > -1);

    return (
      <div style={{ display: 'block-inline' }} className="pull-right text-right">
        <div className="input-control">
          <input
            type="text"
            className="input-control"
            placeholder="search for a name"
            value={this.state.nickFilter}
            onChange={this.filterChange}
          />
        </div>
        <ul className="list-unstyled">
          {nicks.map(e => (
            <li key={e}>
              <Link to={`/${e}`}>{e}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
