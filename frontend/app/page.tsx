'use client';

import React from 'react';
import { useTab } from './TabContext';
import BindingPredictor from './components/BindingPredictor';
import PdbExplorer from './components/PdbExplorer';
import DeNovoStudio from './components/DeNovoStudio';
import ResultsCenter from './components/ResultsCenter';
import AssistantChat from './components/AssistantChat';
import SettingsPage from './components/SettingsPage';
import CommandPalette from './components/CommandPalette';
import { Bot, Command } from 'lucide-react';

export default function MainPage() {
  const { activeTab, setIsCommandPaletteOpen, setIsCopilotOpen } = useTab();

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-16">
      {/* Active Workstation Station Router */}
      {activeTab === 'predictor' && <BindingPredictor />}
      {activeTab === 'explorer' && <PdbExplorer />}
      {activeTab === 'generator' && <DeNovoStudio />}
      {activeTab === 'results' && <ResultsCenter />}
      {activeTab === 'assistant' && <AssistantChat />}
      {activeTab === 'settings' && <SettingsPage />}

      {/* Global Overlays */}
      <CommandPalette />
    </div>
  );
}
