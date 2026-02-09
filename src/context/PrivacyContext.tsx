import { createContext, useContext, useState, type ReactNode } from 'react';

interface PrivacyContextType {
  privacyMode: boolean;
  togglePrivacy: () => void;
}

const PrivacyContext = createContext<PrivacyContextType>({
  privacyMode: true,
  togglePrivacy: () => {},
});

export function PrivacyProvider({ children }: { children: ReactNode }) {
  const [privacyMode, setPrivacyMode] = useState(true);

  const togglePrivacy = () => {
    setPrivacyMode((prev) => !prev);
  };

  return (
    <PrivacyContext.Provider value={{ privacyMode, togglePrivacy }}>
      {children}
    </PrivacyContext.Provider>
  );
}

export function usePrivacy() {
  return useContext(PrivacyContext);
}
