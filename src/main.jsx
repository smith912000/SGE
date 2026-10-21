import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/global.css'
import { loadVault } from './vault/load.js'

const root = ReactDOM.createRoot(document.getElementById('root'))

// The app imports the members-only data, so it loads only after the data
// bundle is decrypted. Non-members stay on the membership screen.
loadVault()
  .then(() => import('./App.jsx'))
  .then(({ default: App }) => {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
  })
  .catch((e) => {
    const msg = {
      guest: 'Sign in through WILD OS as a member to open SGE.',
      lapsed: 'Your WILD membership has ended. Rejoin to open SGE again.',
      offline: 'You seem to be offline. Reconnect and reload.',
    }[e && e.code] || 'SGE could not open. Reload to try again.'
    const p = document.createElement('p')
    p.style.cssText = 'max-width:420px;margin:30vh auto 0;padding:0 24px;text-align:center;color:#b9b2a3;font:16px/1.6 Georgia,serif'
    p.textContent = msg
    document.getElementById('root').replaceChildren(p)
  })
