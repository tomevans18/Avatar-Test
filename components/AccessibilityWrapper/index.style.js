import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  *:focus {
    outline: ${p => (p.tabbing ? `${p.theme.color.primary} auto 5px` : '0')};
  }
`;
