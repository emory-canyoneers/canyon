import { createContext, useState } from 'react';

// Provide information about self to all components
// When data is updated, re-fetch data from server and update context

export const SelfContext = createContext();

export const SelfProvider = ({ children }) => {
    const [self, setSelf] = useState();
  
    return (
      <SelfContext.Provider value={[self, setSelf]}>
        {children}
      </SelfContext.Provider>
    );
};
