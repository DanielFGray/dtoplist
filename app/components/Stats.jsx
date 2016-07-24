import React, { PropTypes } from 'react';
import { sortBy } from 'lodash/collection';

function countDomains(dtops) {
  // FIXME: could probably be simpler
  let stats = dtops
    .reduce((a, c) => a.concat(c.urls), [])
    .map(e => e.replace(/https?:\/\//, '').split('/')[0].split(/(\w+\.\w+)$/)[1])
    .reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), {}); // eslint-disable-line
  stats = Object.keys(stats).map(e => ({ domain: e, count: stats[e] }));
  stats = sortBy(stats, 'count')
    .reverse()
    .slice(0, 10);
  return stats;
}

function countLinks(dtops) {
  return dtops.reduce((a, c) => a + c.urls.length, 0);
}

export const Stats = (props) => (
  <div className="statsList paper col-md-12">
    <h3>Stats</h3>
    <ul>
      <li>Users: {props.dtops.length}</li>
      <li>Total links: {countLinks(props.dtops)}</li>
    </ul>
    <div>Most popular hosts:</div>
    <ol>
      {countDomains(props.dtops).map(e => (
        <li key={e.domain}>
          <a href={`http://${e.domain}`} target="_blank">{e.domain}</a>: {e.count}
        </li>
      ))}
    </ol>
  </div>
);


Stats.propTypes =
  { dtops: PropTypes.array
  };
