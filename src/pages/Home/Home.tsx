import Sidebar from './Sidebar'
import React from 'react'
import { Box } from '@chakra-ui/react'
import { Canvas } from '../../components/Canvas'

const Home: React.FC = () => {
	return (
		<>
			<Sidebar />
			<Box h="100vh" w="100vw">
				{/* @ts-expect-error type safe*/}
				<Canvas />
			</Box>
		</>
	)
}

export default Home
