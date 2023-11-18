import React, { useContext } from "react";
import { createRoot } from "react-dom/client";
import './styles.css';
import { TabsProvider } from "./context/TabsProvider.jsx";
import { Routes } from "./Routes.jsx";



export const Index = () => {


  return (
    <TabsProvider>
      <Routes />
    </TabsProvider>
  );
};

const root = createRoot(document.getElementById("react-target"));

root.render(<Index />);