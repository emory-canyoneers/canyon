// SomeComponent.js
import React, { useContext } from 'react';
import AuthContext from './AuthContext';

const SomeComponent = () => {
  const { token } = useContext(AuthContext);

  // You can use the token here...

  return (
    <div>
      Token: {token}
    </div>
  );
};

export default SomeComponent;