import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import { orderBy } from 'lodash/collection';

import NickList from './NickList';
import DtopList from './DtopList';

import '../styles/application.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state =
    { dtops: []
    , currentNick: this.props.params.nick
    , message: 'Fetching...'
    };
  }

  componentDidMount() {
    axios.get('https://ricedb.api.revthefox.co.uk/')
      .then((res) => {
        const dtops = Object.keys(res.data)
          .map(nick => (
            { nick
            , ...res.data[nick]
            }))
          .filter(e => e.dtops);
        this.setState({ message: '', dtops: orderBy(dtops, 'nick', 'asc') });
      })
      .catch(console.log);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.nick) {
      this.changeNick(nextProps.params.nick);
    }
  }

  clickNick = e => this.changeNick(e.target.text);

  changeNick(nick) {
    if (this.state.dtops.find(e => e.nick === nick)) {
      this.setState({ currentNick: nick, message: '' });
    } else {
      this.setState({ message: `${nick} does not exist` });
    }
  }

  render() {
    if (this.state.message) {
      const outerStyle =
        { display: 'flex'
        , alignItems: 'center'
        , justifyContent: 'center'
        , width: '100%'
        , height: '100%'
        , padding: '15px'
        };
      return (
        <div style={outerStyle}>
          <div className="paper" style={{ textAlign: 'center' }}>
            {this.state.message}
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="row">
          <NickList
            nicks={this.state.dtops}
            clickNick={this.clickNick}
          />
          {this.state.currentNick ?
            <DtopList
              dtops={this.state.dtops
                .find(e => e.nick === this.state.currentNick).dtops}
              nick={this.state.currentNick}
            />
            : null}
        </div>
        <div className="row">
          <div className="gitLink">
            <a
              href="https://gitlab.com/DanielFGray/dtoplist"
              target="_blank"
              rel="noopener noreferrer"
            >
              Accepting pull requests!
            </a>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = { params: PropTypes.shape({ nick: PropTypes.string }) };
