import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { App } from './App'
import { theme } from './theme/themes'
import { reducer } from './store/reducers'
import './styles/global.css'

const store = createStore(reducer)
const root = document.getElementById('root')

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
)
