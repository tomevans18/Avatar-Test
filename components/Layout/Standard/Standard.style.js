import styled, { css } from 'styled-components';
import media from '../../../styles/lib/mediaQueries';
import { multiply } from '../../../styles/lib/calculate';
import ContentWrapper from '../../ContentWrapper';

export const LayoutWrapper = styled(ContentWrapper)`
  flex-direction: column;
  margin-bottom: ${p => p.theme.component.spacing};
  margin-top: ${p => p.theme.component.spacing};
  ${media.medium`
    flex-direction: row;
  `};
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  order: -1;
  ${p =>
    !p.stretch &&
    css`
      align-items: flex-start;
    `};
  ${media.medium`
    flex: 1;
    order: 0;
  `};
`;

export const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  transition: margin 0.2s ease-in-out;
  padding-top: ${p => p.theme.component.spacing};
  border-top: 0.5rem solid ${p => p.theme.color.black};
  align-items: ${p => !p.stretch && 'flex-start'};

  ${media.medium`
    position: sticky;
    top: ${p => p.theme.component.spacing};
    align-self: flex-start;
    min-width: 16rem;
    max-width: 25%;
    flex-basis: auto;
    flex-grow: 1;
    padding-top: 0;
    border-top: none;
    margin: ${p =>
      p.left ? css`0 ${p.theme.component.spacing} 0 0` : css`0 0 0 ${p.theme.component.spacing}`};
  `};
  ${media.large`
    margin: ${p =>
      p.left
        ? css`0 ${multiply(p.theme.component.spacing, 2)} 0 0`
        : css`0 0 0 ${multiply(p.theme.component.spacing, 2)}`};
  `};
`;
