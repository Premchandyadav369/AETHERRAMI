'use client';

import React from 'react';
import { useTab } from './TabContext';
import BindingPredictor from './components/BindingPredictor';
import PdbExplorer from './components/PdbExplorer';
import AlphaFoldStudio from './components/AlphaFoldStudio';
import CovalentStudio from './components/CovalentStudio';
import ProtacStudio from './components/ProtacStudio';
import DrugLabStudio from './components/DrugLabStudio';
import WorkflowStudio from './components/WorkflowStudio';
import DigitalTwinStudio from './components/DigitalTwinStudio';
import MultiOmicsExplorer from './components/MultiOmicsExplorer';
import DeNovoStudio from './components/DeNovoStudio';
import RbacStudio from './components/RbacStudio';
import ApiGatewayStudio from './components/ApiGatewayStudio';
import EctdDossierStudio from './components/EctdDossierStudio';
import BiomarkerStudio from './components/BiomarkerStudio';
import PbpkWholeBodyStudio from './components/PbpkWholeBodyStudio';
import AdcStudio from './components/AdcStudio';
import IpVaultStudio from './components/IpVaultStudio';
import LimsElnStudio from './components/LimsElnStudio';
import MethodologyStudio from './components/MethodologyStudio';
import ResultsCenter from './components/ResultsCenter';
import AssistantChat from './components/AssistantChat';
import SettingsPage from './components/SettingsPage';
import CommandPalette from './components/CommandPalette';

export default function MainPage() {
  const { activeTab } = useTab();

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-16">
      {/* Active Workstation Router */}
      {activeTab === 'predictor' && <BindingPredictor />}
      {activeTab === 'methodology' && <MethodologyStudio />}
      {activeTab === 'explorer' && <PdbExplorer />}
      {activeTab === 'alphafold' && <AlphaFoldStudio />}
      {activeTab === 'covalent' && <CovalentStudio />}
      {activeTab === 'protac' && <ProtacStudio />}
      {activeTab === 'druglab' && <DrugLabStudio />}
      {activeTab === 'workflow' && <WorkflowStudio />}
      {activeTab === 'digitaltwin' && <DigitalTwinStudio />}
      {activeTab === 'multiomics' && <MultiOmicsExplorer />}
      {activeTab === 'generator' && <DeNovoStudio />}
      {activeTab === 'rbac' && <RbacStudio />}
      {activeTab === 'apigateway' && <ApiGatewayStudio />}
      {activeTab === 'ectd' && <EctdDossierStudio />}
      {activeTab === 'biomarker' && <BiomarkerStudio />}
      {activeTab === 'pbpk' && <PbpkWholeBodyStudio />}
      {activeTab === 'adc' && <AdcStudio />}
      {activeTab === 'ipvault' && <IpVaultStudio />}
      {activeTab === 'limseln' && <LimsElnStudio />}
      {activeTab === 'results' && <ResultsCenter />}
      {activeTab === 'assistant' && <AssistantChat />}
      {activeTab === 'settings' && <SettingsPage />}

      {/* Global Overlays */}
      <CommandPalette />
    </div>
  );
}
