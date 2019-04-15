import styled from 'styled-components';
import media from '../../styles/lib/mediaQueries';

export default styled.div`
  flex: 1;
  flex-direction: column;
  outline: none;

  ${media.medium`
    display: flex;
  `};
`;
