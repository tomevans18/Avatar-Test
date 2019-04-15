import React from 'react';
import Link from 'next/link';

import StyledFooter, { Nav, Copyright } from './Footer.style';
import ContentWrapper from '../ContentWrapper';

const Footer = () => (
  <StyledFooter>
    <ContentWrapper>
      <Nav>
        <Link href="/" passHref>
          <a>Link</a>
        </Link>
        <Copyright>
          <small>&copy; {new Date().getFullYear()} Avatar Test</small>
        </Copyright>
      </Nav>
    </ContentWrapper>
  </StyledFooter>
);

export default Footer;
