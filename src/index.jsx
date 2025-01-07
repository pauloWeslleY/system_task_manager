import React from 'react'
import ReactDOM from 'react-dom/client'
import dayjs from 'dayjs'
import { Provider } from 'react-redux'
import { App } from './App'
import { ThemeProvider } from './theme/themes'
import store from './store'
import 'dayjs/locale/pt-br'
import './styles/global.css'

dayjs.locale('pt-br')
const root = document.getElementById('root')

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
