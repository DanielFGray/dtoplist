import React, { Component, PropTypes } from 'react';
import request from 'superagent';

import NickList from './NickList';
import { DtopList } from './DtopList';
import { Stats } from './Stats';

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
    request
      .get('https://api.joaquin-v.xyz/aigis/database.php')
      .query({ server: 'Rizon', db: 'desktops' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          const dtops = Object.keys(res.body)
            .map(nick => ({ nick, urls: res.body[nick].filter(u => u.indexOf('pomf.se') === -1) }))
            .filter(e => e.urls.length > 0)
            .reverse();
          this.setState({ message: '', dtops });
        }
      });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ currentNick: nextProps.params.nick });
  }

  clickNick = (e) => {
    this.setState({ currentNick: e.target.text });
  }

  render() {
    if (this.state.message !== '') {
      return (<div style={{ textAlign: 'center', margin: '15px' }}>{this.state.message}</div>);
    }

    return (
      <div className="container">
        <div className="row">
          <NickList
            nicks={this.state.dtops.map(e => ({ nick: e.nick, dtops: e.urls.length }))}
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
        <div className="row">
          <div className="gitLink">
            <a href="https://gitlab.com/DanielFGray/dtoplist" target="_blank">Accepting pull requests!</a>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes =
  { params: PropTypes.object
  };
