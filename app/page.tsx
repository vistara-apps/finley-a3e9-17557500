
"use client";

import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
  usePrimaryButton,
} from "@coinbase/onchainkit/minikit";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { useEffect, useState, useCallback } from "react";
import { AppShell } from "./components/AppShell";
import { Dashboard } from "./components/Dashboard";
import { OnboardingFlow } from "./components/OnboardingFlow";

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [currentView, setCurrentView] = useState<'onboarding' | 'dashboard'>('onboarding');
  const [isConnected, setIsConnected] = useState(false);

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  // Set up primary button based on current view
  usePrimaryButton(
    { 
      text: currentView === 'onboarding' ? 'Get Started' : 'Scan for Fees',
      disabled: false 
    },
    () => {
      if (currentView === 'onboarding') {
        setCurrentView('dashboard');
      } else {
        // Trigger fee scanning
        console.log('Scanning for fees...');
      }
    }
  );

  const handleAddFrame = useCallback(async () => {
    const result = await addFrame();
    setFrameAdded(Boolean(result));
  }, [addFrame]);

  return (
    <AppShell>
      <header className="flex justify-between items-center mb-lg h-11 px-md">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
            <span className="text-bg font-bold text-sm">F</span>
          </div>
          <h1 className="text-heading">Finley</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Wallet className="z-10">
            <ConnectWallet>
              <Avatar className="w-8 h-8" />
            </ConnectWallet>
            <WalletDropdown>
              <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                <Avatar />
                <Name />
                <Address />
                <EthBalance />
              </Identity>
              <WalletDropdownDisconnect />
            </WalletDropdown>
          </Wallet>
          
          {context && !context.client.added && (
            <button
              onClick={handleAddFrame}
              className="btn-outline text-xs px-2 py-1"
            >
              Save Frame
            </button>
          )}
          
          {frameAdded && (
            <div className="flex items-center space-x-1 text-xs text-accent animate-fade-in">
              <span>✓ Saved</span>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 px-md">
        {currentView === 'onboarding' && (
          <OnboardingFlow onComplete={() => setCurrentView('dashboard')} />
        )}
        {currentView === 'dashboard' && (
          <Dashboard />
        )}
      </main>

      <footer className="mt-lg pt-md flex justify-center px-md">
        <button
          className="text-caption text-secondary-text hover:text-accent transition-colors duration-base"
          onClick={() => openUrl("https://base.org/builders/minikit")}
        >
          Built on Base with MiniKit
        </button>
      </footer>
    </AppShell>
  );
}
