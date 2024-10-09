"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import '../globals.css'
const SidebarContext = createContext();

const SidebarProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prevSidebarOpen) => !prevSidebarOpen);
  };

  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [sidebarOpen]);

  useEffect(() => {
    const handlePageChange = () => {
      setSidebarOpen(false);
    };

    const handleHashChange = () => {
      // Detect changes in the URL hash
      setSidebarOpen(false);
    };

    window.addEventListener('popstate', handlePageChange);
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('popstate', handlePageChange);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <SidebarContext.Provider value={{ sidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

const useSidebar = () => {
  return useContext(SidebarContext);
};

export { SidebarProvider, useSidebar };





