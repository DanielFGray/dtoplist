import React, { Component, PropTypes } from 'react';
import request from 'superagent';

import NickList from './NickList';
import DtopList from './DtopList';
import Stats from './Stats';

export default class App extends Component {
  static propTypes =
    { params: PropTypes.object
    }

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
      .get('https://joaquinv.net/aigis/database.php')
      .query({ server: 'Rizon', db: 'desktops' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          const dtops = Object.keys(res.body)
            .map(nick => ({ nick, urls: res.body[nick] }))
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
      <div>
        <div style={{ textAlign: 'left', fontSize: 'smaller', fontStyle: 'italic', margin: '10x' }}>
          <a href="https://gitlab.com/DanielFGray/dtoplist" target="_blank">Accepting pull requests!</a>
        </div>
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
