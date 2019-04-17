import PropTypes from 'prop-types';
import React from 'react';
import camelcase from 'camelcase';

import StyledAvatar, { AvatarWrapper, Img, LoadingState } from './Avatar.style';

const propTypes = {
  img: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  hoverScale: PropTypes.bool,
  percentage: PropTypes.number,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

const defaultProps = {
  hoverScale: false,
  percentage: 0,
  onClick: () => {},
  className: null,
};

function Avatar({ img, hoverScale, status, percentage, onClick, className }) {
  return (
    <AvatarWrapper hoverScale={hoverScale}>
      <LoadingState background="grey" foreground="blue" percentage={percentage} />
      <StyledAvatar
        type="button"
        percentage={percentage}
        status={camelcase(status)}
        onClick={onClick}
        className={className}
      >
        {status}
        <Img
          status={camelcase(status)}
          alt={status !== 'black' ? `profile avatar for ${status.toLowerCase()} status` : 'avatar'}
          src={img}
        />
      </StyledAvatar>
    </AvatarWrapper>
  );
}

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;
