import { createContext, useState } from 'react';

export const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
    const [group, setGroup] = useState(null);
  
    return (
      <GroupContext.Provider value={[group, setGroup]}>
        {children}
      </GroupContext.Provider>
    );
};

