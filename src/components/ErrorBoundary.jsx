import React, { Component } from 'react';
import * as Sentry from '@sentry/browser';
import snap from '../assets/images/snap.svg';
import styled from 'styled-components';
import classnames from 'classnames';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, eventId: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    if (process.env.MODE !== 'development') {
      Sentry.withScope(scope => {
        scope.setExtras(errorInfo);
        const eventId = Sentry.captureException(error);
        this.setState({ eventId });
      });
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div className={classnames('snap', this.props.className)}>
          <img src={snap} alt="snap" />
          <div className="snap-message">
            <p>Maaf Terjadi Kesalahan. </p>
            <p>
              Akan segera diinformasikan ke tim kita untuk diperbaiki. Klik{' '}
              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  Sentry.showReportDialog({ eventId: this.state.eventId })
                }
              >
                disini
              </button>{' '}
              untuk mengirimkan informasi tambahan. Terimakasih
            </p>
          </div>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

const StyledErrorBoundary = styled(ErrorBoundary)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;

  p {
    margin: 0;
  }
  img {
    width: 100px;
    height: 100px;
  }
  .snap-message {
    padding: 12px;
  }
`;
export default StyledErrorBoundary;
