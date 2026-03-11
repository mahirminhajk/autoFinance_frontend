import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx';
import { fallbackRender, logError } from './components/controlComps/ReactErrorBoundary.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ErrorBoundary fallbackRender={fallbackRender} onError={logError}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ErrorBoundary>
  </BrowserRouter>
)//TODO: add strict mode
