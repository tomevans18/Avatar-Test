import styled from 'styled-components';
import media from '../../styles/lib/mediaQueries';

export default styled.footer`
  display: ${p => (p.showContent ? 'flex' : 'none')};
  background: ${p => p.theme.color.grey_dark};
  padding: 2rem 0 calc(env(safe-area-inset-bottom) + 1rem);
  @supports (padding: max(0px)) {
    padding: 2rem 0 max(1rem, env(safe-area-inset-bottom));
  }
  margin-top: 1rem;

  ${media.medium`
    padding-bottom: calc(env(safe-area-inset-bottom) + 2rem);
    display: flex;
  `};
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  color: ${p => p.theme.color.white};

  ${media.medium`
    flex-direction: row;
  `};
`;

export const Copyright = styled.div`
  margin-left: auto;
`;
