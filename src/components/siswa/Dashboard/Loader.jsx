import React from 'react';
import Card from '../../UI/Card';
import ContentLoader from 'react-content-loader';

const Loader = () => {
  const all = [];
  for (let i = 0; i < 6; i += 1) {
    const content = (
      <Card
        key={i}
        className="card m-2"
        style={{
          width: '200px',
          height: '250px',
          borderRadius: '10px !important',
          border: '0',
        }}
      >
        <ContentLoader width={200} height={250}>
          <circle cx="100" cy="80" r="60" />
          <rect x="20" y="160" rx="4" ry="4" width="160" height="15" />
          <rect x="20" y="185" rx="4" ry="4" width="160" height="15" />
          <rect x="20" y="210" rx="4" ry="4" width="130" height="15" />
        </ContentLoader>
      </Card>
    );
    all.push(content);
  }
  return (
    <div>
      <div className="d-flex flex-wrap">{all}</div>
    </div>
  );
};
export default Loader;
