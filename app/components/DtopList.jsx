import React, { Component, PropTypes } from 'react';

export default class DtopList extends Component {
  static propTypes = { dtops: PropTypes.array };

  render() {
    return (
      <div style={{ display: 'block-inline', overflow: 'auto' }}>
        <ul style={{ display: 'block-inline' }} className="list-unstyled">
          {this.props.dtops.map(e => (
            <li key={e} style={{ paddingBottom: '10px' }}>
              <a href={e} target="dtops">
                <img src={e} role="presentation" height="50%" width="50%" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
