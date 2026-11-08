import React, { createContext, useContext, useState } from 'react';

interface QuoteContextType {
  isOpen: boolean;
  preselectedService: string;
  openQuoteModal: (service?: string) => void;
  closeQuoteModal: () => void;
}

const QuoteContext = createContext<QuoteContextType>({
  isOpen: false,
  preselectedService: '',
  openQuoteModal: () => {},
  closeQuoteModal: () => {},
});

export const QuoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');

  const openQuoteModal = (service = '') => {
    setPreselectedService(service);
    setIsOpen(true);
  };

  const closeQuoteModal = () => {
    setIsOpen(false);
  };

  return (
    <QuoteContext.Provider
      value={{ isOpen, preselectedService, openQuoteModal, closeQuoteModal }}
    >
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuoteModal = () => useContext(QuoteContext);
