import ContentLoader from 'react-content-loader';
import React from 'react';

const Loader = () => {
  return (
    <main role="main" className="container-fluid">
      <div className="row flex-xl-nowrap">
        <div
          id="guide"
          className="col-sm-4"
          style={{
            overflowY: 'scroll',
            height: 'calc(100vh - 100px)',
            overflowX: 'hidden',
            backgroundColor: 'white',
          }}
        >
          <ContentLoader width={200} height={250}>
            <rect x="20" y="20" rx="4" ry="4" width="130" height="15" />
            <rect x="20" y="50" rx="3" ry="3" width="170" height="10" />
            <rect x="20" y="65" rx="3" ry="3" width="170" height="10" />
            <rect x="20" y="80" rx="3" ry="3" width="170" height="10" />
            <rect x="20" y="95" rx="3" ry="3" width="170" height="10" />
            <rect x="20" y="140" rx="4" ry="4" width="130" height="15" />
            <rect x="20" y="170" rx="3" ry="3" width="170" height="10" />
            <rect x="20" y="185" rx="3" ry="3" width="170" height="10" />
            <rect x="20" y="200" rx="3" ry="3" width="170" height="10" />
            <rect x="20" y="215" rx="3" ry="3" width="170" height="10" />
          </ContentLoader>
        </div>
        <div
          className="col-sm-4"
          style={{ height: 'calc(100vh - 100px)', backgroundColor: 'white' }}
        >
          <ContentLoader width={200} height={250}>
            <rect x="20" y="20" rx="4" ry="4" width="130" height="15" />
            <rect x="20" y="50" rx="3" ry="3" width="170" height="10" />
            <rect x="20" y="65" rx="3" ry="3" width="170" height="10" />
            <rect x="20" y="80" rx="3" ry="3" width="170" height="10" />
            <rect x="20" y="95" rx="3" ry="3" width="170" height="10" />
            <rect x="20" y="140" rx="4" ry="4" width="130" height="15" />
            <rect x="20" y="170" rx="3" ry="3" width="170" height="10" />
            <rect x="20" y="185" rx="3" ry="3" width="170" height="10" />
            <rect x="20" y="200" rx="3" ry="3" width="170" height="10" />
            <rect x="20" y="215" rx="3" ry="3" width="170" height="10" />
          </ContentLoader>
        </div>
        <div
          className="col-sm-4"
          style={{ height: 'calc(100vh - 100px)', backgroundColor: 'white' }}
        >
          <ContentLoader width={200} height={250}>
            <rect x="20" y="20" rx="4" ry="4" width="130" height="15" />
            <rect x="20" y="50" rx="3" ry="3" width="170" height="10" />
            <rect x="20" y="65" rx="3" ry="3" width="170" height="10" />
            <rect x="20" y="80" rx="3" ry="3" width="170" height="10" />
            <rect x="20" y="95" rx="3" ry="3" width="170" height="10" />
            <rect x="20" y="140" rx="4" ry="4" width="130" height="15" />
            <rect x="20" y="170" rx="3" ry="3" width="170" height="10" />
            <rect x="20" y="185" rx="3" ry="3" width="170" height="10" />
            <rect x="20" y="200" rx="3" ry="3" width="170" height="10" />
            <rect x="20" y="215" rx="3" ry="3" width="170" height="10" />
          </ContentLoader>
        </div>
      </div>
      <div
        className="row flex-xl-nowrap"
        style={{ height: '50px', backgroundColor: '#343A40' }}
      >
        <div className="col-4" />
        <div className="col-4 level-nav" />
      </div>
    </main>
  );
};

export default Loader;
