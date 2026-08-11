'use client';

import React from 'react';
import { useTab } from './TabContext';
import EpigeneticStudio from './components/EpigeneticStudio';
import GenomeRiskStudio from './components/GenomeRiskStudio';
import BindingPredictor from './components/BindingPredictor';
import PdbExplorer from './components/PdbExplorer';
import AlphaFoldStudio from './components/AlphaFoldStudio';
import CryoEmStudio from './components/CryoEmStudio';
import CovalentStudio from './components/CovalentStudio';
import ProtacStudio from './components/ProtacStudio';
import RnaStudio from './components/RnaStudio';
import MutationHeatmapStudio from './components/MutationHeatmapStudio';
import DrugLabStudio from './components/DrugLabStudio';
import RadiochemStudio from './components/RadiochemStudio';
import SolubilityStudio from './components/SolubilityStudio';
import PbpkWholeBodyStudio from './components/PbpkWholeBodyStudio';
import DigitalTwinStudio from './components/DigitalTwinStudio';
import AdcStudio from './components/AdcStudio';
import MultiOmicsExplorer from './components/MultiOmicsExplorer';
import BiomarkerStudio from './components/BiomarkerStudio';
import PatientRadarStudio from './components/PatientRadarStudio';
import DeNovoStudio from './components/DeNovoStudio';
import EctdDossierStudio from './components/EctdDossierStudio';
import WorkflowStudio from './components/WorkflowStudio';
import RbacStudio from './components/RbacStudio';
import ApiGatewayStudio from './components/ApiGatewayStudio';
import PatentPacketStudio from './components/PatentPacketStudio';
import LimsSyncStudio from './components/LimsSyncStudio';
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
      {activeTab === 'epigenetic' && <EpigeneticStudio />}
      {activeTab === 'genomerisk' && <GenomeRiskStudio />}
      {activeTab === 'predictor' && <BindingPredictor />}
      {activeTab === 'methodology' && <MethodologyStudio />}
      {activeTab === 'explorer' && <PdbExplorer />}
      {activeTab === 'alphafold' && <AlphaFoldStudio />}
      {activeTab === 'cryoem' && <CryoEmStudio />}
      {activeTab === 'covalent' && <CovalentStudio />}
      {activeTab === 'protac' && <ProtacStudio />}
      {activeTab === 'rna' && <RnaStudio />}
      {activeTab === 'mutation' && <MutationHeatmapStudio />}
      {activeTab === 'druglab' && <DrugLabStudio />}
      {activeTab === 'radiochem' && <RadiochemStudio />}
      {activeTab === 'solubility' && <SolubilityStudio />}
      {activeTab === 'pbpk' && <PbpkWholeBodyStudio />}
      {activeTab === 'digitaltwin' && <DigitalTwinStudio />}
      {activeTab === 'adc' && <AdcStudio />}
      {activeTab === 'multiomics' && <MultiOmicsExplorer />}
      {activeTab === 'biomarker' && <BiomarkerStudio />}
      {activeTab === 'patientradar' && <PatientRadarStudio />}
      {activeTab === 'generator' && <DeNovoStudio />}
      {activeTab === 'ectd' && <EctdDossierStudio />}
      {activeTab === 'workflow' && <WorkflowStudio />}
      {activeTab === 'rbac' && <RbacStudio />}
      {activeTab === 'apigateway' && <ApiGatewayStudio />}
      {activeTab === 'patentpacket' && <PatentPacketStudio />}
      {activeTab === 'limssync' && <LimsSyncStudio />}
      {activeTab === 'results' && <ResultsCenter />}
      {activeTab === 'assistant' && <AssistantChat />}
      {activeTab === 'settings' && <SettingsPage />}

      {/* Global Overlays */}
      <CommandPalette />
    </div>
  );
}
