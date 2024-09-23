import { Button, Flex, Text, Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Legend,
	ResponsiveContainer,
} from 'recharts'

const Sidebar = () => {
	const [autoStatus, setAutoStatus] = useState(false)
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const [latestWindSpeed, setLatestWindSpeed] = useState(8)
	const [riskLevel, setRiskLevel] = useState('Low')
	const [updater, setUpdater] = useState(0)
	const [updateChart, setUpdateChart] = useState(false)

	const riskColor = {
		Low: '#8DFF98',
		Moderate: '#FFC46C',
		High: '#FF6E8D',
		'Very High': '#FF2323',
	}

	const [windData, setWindData] = useState([
		{ x: 1, knots: 0 },
		{ x: 2, knots: 0 },
		{ x: 3, knots: 0 },
		{ x: 4, knots: 0 },
		{ x: 5, knots: 0 },
		{ x: 6, knots: 0 },
		{ x: 7, knots: 0 },
		{ x: 8, knots: 0 },
		{ x: 9, knots: 0 },
		{ x: 10, knots: 0 },
		{ x: 11, knots: 0 },
		{ x: 12, knots: 0 },
		{ x: 13, knots: 0 },
		{ x: 14, knots: 0 },
		{ x: 15, knots: 0 },
		{ x: 16, knots: 0 },
		{ x: 17, knots: 0 },
		{ x: 18, knots: 0 },
		{ x: 19, knots: 0 },
		{ x: 20, knots: 0 },
	])

	const autoBerthBtn = () => {
		setAutoStatus(!autoStatus)
		console.log(autoStatus)
	}

	const shiftArray = (latestWindSpeed: number) => {
		const t = windData
		for (let i = 0; i < 19; i++) {
			t[i].knots = t[i + 1].knots
		}
		t[19].knots = latestWindSpeed
		setWindData(t)
	}

	useEffect(() => {
		setTimeout(() => {
			let t = Math.floor(Math.random() * 9)
			if (t < 3 && latestWindSpeed + t - 3 > 0) {
				t = latestWindSpeed + t - 3
			} else if (t > 5 && latestWindSpeed + t - 5 < 20) {
				t = latestWindSpeed + t - 5
			} else {
				t = latestWindSpeed
			}
			if (t < 9) {
				setRiskLevel('Low')
			} else if (t < 13) {
				setRiskLevel('Moderate')
			} else if (t < 18) {
				setRiskLevel('High')
			} else {
				setRiskLevel('Very High')
			}
			if (updater % 5 == 0) {
				setUpdateChart(!updateChart)
			}
			shiftArray(t)
			setLatestWindSpeed(t)
			setUpdater(updater + 1)
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
				bgColor={riskColor[riskLevel]}
				padding="10px"
				display={sidebarOpen ? 'flex' : 'none'}
			>
				<Text>{riskLevel} Risk</Text>
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
				height="250px"
				width="250px"
				flexDir="column"
				borderRadius="4px"
				display={sidebarOpen ? 'flex' : 'none'}
			>
				<ResponsiveContainer width="100%" height="100%">
					<LineChart
						data={windData}
						margin={{ left: -30 }}
						key={Number(updateChart)}
					>
						<YAxis />
						<XAxis />
						<Legend />
						<Line
							type="monotone"
							dataKey="knots"
							stroke="#8884d8"
							dot={false}
						/>
					</LineChart>
				</ResponsiveContainer>
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
