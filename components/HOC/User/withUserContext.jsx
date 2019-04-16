import React from 'react';

import { UserContext } from './UserProvider';

export default function withUserContext(Component) {
  const WrapperComponent = props => (
    <UserContext.Consumer>{User => <Component {...props} {...User} />}</UserContext.Consumer>
  );
  WrapperComponent.protected = Component.protected || false;

  return WrapperComponent;
}
