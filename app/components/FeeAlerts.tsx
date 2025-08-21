
"use client";

import { useState } from "react";
import { Card } from "./Card";
import { Button } from "./Button";

interface FeeAlert {
  id: string;
  type: string;
  amount: number;
  date: Date;
  explanation: string;
  resolved: boolean;
  institutionName: string;
}

export function FeeAlerts() {
  const [alerts, setAlerts] = useState<FeeAlert[]>([
    {
      id: '1',
      type: 'Overdraft Fee',
      amount: 35,
      date: new Date('2024-01-15'),
      explanation: 'Your account went below $0 when a scheduled payment processed before your paycheck deposit.',
      resolved: false,
      institutionName: 'Chase Bank'
    },
    {
      id: '2',
      type: 'ATM Fee',
      amount: 2.50,
      date: new Date('2024-01-12'),
      explanation: 'Out-of-network ATM usage fee. Consider using your bank\'s ATM network to avoid this.',
      resolved: false,
      institutionName: 'Wells Fargo'
    },
    {
      id: '3',
      type: 'Maintenance Fee',
      amount: 15,
      date: new Date('2024-01-01'),
      explanation: 'Monthly maintenance fee. This may be waivable with a minimum balance or direct deposit.',
      resolved: true,
      institutionName: 'Bank of America'
    }
  ]);

  const handleDispute = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, resolved: true }
        : alert
    ));
    // In a real app, this would trigger the dispute process
    console.log(`Disputing fee ${alertId}`);
  };

  const totalUnresolvedFees = alerts
    .filter(alert => !alert.resolved)
    .reduce((sum, alert) => sum + alert.amount, 0);

  return (
    <div className="space-y-md animate-fade-in">
      <Card>
        <div className="flex justify-between items-center mb-md">
          <h2 className="text-heading">Fee Alerts</h2>
          <div className="text-right">
            <div className="text-2xl font-bold text-accent">${totalUnresolvedFees}</div>
            <div className="text-caption">Potential savings</div>
          </div>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-secondary-text">
            {alerts.filter(a => !a.resolved).length} active alerts
          </span>
          <span className="text-accent">
            {alerts.filter(a => a.resolved).length} resolved
          </span>
        </div>
      </Card>

      <div className="space-y-md">
        {alerts.map((alert) => (
          <Card key={alert.id} variant={alert.resolved ? 'default' : 'elevated'}>
            <div className="flex justify-between items-start mb-md">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-base font-semibold text-text">{alert.type}</h3>
                  {alert.resolved && (
                    <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                      Resolved
                    </span>
                  )}
                </div>
                <p className="text-caption mb-2">{alert.institutionName}</p>
                <p className="text-body text-sm">{alert.explanation}</p>
              </div>
              
              <div className="text-right ml-md">
                <div className="text-lg font-bold text-text">${alert.amount}</div>
                <div className="text-caption">
                  {alert.date.toLocaleDateString()}
                </div>
              </div>
            </div>
            
            {!alert.resolved && (
              <div className="flex space-x-2">
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => handleDispute(alert.id)}
                  className="flex-1"
                >
                  Dispute Fee
                </Button>
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>

      <Card>
        <div className="text-center py-md">
          <Button variant="outline" className="w-full">
            <span className="mr-2">🔍</span>
            Scan for New Fees
          </Button>
        </div>
      </Card>
    </div>
  );
}
