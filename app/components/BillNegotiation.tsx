
"use client";

import { useState } from "react";
import { Card } from "./Card";
import { Button } from "./Button";

interface NegotiatedBill {
  id: string;
  serviceName: string;
  originalCost: number;
  negotiatedCost?: number;
  status: 'pending' | 'in-progress' | 'success' | 'failed';
  provider: string;
  negotiationLog?: string[];
  estimatedSavings?: number;
}

export function BillNegotiation() {
  const [bills, setBills] = useState<NegotiatedBill[]>([
    {
      id: '1',
      serviceName: 'Internet',
      originalCost: 89.99,
      negotiatedCost: 74.99,
      status: 'success',
      provider: 'Comcast',
      estimatedSavings: 15,
      negotiationLog: [
        'Negotiation started',
        'Found promotional rate available',
        'Successfully negotiated 12-month discount'
      ]
    },
    {
      id: '2',
      serviceName: 'Phone',
      originalCost: 95.00,
      status: 'in-progress',
      provider: 'Verizon',
      estimatedSavings: 20,
      negotiationLog: [
        'Negotiation started',
        'Reviewing current plan options',
        'Waiting for agent response'
      ]
    },
    {
      id: '3',
      serviceName: 'Cable TV',
      originalCost: 120.00,
      status: 'pending',
      provider: 'Spectrum',
      estimatedSavings: 25
    }
  ]);

  const handleStartNegotiation = (billId: string) => {
    setBills(prev => prev.map(bill => 
      bill.id === billId 
        ? { ...bill, status: 'in-progress' as const, negotiationLog: ['Negotiation started...'] }
        : bill
    ));
    
    // Simulate negotiation progress
    setTimeout(() => {
      setBills(prev => prev.map(bill => 
        bill.id === billId 
          ? { 
              ...bill, 
              negotiationLog: [...(bill.negotiationLog || []), 'Contacting service provider...'] 
            }
          : bill
      ));
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-accent';
      case 'in-progress': return 'text-primary';
      case 'failed': return 'text-red-400';
      default: return 'text-secondary-text';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return '✅';
      case 'in-progress': return '⏳';
      case 'failed': return '❌';
      default: return '⏸️';
    }
  };

  const totalSavings = bills
    .filter(bill => bill.status === 'success')
    .reduce((sum, bill) => sum + ((bill.originalCost || 0) - (bill.negotiatedCost || 0)), 0);

  return (
    <div className="space-y-md animate-fade-in">
      <Card>
        <div className="flex justify-between items-center mb-md">
          <h2 className="text-heading">Bill Negotiations</h2>
          <div className="text-right">
            <div className="text-2xl font-bold text-accent">${totalSavings.toFixed(2)}</div>
            <div className="text-caption">Monthly savings</div>
          </div>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-secondary-text">
            {bills.filter(b => b.status === 'in-progress').length} in progress
          </span>
          <span className="text-accent">
            {bills.filter(b => b.status === 'success').length} successful
          </span>
        </div>
      </Card>

      <div className="space-y-md">
        {bills.map((bill) => (
          <Card key={bill.id} variant="elevated">
            <div className="flex justify-between items-start mb-md">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-base font-semibold text-text">{bill.serviceName}</h3>
                  <span className={`text-sm ${getStatusColor(bill.status)}`}>
                    {getStatusIcon(bill.status)} {bill.status.replace('-', ' ')}
                  </span>
                </div>
                <p className="text-caption mb-2">{bill.provider}</p>
                
                {bill.estimatedSavings && (
                  <p className="text-sm text-accent">
                    Estimated savings: ${bill.estimatedSavings}/month
                  </p>
                )}
              </div>
              
              <div className="text-right ml-md">
                <div className="text-lg font-bold text-text">
                  ${bill.negotiatedCost || bill.originalCost}/mo
                </div>
                {bill.negotiatedCost && (
                  <div className="text-caption line-through">
                    ${bill.originalCost}/mo
                  </div>
                )}
              </div>
            </div>

            {bill.negotiationLog && bill.negotiationLog.length > 0 && (
              <div className="bg-surface/50 rounded-md p-3 mb-md">
                <h4 className="text-sm font-semibold text-text mb-2">Negotiation Progress</h4>
                <div className="space-y-1">
                  {bill.negotiationLog.map((entry, index) => (
                    <div key={index} className="text-sm text-secondary-text flex items-center">
                      <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                      {entry}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex space-x-2">
              {bill.status === 'pending' && (
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => handleStartNegotiation(bill.id)}
                  className="flex-1"
                >
                  Start Negotiation
                </Button>
              )}
              {bill.status === 'in-progress' && (
                <Button variant="outline" size="sm" disabled className="flex-1">
                  Negotiating...
                </Button>
              )}
              {bill.status === 'success' && (
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
              )}
              <Button variant="outline" size="sm">
                Settings
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="text-center py-md">
          <Button variant="outline" className="w-full">
            <span className="mr-2">📄</span>
            Add New Bill
          </Button>
        </div>
      </Card>
    </div>
  );
}
