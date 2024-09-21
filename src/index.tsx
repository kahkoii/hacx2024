import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/Routes'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import '@fontsource/roboto/100.css'
import '@fontsource/roboto/400.css'

const theme = extendTheme({
	initialColorMode: `light`,
	useSystemColorMode: false,
	fonts: {
		body: `'Roboto', sans-serif`,
	},
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</React.StrictMode>,
)
