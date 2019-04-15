import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { LayoutWrapper, Main, Aside } from './Standard.style';

const propTypes = {
  pageTitle: PropTypes.string,
  banner: PropTypes.func,
  leftSidebar: PropTypes.func,
  content: PropTypes.func.isRequired,
  rightSidebar: PropTypes.func,
  stretchMain: PropTypes.bool,
  stretchLeft: PropTypes.bool,
  stretchRight: PropTypes.bool,
};

const defaultProps = {
  pageTitle: null,
  banner: null,
  leftSidebar: null,
  rightSidebar: null,
  stretchMain: false,
  stretchLeft: false,
  stretchRight: false,
};

const Sidebar = ({
  pageTitle,
  banner,
  leftSidebar,
  content,
  rightSidebar,
  stretchMain,
  stretchLeft,
  stretchRight,
}) => {
  const addSpacing = !!leftSidebar + !!rightSidebar;

  return (
    <Fragment>
      {pageTitle && (
        <Head>
          <title>Avatar Test - {pageTitle}</title>
        </Head>
      )}
      {banner && banner()}
      <LayoutWrapper flex>
        {leftSidebar && (
          <Aside stretch={stretchLeft} left>
            {leftSidebar()}
          </Aside>
        )}

        <Main stretch={stretchMain}>{content()}</Main>

        {rightSidebar && (
          <Aside stretch={stretchRight} addSpacing={addSpacing} right>
            {rightSidebar()}
          </Aside>
        )}
      </LayoutWrapper>
    </Fragment>
  );
};

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

export default Sidebar;
