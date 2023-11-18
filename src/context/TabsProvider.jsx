import React, { useState } from 'react';
import { TabsContext } from './TabsContext.jsx';


export const TabsProvider = ({ children }) => {
    const [tabs, setTabs] = useState([]);
    return (
        <TabsContext.Provider value={{
            tabs,
            setTabs
        }}>
            {children}
        </TabsContext.Provider>
    );
};
