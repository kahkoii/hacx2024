import { Button, Flex, Text, Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
// @ts-expect-error no type definition available
import CanvasJSReact from '@canvasjs/react-charts'

const Sidebar = () => {
	const [autoStatus, setAutoStatus] = useState(false)
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const [latestWindSpeed, setLatestWindSpeed] = useState(9)
	const [updater, setUpdater] = useState(true)
	const [windData, setWindData] = useState([
		{ x: 1, y: 6 },
		{ x: 2, y: 5 },
		{ x: 3, y: 7 },
		{ x: 4, y: 6 },
		{ x: 5, y: 10 },
		{ x: 6, y: 11 },
		{ x: 7, y: 7 },
		{ x: 8, y: 5 },
		{ x: 9, y: 4 },
		{ x: 10, y: 5 },
		{ x: 11, y: 5 },
		{ x: 12, y: 7 },
		{ x: 13, y: 9 },
		{ x: 14, y: 12 },
		{ x: 15, y: 12 },
		{ x: 16, y: 11 },
		{ x: 17, y: 13 },
		{ x: 18, y: 15 },
		{ x: 19, y: 17 },
		{ x: 20, y: 15 },
	])
	// const CanvasJSChart = new CanvasJSReact.CanvasJSChart()
	// const options = {
	// 	animationEnabled: true,
	// 	title: {
	// 		text: 'Wind Speed Trends',
	// 	},
	// 	data: [
	// 		{
	// 			type: 'spline',
	// 			dataPoints: windData,
	// 		},
	// 	],
	// }

	const riskLevel = 'Low Risk'

	const autoBerthBtn = () => {
		setAutoStatus(!autoStatus)
		console.log(autoStatus)
	}

	useEffect(() => {
		// const newData = windData
		// const lastPoint = windData[19]
		// lastPoint.y += 1
		// newData.shift()
		// newData.push(lastPoint)
		setTimeout(() => {
			// setWindData(newData)
			const t = Math.floor(Math.random() * 9)
			if (t < 3 && latestWindSpeed + t - 3 > 0) {
				setLatestWindSpeed(latestWindSpeed + t - 3)
			} else if (t > 5 && latestWindSpeed + t - 5 < 20) {
				setLatestWindSpeed(latestWindSpeed + t - 5)
			}
			console.log(latestWindSpeed)
			setUpdater(!updater)
		}, 800)
	}, [updater])

	return (
		<Flex
			position="absolute"
			top="20px"
			right="20px"
			width="300px"
			borderRadius="10px"
			bgColor={
				sidebarOpen ? 'rgba(255,255,255, 0.85)' : 'rgba(255,255,255, 0)'
			}
			boxShadow={sidebarOpen ? 'lg' : 'none'}
			padding="12px 20px 20px 20px"
			flexDir="column"
			gap="12px"
		>
			<Flex justifyContent="end">
				<Button
					height="50px"
					width="50px"
					bgColor="white"
					border="4px solid #FFB030"
					borderRadius="100%"
					boxShadow="lg"
					flexDir="column"
					gap="4px"
					alignItems="center"
					justifyContent="center"
					padding="2px"
					onClick={() => setSidebarOpen(!sidebarOpen)}
				>
					<Box
						width="20px"
						height="3px"
						border="1px solid black"
						borderRadius="8px"
						bgColor="black"
					/>
					<Box
						width="20px"
						height="3px"
						border="1px solid black"
						borderRadius="8px"
						bgColor="black"
					/>
					<Box
						width="20px"
						height="3px"
						border="1px solid black"
						borderRadius="8px"
						bgColor="black"
					/>
				</Button>
			</Flex>
			<Flex
				justifyContent="center"
				borderRadius="4px"
				bgColor="white"
				padding="10px"
				display={sidebarOpen ? 'flex' : 'none'}
			>
				<Text>{riskLevel}</Text>
			</Flex>
			<Flex
				flexDir="column"
				alignItems="center"
				justifyContent="center"
				borderRadius="4px"
				bgColor="#FFDE70"
				padding="20px"
				display={sidebarOpen ? 'flex' : 'none'}
			>
				<Text fontSize="3xl" fontWeight="bold">
					{latestWindSpeed} Knots
				</Text>
				<Text>Wind Speed</Text>
			</Flex>
			<Flex
				flexDir="column"
				alignItems="center"
				justifyContent="center"
				borderRadius="4px"
				padding="20px"
				display={sidebarOpen ? 'flex' : 'none'}
			>
				{/* <CanvasJSChart options={options} /> */}
			</Flex>
			<Button
				bgColor={autoStatus ? '#22CF4D' : '#383838'}
				onClick={autoBerthBtn}
				color="white"
				width="100%"
				minHeight="60px"
				_hover={{ bgColor: '#5A5A5A' }}
				display={sidebarOpen ? 'flex' : 'none'}
			>
				{autoStatus ? 'Disable Auto-Berthing' : 'Enable Auto-Berthing'}
			</Button>
		</Flex>
	)
}

export default Sidebar
