import { Flex } from '@chakra-ui/react'
import Sidebar from './Sidebar'

const Home: React.FC = () => (
	<>
		<Sidebar />
		<Flex height="100vh" backgroundColor="#004586"></Flex>
	</>
)

export default Home
