import { Button, Flex, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
// @ts-expect-error no type definition available
import CanvasJSReact from '@canvasjs/react-charts'

const Sidebar = () => {
	const [autoStatus, setAutoStatus] = useState(false)
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
		const newData = windData
		const lastPoint = windData[19]
		lastPoint.y += 1
		newData.shift()
		newData.push(lastPoint)
		setTimeout(() => {
			setWindData(newData)
			console.log(newData)
		}, 1500)
	}, [windData])

	return (
		<Flex
			position="absolute"
			top="20px"
			right="20px"
			width="300px"
			borderRadius="10px"
			bgColor="rgba(255,255,255, 0.85)"
			boxShadow="lg"
			padding="14px"
			flexDir="column"
			gap="12px"
		>
			<Flex
				justifyContent="center"
				borderRadius="4px"
				bgColor="white"
				padding="10px"
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
			>
				<Text fontSize="3xl" fontWeight="bold">
					{windData[0].y} Knots
				</Text>
				<Text>Wind Speed</Text>
			</Flex>
			<Flex
				flexDir="column"
				alignItems="center"
				justifyContent="center"
				borderRadius="4px"
				padding="20px"
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
			>
				{autoStatus ? 'Disable Auto-Berthing' : 'Enable Auto-Berthing'}
			</Button>
		</Flex>
	)
}

export default Sidebar
