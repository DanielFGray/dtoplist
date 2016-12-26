import React, { PropTypes } from 'react';
import { orderBy } from 'lodash/collection';

function countDomains(dtops) {
  // FIXME: could probably be simpler
  let stats = dtops
    .reduce((a, c) => a.concat(c.urls), [])
    .map(e => e.replace(/https?:\/\//, '').split('/')[0].split(/(\w+\.\w+)$/)[1])
    .reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), {}); // eslint-disable-line
  stats = Object.keys(stats).map(e => ({ domain: e, count: stats[e] }));
  stats = orderBy(stats, 'count', 'desc')
    .slice(0, 10);
  return stats;
}

const countLinks = dtops =>
  dtops.reduce((a, c) => a + c.dtops.length, 0);

export default class Stats extends React.PureComponent {
  render() {
    return (
      <div className="statsList paper col-md-3">
        <h3>Stats</h3>
        <ul>
          <li>Users: {this.props.dtops.length}</li>
          <li>Total links: {countLinks(this.props.dtops)}</li>
        </ul>
        <div>Most popular hosts:</div>
        <ol>
          {countDomains(this.props.dtops).map(e => (
            <li key={e.domain}>
              <a
                href={`http://${e.domain}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                {e.domain}
              </a>: {e.count}
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

Stats.propTypes =
  { dtops: PropTypes.array
  };
