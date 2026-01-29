/**
 * useSubscryptsEvents Hook Demo
 *
 * Demonstrates real-time event listening for Subscrypts protocol events (v1.3.0).
 */

import { useSubscryptsEvents, useWallet } from '@subscrypts/react-sdk';
import { DemoCard } from '../shared';
import { useState } from 'react';

interface EventLog {
  id: number;
  type: string;
  data: any;
  timestamp: Date;
}

export function UseSubscryptsEventsDemo() {
  const { isConnected } = useWallet();
  const [eventLogs, setEventLogs] = useState<EventLog[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [eventCounter, setEventCounter] = useState(0);

  const addEventLog = (type: string, data: any) => {
    const newEvent: EventLog = {
      id: eventCounter,
      type,
      data,
      timestamp: new Date(),
    };
    setEventLogs((prev) => [newEvent, ...prev].slice(0, 20)); // Keep last 20 events
    setEventCounter((prev) => prev + 1);
  };

  const eventCallbacks = isListening
    ? {
        onSubscriptionCreated: (event: any) => {
          addEventLog('SubscriptionCreated', event);
        },
        onSubscriptionPaid: (event: any) => {
          addEventLog('SubscriptionPaid', event);
        },
        onSubscriptionStopped: (event: any) => {
          addEventLog('SubscriptionStopped', event);
        },
      }
    : {};

  // This hook sets up event listeners based on the callbacks provided
  useSubscryptsEvents(eventCallbacks);

  const clearLogs = () => {
    setEventLogs([]);
    setEventCounter(0);
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'SubscriptionCreated':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'SubscriptionPaid':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'SubscriptionStopped':
        return 'bg-red-100 border-red-300 text-red-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  return (
    <DemoCard
      title="useSubscryptsEvents"
      description="Listen to real-time Subscrypts protocol events"
      version="v1.3.0"
    >
      <div className="space-y-4">
        {/* Connection Status */}
        <div
          className={`rounded-lg p-4 border-2 ${
            isConnected
              ? 'bg-green-50 border-green-300'
              : 'bg-gray-50 border-gray-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">
                Event Listener Status:
              </h4>
              <p className="text-xs text-gray-600 mt-1">
                {isConnected
                  ? isListening
                    ? 'Actively listening for events'
                    : 'Ready to listen (click Start Listening)'
                  : 'Connect wallet to enable event listening'}
              </p>
            </div>
            <div
              className={`w-3 h-3 rounded-full ${
                isConnected && isListening ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
              }`}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex space-x-2">
          <button
            onClick={() => setIsListening(!isListening)}
            disabled={!isConnected}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              isListening
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {isListening ? 'Stop Listening' : 'Start Listening'}
          </button>
          <button
            onClick={clearLogs}
            disabled={eventLogs.length === 0}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            Clear Logs
          </button>
        </div>

        {/* Event Types Legend */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Monitored Events:</h4>
          <div className="grid grid-cols-1 gap-2 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-2" />
              <span><strong>SubscriptionCreated:</strong> New subscription is created</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded mr-2" />
              <span><strong>SubscriptionPaid:</strong> Payment is processed for a subscription</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded mr-2" />
              <span><strong>SubscriptionStopped:</strong> Subscription is cancelled or stopped</span>
            </div>
          </div>
        </div>

        {/* Event Logs */}
        <div className="bg-white border border-gray-300 rounded-lg">
          <div className="bg-gray-100 px-4 py-3 border-b border-gray-300 flex items-center justify-between">
            <h4 className="font-semibold text-gray-900 text-sm">Event Log</h4>
            <span className="text-xs bg-gray-600 text-white px-2 py-1 rounded">
              {eventLogs.length} events
            </span>
          </div>
          <div className="p-4">
            {eventLogs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 text-sm">
                  {isListening
                    ? 'Listening for events... Perform actions in the app to see events appear here.'
                    : 'Click "Start Listening" to begin monitoring events'}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Events will appear here in real-time as they occur on the blockchain
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {eventLogs.map((log) => (
                  <div
                    key={log.id}
                    className={`border rounded-lg p-3 ${getEventColor(log.type)}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-semibold text-sm">{log.type}</span>
                      <span className="text-xs opacity-75">
                        {log.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <details className="text-xs">
                      <summary className="cursor-pointer hover:underline">
                        View Event Data
                      </summary>
                      <pre className="mt-2 bg-white bg-opacity-50 rounded p-2 overflow-x-auto whitespace-pre-wrap">
                        {JSON.stringify(log.data, null, 2)}
                      </pre>
                    </details>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Usage Info */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Use Cases:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Real-time dashboard updates</li>
            <li>• Notification systems for subscription changes</li>
            <li>• Analytics and monitoring</li>
            <li>• Automatic UI refresh on blockchain events</li>
            <li>• Webhook-style event handling in React</li>
          </ul>
        </div>

        {/* Hook Info */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">How It Works:</h4>
          <div className="text-xs text-gray-700 space-y-1">
            <div>
              • Pass callback functions for each event type you want to monitor
            </div>
            <div>• Hook sets up blockchain event listeners automatically</div>
            <div>• Callbacks are triggered when events occur on-chain</div>
            <div>• Cleanup happens automatically when component unmounts</div>
            <div>• Pass undefined/null to disable listening</div>
          </div>
        </div>

        {/* Warning */}
        {!isConnected && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-xs text-yellow-800">
              <strong>Note:</strong> Connect your wallet to enable event listening. Events are
              monitored in real-time from the Arbitrum blockchain.
            </p>
          </div>
        )}
      </div>
    </DemoCard>
  );
}
