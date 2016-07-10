import React, { Component, PropTypes } from 'react';

import { sortBy } from 'lodash/collection';

export default function Stats(props) {
  let stats = props.dtops.map(e => e.urls)
    .reduce((a, c) => a.concat(c), [])
    .map(e => e.replace(/https?:\/\//, '').split('/')[0].split(/(\w+\.\w+)$/)[1])
    .reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), {})
  stats = Object.keys(stats).map(e => ({ domain: e, count: stats[e] }));
  stats = sortBy(stats, 'count').reverse();

  return (
    <div style={{ width: '95%', margin: '0 auto' }}>
      <h3>Most popular hosts</h3>
      <ol>
        {stats.slice(0, 10).map(e => (<li key={e.domain}>{e.domain}: {e.count}</li>))}
      </ol>
    </div>
  );
}

Stats.propTypes =
  { dtops: PropTypes.array
  };

