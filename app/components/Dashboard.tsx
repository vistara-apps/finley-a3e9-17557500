
"use client";

import { useState } from "react";
import { Card } from "./Card";
import { Button } from "./Button";
import { AgentChat } from "./AgentChat";
import { FeeAlerts } from "./FeeAlerts";
import { SubscriptionList } from "./SubscriptionList";
import { BillNegotiation } from "./BillNegotiation";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'fees' | 'subscriptions' | 'bills' | 'chat'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'fees', label: 'Fees', icon: '🔍' },
    { id: 'subscriptions', label: 'Subscriptions', icon: '💳' },
    { id: 'bills', label: 'Bills', icon: '📄' },
    { id: 'chat', label: 'AI CFO', icon: '🤖' },
  ];

  return (
    <div className="space-y-lg animate-fade-in">
      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-surface rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-base ${
              activeTab === tab.id
                ? 'bg-accent text-bg'
                : 'text-secondary-text hover:text-text'
            }`}
          >
            <span className="mr-1">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="animate-slide-up">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'fees' && <FeeAlerts />}
        {activeTab === 'subscriptions' && <SubscriptionList />}
        {activeTab === 'bills' && <BillNegotiation />}
        {activeTab === 'chat' && <AgentChat />}
      </div>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-md">
      <Card>
        <div className="flex justify-between items-center mb-md">
          <h2 className="text-heading">Monthly Savings</h2>
          <div className="text-2xl font-bold text-accent">$127</div>
        </div>
        <div className="grid grid-cols-3 gap-md text-center">
          <div>
            <div className="text-lg font-semibold text-text">$43</div>
            <div className="text-caption">Fees Found</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-text">$52</div>
            <div className="text-caption">Bills Negotiated</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-text">$32</div>
            <div className="text-caption">Subscriptions</div>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-heading mb-md">Recent Activity</h3>
        <div className="space-y-3">
          <div className="list-item">
            <div className="w-8 h-8 bg-accent/20 rounded-md flex items-center justify-center mr-3">
              🔍
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-text">Overdraft fee detected</div>
              <div className="text-caption">Chase Bank • $35</div>
            </div>
            <div className="text-accent text-sm">+$35</div>
          </div>
          
          <div className="list-item">
            <div className="w-8 h-8 bg-accent/20 rounded-md flex items-center justify-center mr-3">
              💳
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-text">Netflix subscription optimized</div>
              <div className="text-caption">Downgraded to Basic • $7/mo savings</div>
            </div>
            <div className="text-accent text-sm">+$7/mo</div>
          </div>
          
          <div className="list-item">
            <div className="w-8 h-8 bg-accent/20 rounded-md flex items-center justify-center mr-3">
              📄
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-text">Internet bill negotiated</div>
              <div className="text-caption">Comcast • 12-month deal</div>
            </div>
            <div className="text-accent text-sm">+$15/mo</div>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-heading mb-md">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-md">
          <Button variant="outline" className="h-12">
            <span className="mr-2">🔍</span>
            Scan Fees
          </Button>
          <Button variant="outline" className="h-12">
            <span className="mr-2">📞</span>
            Negotiate Bill
          </Button>
        </div>
      </Card>
    </div>
  );
}
