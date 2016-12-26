import React, { PropTypes } from 'react';

const embedFromUrl = (url) => {
  let e = url;
  if (/\.(png|jpe?g|gif)$/.test(url)) {
    e = (<img src={url} role="presentation" width="75%" />);
  } else if (/.webm$/.test(url)) {
    e = (
      <video
        src={url}
        width="75%"
        autoPlay="true"
        controls="true"
        muted="true"
        loop="forever"
      />
    );
  }
  return e;
};

const DtopList = props => (
  <div className="dtopList paper col-md-8">
    <h2>{props.nick}</h2>
    <ul>
      {props.dtops.map(e => (
        <li key={e}>
          <a href={e} target="dtops">
            {embedFromUrl(e)}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

DtopList.propTypes =
{ dtops: PropTypes.array.isRequired
, nick: PropTypes.string.isRequired
};

export default DtopList;
