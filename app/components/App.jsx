import React, { Component } from 'react';
import request from 'superagent';

import NickList from './NickList';
import DtopList from './DtopList';
import Stats from './Stats';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state =
      { dtops: []
      , currentNick: ''
      };
  }

  componentDidMount() {
    request
      .get('https://joaquinv.net/aigis/database.php')
      .query({ server: 'Rizon', db: 'desktops' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        const array = Object.keys(res.body)
          .map(nick => ({ nick, urls: res.body[nick] }))
          .filter(e => e.urls.length > 0)
          .reverse();
        this.setState({ dtops: array });
      });
  }

  clickNick = (e) => {
    this.setState({ currentNick: e.target.text });
  }

  render() {
    if (this.state.dtops.length === 0) {
      return (<div style={{ textAlign: 'center' }}>Fetching...</div>);
    }

    return (
      <div>
        <NickList
          nicks={this.state.dtops.map(e => e.nick)}
          clickNick={this.clickNick}
        />
        {this.state.currentNick ?
          <DtopList
            dtops={this.state.dtops.find(e => e.nick === this.state.currentNick).urls}
            nick={this.state.currentNick}
          />
        : null}
        <Stats dtops={this.state.dtops} />
      </div>
    );
  }
}
