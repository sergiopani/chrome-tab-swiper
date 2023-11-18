import React, { useContext, useEffect, useRef, useState } from 'react';
import { TabsContext } from '../context/TabsContext.jsx';
let currentTabCounterIndex = 0;

export const Principal = () => {
    const { tabs, setTabs } = useContext(TabsContext);
    const [currentTabId, setCurrentTabId] = useState(null);


    const handleTabClick = (tabId) => {
        // Actualizar el estado currentTabId al hacer clic en una pestaña
        setCurrentTabId(tabId);

        // Cambiar el foco a la pestaña correspondiente
        chrome.tabs.update(tabId, { active: true });
    };
    const handleKeyUp = (event) => {
        console.log('keydown');
        if (event.altKey) {
            event.preventDefault();
        }
    };



    const handleKeyPress = (event) => {

        if ((event.key === 'Tab' && event.altKey) || (event.key === 'Tab')) {
            let currentTabId = null;

            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                currentTabId = tabs[0].id;
                currentTabCounterIndex++;
            });
            //poner el foco en la siguiente pestaña
            chrome.tabs.query({}, (tabs) => {
                //Get the current tab id                
                const nextIndex = currentTabCounterIndex == tabs.length ? 0 : currentTabCounterIndex;
                const tabId = tabs[nextIndex].id;
                setCurrentTabId(tabId);

                // handleTabClick(tabIndex);


            });


        };
    };

    useEffect(() => {

        chrome.tabs.query({}, (tabs) => {
            const mappedTabs = tabs.map((tab) => {
                return {
                    id: tab.id,
                    title: tab.title,
                    url: tab.url,
                    favIconUrl: tab.favIconUrl,

                };
            });

            setTabs(mappedTabs);

        });

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            setCurrentTabId(tabs[0].id);
        });

    }, []);

    useEffect(() => {

        document.addEventListener('keydown', handleKeyPress);
        document.addEventListener('keyup', handleKeyUp);



        return () => {
            document.removeEventListener('keydown', handleKeyPress);
            document.removeEventListener('keyup', handleKeyUp);


        };
    }, []);






    return (
        <div className='bg-black'>
            <h1 className="text-white p-2">Mac: "alt + tab" / Windows: "option + tab"</h1>
            <div className="p-2 bg-black rounded-md backdrop-blur-md flex gap-4 overflow-x-hidden">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className={`flex-shrink-0 w-40 bg-gray-700 p-4 rounded-md cursor-pointer ${tab.id === currentTabId ? 'border-red-500 border-2' : ''
                            }`}
                        onClick={() => handleTabClick(tab.id)}
                    >
                        <img
                            src={tab.favIconUrl || 'default-icon.png'}
                            alt={tab.title}
                            className="w-8 h-8 mb-2 mx-auto"
                        />
                        <p className="text-white font-semibold text-center">{tab.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
