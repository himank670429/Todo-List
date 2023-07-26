import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import  MemoizedDataProvider from './context/DataContext.jsx';

import TaskGroupDeleteModal from './components/simple/taskGroupDeleteModal.jsx';
import TaskGroupCreateModal from './components/simple/taskGroupCreateModal.jsx';

import './stylesheet/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MemoizedDataProvider>
        <>
          <App />
          <TaskGroupCreateModal />
          <TaskGroupDeleteModal />
        </>
      </MemoizedDataProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
