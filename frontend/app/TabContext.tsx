'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type SectionTab = 
  | 'predictor'
  | 'epigenetic'
  | 'genomerisk'
  | 'explorer'
  | 'alphafold'
  | 'cryoem'
  | 'covalent'
  | 'protac'
  | 'rna'
  | 'mutation'
  | 'druglab'
  | 'radiochem'
  | 'solubility'
  | 'pbpk'
  | 'digitaltwin'
  | 'adc'
  | 'multiomics'
  | 'biomarker'
  | 'patientradar'
  | 'generator'
  | 'ectd'
  | 'workflow'
  | 'rbac'
  | 'apigateway'
  | 'patentpacket'
  | 'limssync'
  | 'industryhealth'
  | 'methodology'
  | 'results'
  | 'assistant'
  | 'settings';

export type UserRole = 
  | 'Principal Investigator (PI)'
  | 'Lead Medicinal Chemist'
  | 'Bioinformatics Specialist'
  | 'Lab Technician'
  | 'Auditor / Guest';

export type UserMode = 'beginner' | 'expert';

interface TabContextType {
  activeTab: SectionTab;
  setActiveTab: (tab: SectionTab) => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
  selectedProtein: string;
  setSelectedProtein: (protein: string) => void;
  smilesInput: string;
  setSmilesInput: (smiles: string) => void;
  bookmarks: string[];
  toggleBookmark: (smiles: string) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isCopilotOpen: boolean;
  setIsCopilotOpen: (open: boolean) => void;
  activeRunVersion: string;
  setActiveRunVersion: (ver: string) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export function TabProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<SectionTab>('epigenetic');
  const [currentRole, setCurrentRole] = useState<UserRole>('Principal Investigator (PI)');
  const [userMode, setUserMode] = useState<UserMode>('expert');
  const [selectedProtein, setSelectedProtein] = useState<string>('1M17');
  const [smilesInput, setSmilesInput] = useState<string>('COC1=C(C=C2C(=C1)N=CN=C2NC3=CC(=C(C=C3)F)Cl)OCCCN4CCOCC4');
  const [bookmarks, setBookmarks] = useState<string[]>(['CC(=O)NC1=CC=C(O)C=C1', 'CN1CCC2=C(C1)C=C(C=C2)OC']);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);
  const [activeRunVersion, setActiveRunVersion] = useState<string>('V10');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleBookmark = (smiles: string) => {
    setBookmarks(prev => 
      prev.includes(smiles) ? prev.filter(s => s !== smiles) : [...prev, smiles]
    );
  };

  return (
    <TabContext.Provider value={{ 
      activeTab, 
      setActiveTab, 
      currentRole,
      setCurrentRole,
      userMode, 
      setUserMode, 
      selectedProtein, 
      setSelectedProtein, 
      smilesInput, 
      setSmilesInput,
      bookmarks,
      toggleBookmark,
      isCommandPaletteOpen,
      setIsCommandPaletteOpen,
      isCopilotOpen,
      setIsCopilotOpen,
      activeRunVersion,
      setActiveRunVersion
    }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTab() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTab must be used within a TabProvider');
  }
  return context;
}
