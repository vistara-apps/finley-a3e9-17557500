
"use client";

import { useState } from "react";
import { Card } from "./Card";
import { Button } from "./Button";
import { Toggle } from "./Toggle";

interface Subscription {
  id: string;
  serviceName: string;
  cost: number;
  billingCycle: 'monthly' | 'yearly';
  lastBilledDate: Date;
  isActive: boolean;
  category: string;
  potentialSavings?: number;
  recommendation?: string;
}

export function SubscriptionList() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: '1',
      serviceName: 'Netflix',
      cost: 15.99,
      billingCycle: 'monthly',
      lastBilledDate: new Date('2024-01-15'),
      isActive: true,
      category: 'Entertainment',
      potentialSavings: 7,
      recommendation: 'Consider downgrading to Basic plan'
    },
    {
      id: '2',
      serviceName: 'Spotify Premium',
      cost: 10.99,
      billingCycle: 'monthly',
      lastBilledDate: new Date('2024-01-10'),
      isActive: true,
      category: 'Music'
    },
    {
      id: '3',
      serviceName: 'Adobe Creative Cloud',
      cost: 52.99,
      billingCycle: 'monthly',
      lastBilledDate: new Date('2024-01-01'),
      isActive: true,
      category: 'Software'
    },
    {
      id: '4',
      serviceName: 'Hulu',
      cost: 7.99,
      billingCycle: 'monthly',
      lastBilledDate: new Date('2024-01-12'),
      isActive: true,
      category: 'Entertainment',
      potentialSavings: 7.99,
      recommendation: 'Duplicate of Netflix - consider canceling'
    },
    {
      id: '5',
      serviceName: 'Gym Membership',
      cost: 29.99,
      billingCycle: 'monthly',
      lastBilledDate: new Date('2024-01-01'),
      isActive: false,
      category: 'Health',
      recommendation: 'Unused for 3 months'
    }
  ]);

  const totalMonthlyCost = subscriptions
    .filter(sub => sub.isActive)
    .reduce((sum, sub) => sum + sub.cost, 0);

  const totalPotentialSavings = subscriptions
    .reduce((sum, sub) => sum + (sub.potentialSavings || 0), 0);

  const handleToggleSubscription = (subscriptionId: string) => {
    setSubscriptions(prev => prev.map(sub => 
      sub.id === subscriptionId 
        ? { ...sub, isActive: !sub.isActive }
        : sub
    ));
  };

  const handleOptimize = (subscriptionId: string) => {
    console.log(`Optimizing subscription ${subscriptionId}`);
    // In a real app, this would trigger the optimization process
  };

  return (
    <div className="space-y-md animate-fade-in">
      <Card>
        <div className="flex justify-between items-center mb-md">
          <h2 className="text-heading">Subscriptions</h2>
          <div className="text-right">
            <div className="text-2xl font-bold text-text">${totalMonthlyCost.toFixed(2)}</div>
            <div className="text-caption">Monthly total</div>
          </div>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-secondary-text">
            {subscriptions.filter(s => s.isActive).length} active subscriptions
          </span>
          <span className="text-accent">
            ${totalPotentialSavings} potential savings
          </span>
        </div>
      </Card>

      <div className="space-y-md">
        {subscriptions.map((subscription) => (
          <Card key={subscription.id} variant="elevated">
            <div className="flex items-center justify-between mb-md">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center">
                  <span className="text-text font-semibold text-sm">
                    {subscription.serviceName.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-text">
                    {subscription.serviceName}
                  </h3>
                  <p className="text-caption">{subscription.category}</p>
                </div>
              </div>
              
              <Toggle
                checked={subscription.isActive}
                onChange={() => handleToggleSubscription(subscription.id)}
              />
            </div>

            <div className="flex justify-between items-center mb-md">
              <div className="text-lg font-bold text-text">
                ${subscription.cost}/{subscription.billingCycle === 'monthly' ? 'mo' : 'yr'}
              </div>
              <div className="text-caption">
                Last billed: {subscription.lastBilledDate.toLocaleDateString()}
              </div>
            </div>

            {subscription.recommendation && (
              <div className="bg-accent/10 border border-accent/20 rounded-md p-3 mb-md">
                <p className="text-sm text-accent">{subscription.recommendation}</p>
                {subscription.potentialSavings && (
                  <p className="text-sm font-semibold text-accent mt-1">
                    Save ${subscription.potentialSavings}/month
                  </p>
                )}
              </div>
            )}

            <div className="flex space-x-2">
              {subscription.potentialSavings && (
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => handleOptimize(subscription.id)}
                  className="flex-1"
                >
                  Optimize
                </Button>
              )}
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="text-center py-md">
          <Button variant="outline" className="w-full">
            <span className="mr-2">🔍</span>
            Scan for New Subscriptions
          </Button>
        </div>
      </Card>
    </div>
  );
}
