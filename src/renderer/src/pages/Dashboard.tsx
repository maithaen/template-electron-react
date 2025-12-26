import { useState } from 'react'
import { useCounterStore } from '../store'

export function Dashboard(): React.JSX.Element {
  const { count, increment, decrement, reset, incrementByAmount } = useCounterStore()
  const [amount, setAmount] = useState(5)
  const [pingStatus, setPingStatus] = useState<'idle' | 'sent'>('idle')

  const handlePing = (): void => {
    // Send ping to main process via IPC
    window.electron.ipcRenderer.send('ping')
    setPingStatus('sent')
    // Reset status after 2 seconds
    setTimeout(() => setPingStatus('idle'), 2000)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Zustand State Management & Electron IPC Examples
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Counter Card */}
        <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-1 shadow-xl">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 space-y-6 h-full">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
                🐻 Zustand Counter
              </h2>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Counter Value
              </p>
              <p className="text-6xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mt-2">
                {count}
              </p>
            </div>

            {/* Main Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={decrement}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-red-400 to-red-600 text-white text-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
              >
                −
              </button>
              <button
                onClick={reset}
                className="px-6 py-3 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors duration-200"
              >
                Reset
              </button>
              <button
                onClick={increment}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white text-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
              >
                +
              </button>
            </div>

            {/* Add Amount Controls */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3 text-center">
                Add Custom Amount
              </p>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="flex-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                />
                <button
                  onClick={() => incrementByAmount(amount)}
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* IPC Test Card */}
        <div className="bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 rounded-2xl p-1 shadow-xl">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 space-y-6 h-full">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
                ⚡ Electron IPC Test
              </h2>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Inter-Process Communication
              </p>
            </div>

            <div className="text-center py-4">
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  pingStatus === 'sent'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    pingStatus === 'sent' ? 'bg-green-500 animate-pulse' : 'bg-slate-400'
                  }`}
                ></span>
                {pingStatus === 'sent' ? 'Pong received!' : 'Ready to ping'}
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={handlePing}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
              >
                Send Ping 🏓
              </button>
              <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                Click to send &apos;ping&apos; to main process. Check console for &apos;pong&apos;
                response.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
                <p className="text-xs font-mono text-slate-600 dark:text-slate-400">
                  <span className="text-cyan-500">Main:</span> ipcMain.on(&apos;ping&apos;, () =&gt;
                  console.log(&apos;pong&apos;))
                </p>
                <p className="text-xs font-mono text-slate-600 dark:text-slate-400 mt-1">
                  <span className="text-blue-500">Renderer:</span>{' '}
                  window.electron.ipcRenderer.send(&apos;ping&apos;)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
        <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4">
          <p className="text-xs font-mono text-slate-600 dark:text-slate-400">
            <span className="text-purple-500">Store:</span> src/renderer/src/store/counterStore.ts
          </p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4">
          <p className="text-xs font-mono text-slate-600 dark:text-slate-400">
            <span className="text-cyan-500">IPC:</span> src/main/index.ts (Line 52-53)
          </p>
        </div>
      </div>
    </div>
  )
}
