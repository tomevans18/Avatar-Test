import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import ContentWrapper from '../components/ContentWrapper';

export default class Error extends Component {
  static getInitialProps({ res, err }) {
    const statusCode = res && res.statusCode;
    const errorCode = err && err.statusCode;

    return { statusCode: statusCode || errorCode };
  }

  static propTypes = {
    statusCode: PropTypes.number,
  };

  static defaultProps = {
    statusCode: null,
  };

  render() {
    const { statusCode } = this.props;
    return (
      <ContentWrapper>
        {statusCode === 404 ? (
          <div>
            <h2>PAGE NOT FOUND</h2>
            <p>
              The page you are looking for might have been removed, or had its name changed. If you
              typed in the page address, please check that it&#39;s spelt correctly.
            </p>
            <p>
              Alternatively, go to the{' '}
              <Link href="/">
                <a>homepage</a>
              </Link>{' '}
              and follow the links to the information you want.
            </p>
          </div>
        ) : (
          <div>
            <h2>OOPS...</h2>
            <p>It appears that something went horribly wrong on our end. Please try again later.</p>
            <p>
              Alternatively, go to the{' '}
              <Link href="/">
                <a>homepage</a>
              </Link>{' '}
              and follow the links to the information you want.
            </p>
          </div>
        )}
      </ContentWrapper>
    );
  }
}
