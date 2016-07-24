import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class NickList extends Component {
  constructor(props) {
    super(props);
    this.state =
      { nickFilter: ''
      };
  }

  filterChange = (e) => {
    this.setState({ nickFilter: e.target.value });
  }

  render() {
    const nicks = this.props.nicks
      .filter(n => n.nick.toLowerCase().indexOf(this.state.nickFilter.toLowerCase()) > -1);

    return (
      <div className="nickList paper col-md-3">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="search for a name"
            value={this.state.nickFilter}
            onChange={this.filterChange}
          />
        </div>
        <ul className="list-unstyled">
          {nicks.map(e => (
            <li key={e.nick}>
              <Link to={`/${e.nick}`}>{e.nick}</Link>
              <span style={{ color: '#999', marginLeft: '5px', fontSize: 'smaller' }}>{e.dtops}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

NickList.propTypes =
  { nicks: PropTypes.array
  , clickNick: PropTypes.func
  };
