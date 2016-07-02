import React, { Component, PropTypes } from 'react';

const embedFromUrl = (url) => {
  let e = url;
  if (/\.(png|jpe?g|gif)$/.test(url)) {
    e = (<img src={url} role="presentation" width="75%" />);
  } else if (/.webm$/.test(url)) {
    e = (<video src={url} width="75%" autoPlay="true" loop="forever" />);
  }
  return e;
};

export default class DtopList extends Component {
  static propTypes = { dtops: PropTypes.array, nick: PropTypes.string };

  render() {
    return (
      <div style={{ display: 'block-inline', overflow: 'auto' }} className="text-center">
        <h2>{this.props.nick}</h2>
        <ul style={{ display: 'block-inline' }} className="list-unstyled">
          {this.props.dtops.map(e => (
            <li key={e} style={{ display: 'block-inline', paddingBottom: '10px' }}>
              <a href={e} target="dtops">
                {embedFromUrl(e)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
