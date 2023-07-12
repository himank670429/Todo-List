import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { DataProvider } from './context/DataContext.jsx';

import { TaskCategoryCreate } from './components/simple/dailogModel.jsx';

import './stylesheet/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <DataProvider>
        <>
          <App />
          <TaskCategoryCreate />
        </>
      </DataProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
