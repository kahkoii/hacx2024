import { useState } from 'react'
import reactLogo from '/public/images/react.svg'
import { Flex, Text, Image, Button } from '@chakra-ui/react'

const Home: React.FC = () => {
	const [count, setCount] = useState(0)

	return (
		<Flex
			height="100vh"
			flexDir="column"
			alignItems="center"
			justifyContent="center"
			gap="20px"
		>
			<Flex flexDir="row">
				<Image src={reactLogo} boxSize="160px" />
			</Flex>
			<Text fontWeight="bold" fontSize="xl">
				Test vite hot reloading feature: {count}
			</Text>
			<Text fontWeight="light">
				State is saved even on new page render
			</Text>
			<Button onClick={() => setCount((count) => count + 1)}>
				Click Me
			</Button>
		</Flex>
	)
}

export default Home
