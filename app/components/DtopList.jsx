import React, { Component, PropTypes } from 'react';

const embedFromUrl = (url) => {
  let e = url;
  if (/\.(png|jpe?g|gif)$/.test(url)) {
    e = (<img src={url} role="presentation" height="50%" width="50%" />);
  } else if (/.webm$/.test(url)) {
    e = (
      <video src={url} height="50%" width="50%" autoPlay="true" loop="forever" />
    );
  }
  return e;
};

export default class DtopList extends Component {
  static propTypes = { dtops: PropTypes.array };

  render() {
    return (
      <div style={{ display: 'block-inline', overflow: 'auto' }}>
        <div>{this.props.nick}</div>
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
