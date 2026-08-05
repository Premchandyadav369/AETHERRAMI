import React from 'react';
import { Shield, Users, Activity, Settings, Database, Lock } from 'lucide-react';

export default function EnterpriseDashboard() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <header className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center gap-3">
              <Shield className="w-8 h-8 text-cyan-400" />
              Enterprise Administration
            </h1>
            <p className="text-zinc-400 mt-2">Manage tenants, system health, and security policies.</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-medium">
              System Operational
            </span>
            <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <Lock className="w-5 h-5 text-zinc-400" />
            </div>
          </div>
        </header>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={<Users className="w-6 h-6 text-blue-400"/>} title="Active Tenants" value="14" trend="+2 this month" />
          <StatCard icon={<Activity className="w-6 h-6 text-emerald-400"/>} title="API Requests (24h)" value="1.2M" trend="Normal traffic" />
          <StatCard icon={<Database className="w-6 h-6 text-purple-400"/>} title="Storage Used" value="842 GB" trend="64% of capacity" />
          <StatCard icon={<Settings className="w-6 h-6 text-orange-400"/>} title="Pending Audits" value="3" trend="Action required" />
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Recent Audit Logs */}
          <div className="col-span-2 bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Audit Logs</h2>
              <button className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">View All</button>
            </div>
            <div className="space-y-4">
              <LogEntry time="10 mins ago" user="admin@tenant-a.com" action="Updated SSO Configuration" status="Success" />
              <LogEntry time="1 hour ago" user="system" action="Automated Database Backup" status="Success" />
              <LogEntry time="2 hours ago" user="secops@pharma-inc.com" action="Failed Login Attempt" status="Warning" />
              <LogEntry time="5 hours ago" user="researcher@tenant-b.com" action="Exported PDBbind 2024 Dataset" status="Success" />
            </div>
          </div>

          {/* Configuration Placeholders */}
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">SSO & Identity</h3>
              <p className="text-sm text-zinc-400 mb-4">Configure SAML/OIDC providers for tenant access.</p>
              <button className="w-full py-2 bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg transition-colors text-sm font-medium">
                Configure Identity Provider
              </button>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Compliance Reports</h3>
              <p className="text-sm text-zinc-400 mb-4">Generate SOC2/HIPAA compliance snapshots.</p>
              <button className="w-full py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg transition-colors text-sm font-medium">
                Generate Report
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

function StatCard({ icon, title, value, trend }: { icon: React.ReactNode, title: string, value: string, trend: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white/5 rounded-lg">
          {icon}
        </div>
        <div className="text-sm text-zinc-400 font-medium">{title}</div>
      </div>
      <div>
        <div className="text-3xl font-bold">{value}</div>
        <div className="text-sm text-zinc-500 mt-1">{trend}</div>
      </div>
    </div>
  );
}

function LogEntry({ time, user, action, status }: { time: string, user: string, action: string, status: string }) {
  const statusColors = {
    Success: "text-emerald-400",
    Warning: "text-orange-400",
    Error: "text-red-400"
  };

  return (
    <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/5">
      <div className="flex items-center gap-4">
        <div className="text-xs text-zinc-500 w-24">{time}</div>
        <div>
          <div className="text-sm font-medium">{action}</div>
          <div className="text-xs text-zinc-400">{user}</div>
        </div>
      </div>
      <div className={`text-xs font-medium px-2 py-1 rounded bg-white/5 ${statusColors[status as keyof typeof statusColors]}`}>
        {status}
      </div>
    </div>
  );
}
