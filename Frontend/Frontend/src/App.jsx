import { StrictMode } from 'react'
import './App.css'
import ErrorBoundary from './component/common/ErrorBoundary'
import Toast from './component/common/Toast'
import DemoFetch from './component/ui/DemoFetch'

export default function App(){
  return (
    <StrictMode>
      <ErrorBoundary>
        <div style={{padding:20}}>
          <header style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h1 style={{margin:0,color:'#6ee7b7'}}>PlaySync (Demo)</h1>
            <small style={{color:'#9aa4b2'}}>Demo: toastify + global error boundary</small>
          </header>

          <main style={{marginTop:18}}>
            <section style={{marginBottom:12}}>
              <DemoFetch />
            </section>
            <section>
              <p style={{color:'#9aa4b2'}}>Use the button above to fetch `/api/teams`. Backend responses that include a `message` field will display as toasts.</p>
            </section>
          </main>

          <Toast />
        </div>
      </ErrorBoundary>
    </StrictMode>
  )
}
