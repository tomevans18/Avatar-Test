import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 300px; // NOTE: you should use px as rem will increase if the font size is increase in the browser. Using rem = poor accessibility experience.
  max-height: 75vh;
  padding: 1rem 0;
  background: ${p => p.theme.color.grey_light};
  margin-bottom: ${p => p.theme.component.spacing};
`;
