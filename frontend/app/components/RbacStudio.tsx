'use client';

import React, { useState } from 'react';
import { ShieldCheck, UserCheck, Key, Lock, Unlock, Users, ShieldAlert, Eye, RefreshCw, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';
import { useTab, UserRole } from '../TabContext';

interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  lastActive: string;
  apiKeyStatus: 'Active' | 'Revoked' | 'Pending';
}

const INITIAL_USERS: UserAccount[] = [
  { id: 'usr-001', name: 'V C Premchand Yadav', email: 'premchand.23bce7167@vitapstudent.ac.in', role: 'Principal Investigator (PI)', department: 'Computational Chemistry & AI', lastActive: 'Just now', apiKeyStatus: 'Active' },
  { id: 'usr-002', name: 'Dr. Elena Rostova', email: 'elena.rostova@aetherrami.org', role: 'Lead Medicinal Chemist', department: 'Structure-Based Drug Design', lastActive: '12 min ago', apiKeyStatus: 'Active' },
  { id: 'usr-003', name: 'Marcus Vance', email: 'marcus.vance@aetherrami.org', role: 'Bioinformatics Specialist', department: 'Genomics & Multi-Omics', lastActive: '1 hour ago', apiKeyStatus: 'Active' },
  { id: 'usr-004', name: 'Sarah Chen', email: 'sarah.chen@aetherrami.org', role: 'Lab Technician', department: 'High-Throughput Screening', lastActive: '3 hours ago', apiKeyStatus: 'Revoked' },
  { id: 'usr-005', name: 'Compliance Auditor', email: 'audit@fda-compliance.gov', role: 'Auditor / Guest', department: 'Regulatory Quality Assurance', lastActive: '2 days ago', apiKeyStatus: 'Active' },
];

const PERMISSION_MATRIX = [
  { feature: 'View Binding & ADMET Predictions', pi: true, chemist: true, bioinfo: true, tech: true, guest: true },
  { feature: 'Run DFT Quantum Energy Estimator', pi: true, chemist: true, bioinfo: false, tech: false, guest: false },
  { feature: 'Run 100ns Molecular Dynamics (MD)', pi: true, chemist: true, bioinfo: true, tech: false, guest: false },
  { feature: 'Modify n8n Automated Workflows', pi: true, chemist: true, bioinfo: true, tech: false, guest: false },
  { feature: 'Export Opentrons Wet-Lab Scripts', pi: true, chemist: true, bioinfo: false, tech: true, guest: false },
  { feature: 'Access Patent FTO & Markush Claims', pi: true, chemist: false, bioinfo: false, tech: false, guest: false },
  { feature: 'Manage System Users & Security Policies', pi: true, chemist: false, bioinfo: false, tech: false, guest: false },
];

export default function RbacStudio() {
  const { currentRole, setCurrentRole } = useTab();
  const [users, setUsers] = useState<UserAccount[]>(INITIAL_USERS);
  const [auditLogs, setAuditLogs] = useState([
    { id: 'log-101', timestamp: '2026-08-11 10:05:12', user: 'V C Premchand Yadav', action: 'ROLE_POLICY_UPDATE', detail: 'Elevated Dr. Elena Rostova to Lead Medicinal Chemist', ip: '172.20.37.86' },
    { id: 'log-102', timestamp: '2026-08-11 09:58:44', user: 'Sarah Chen', action: 'API_KEY_REVOCATION', detail: 'Revoked API Key #8841-B due to inactivity policy', ip: '192.168.1.104' },
    { id: 'log-103', timestamp: '2026-08-11 09:42:01', user: 'Compliance Auditor', action: 'AUDIT_EXPORT_GENERATE', detail: 'Generated FDA 21 CFR Part 11 Compliance Log CSV', ip: '10.0.4.15' },
  ]);

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    setAuditLogs(prev => [
      { id: `log-${Date.now()}`, timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19), user: 'V C Premchand Yadav', action: 'USER_ROLE_MUTATE', detail: `Updated user ${userId} role to ${newRole}`, ip: '172.20.37.86' },
      ...prev
    ]);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-cyan-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-black tracking-wide text-white">Enterprise Role-Based Access Control (RBAC) & Governance</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Granular permissions matrix, zero-trust session authentication, API key lifecycle management, and FDA 21 CFR Part 11 security audit logs.
          </p>
        </div>

        {/* Live Active Role Switcher */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-400">Simulate Active Role:</span>
          <select
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value as UserRole)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/50 text-cyan-300 font-mono text-xs font-bold focus:outline-none"
          >
            <option value="Principal Investigator (PI)">Principal Investigator (PI)</option>
            <option value="Lead Medicinal Chemist">Lead Medicinal Chemist</option>
            <option value="Bioinformatics Specialist">Bioinformatics Specialist</option>
            <option value="Lab Technician">Lab Technician</option>
            <option value="Auditor / Guest">Auditor / Guest</option>
          </select>
        </div>
      </div>

      {/* Grid: Permission Matrix & User Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Role Permission Matrix */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col gap-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-mono">
            Granular Feature Permission Matrix
          </span>

          <div className="space-y-3">
            {PERMISSION_MATRIX.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col gap-1.5">
                <span className="text-xs font-bold text-white font-mono">{item.feature}</span>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className={item.pi ? 'text-emerald-400 font-bold' : 'text-slate-600'}>PI {item.pi ? '✓' : '✗'}</span>
                  <span className={item.chemist ? 'text-emerald-400 font-bold' : 'text-slate-600'}>Chemist {item.chemist ? '✓' : '✗'}</span>
                  <span className={item.bioinfo ? 'text-emerald-400 font-bold' : 'text-slate-600'}>Bioinfo {item.bioinfo ? '✓' : '✗'}</span>
                  <span className={item.tech ? 'text-emerald-400 font-bold' : 'text-slate-600'}>Tech {item.tech ? '✓' : '✗'}</span>
                  <span className={item.guest ? 'text-emerald-400 font-bold' : 'text-slate-600'}>Guest {item.guest ? '✓' : '✗'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 2 Columns: User Management & Security Audit Trail */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* User Directory */}
          <div className="p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col gap-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
              Team Member Accounts & Role Assignments ({users.length})
            </span>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs text-slate-300">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500 uppercase text-[10px]">
                    <th className="pb-2">User / Email</th>
                    <th className="pb-2">Role Assignment</th>
                    <th className="pb-2">Department</th>
                    <th className="pb-2">API Key</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {users.map(u => (
                    <tr key={u.id}>
                      <td className="py-3">
                        <strong className="text-white block font-bold">{u.name}</strong>
                        <span className="text-[10px] text-slate-500">{u.email}</span>
                      </td>
                      <td className="py-3">
                        <select
                          value={u.role}
                          onChange={(e) => handleRoleChange(u.id, e.target.value as UserRole)}
                          className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-300 text-[11px] font-mono focus:outline-none"
                        >
                          <option value="Principal Investigator (PI)">Principal Investigator (PI)</option>
                          <option value="Lead Medicinal Chemist">Lead Medicinal Chemist</option>
                          <option value="Bioinformatics Specialist">Bioinformatics Specialist</option>
                          <option value="Lab Technician">Lab Technician</option>
                          <option value="Auditor / Guest">Auditor / Guest</option>
                        </select>
                      </td>
                      <td className="py-3 text-[11px] text-slate-400">{u.department}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[9px] ${
                          u.apiKeyStatus === 'Active' ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/50' : 'bg-rose-950 text-rose-300 border border-rose-700/50'
                        }`}>
                          {u.apiKeyStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Security Audit Trail */}
          <div className="p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center justify-between">
              <span>FDA 21 CFR Part 11 Audit Trail Logs</span>
              <span className="text-[10px] text-emerald-400 font-normal">Immutable Ledger Active</span>
            </span>

            <div className="space-y-2">
              {auditLogs.map(log => (
                <div key={log.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-cyan-400 font-bold mr-2">[{log.action}]</span>
                    <span className="text-slate-200">{log.detail}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 whitespace-nowrap">
                    <span>{log.user} ({log.ip})</span> | <span>{log.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
