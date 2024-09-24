// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { createRef, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import paper from 'paper'
import ship from '/images/Untitled_Artwork.png?url'

const PaperJoystick = (
	paper,
	labelText,
	joystickCenter,
	sensitivity,
	pollInterval,
	joystickInputCallback,
) => {
	const joystick = new paper.Path.Circle(new paper.Point(0, 0), 25)
	joystick.fillColor = paper.Color(0.7, 0.7, 0.7)

	const joystickBase = new paper.Path.Circle(joystickCenter, 50)
	joystickBase.fillColor = new paper.Color(0.5, 0.5, 0.5, 0.1)

	const label = new paper.PointText(
		new paper.Point(joystickCenter.x, joystickCenter.y - 64),
	)
	label.justification = 'center'
	label.fillColor = 'black'
	label.content = labelText
	label.fontFamily = 'JetBrains Mono'
	label.fontWeight = 'bold'

	const labelBg = new paper.Path.Rectangle(label.bounds, 2)
	labelBg.matrix = new paper.Matrix().scale(1.2)
	labelBg.position = label.position
	labelBg.fillColor = 'white'
	label.bringToFront()

	joystick.bringToFront()
	let joystickActive = false

	const resetJoystick = () => {
		joystickActive = false
		joystick.position.x = joystickBase.position.x
		joystick.position.y = joystickBase.position.y
		joystick.onMouseUp = null
		joystick.onMouseLeave = null
		joystick.onMouseDrag = null
	}
	resetJoystick()

	const applyJoystickInput = () => {
		joystickInputCallback({
			delta: {
				x:
					(joystick.position.x - joystickBase.position.x) *
					sensitivity,
				y:
					(joystick.position.y - joystickBase.position.y) *
					sensitivity,
			},
		})

		setTimeout(() => {
			if (joystickActive) applyJoystickInput()
		}, pollInterval)
	}

	joystick.onMouseDown = (event) => {
		joystickActive = true
		applyJoystickInput()

		joystick.onMouseDrag = (event) => {
			joystick.position.x += event.delta.x
			joystick.position.y += event.delta.y
		}

		joystick.onMouseUp = () => {
			resetJoystick()
		}

		joystick.onMouseLeave = () => {
			resetJoystick()
		}
	}
}

const generatePathGroup = (paper) => {
	const pathGroup = new paper.Group()

	const paths = [
		[
			new paper.Point(0, 0),
			new paper.Point(4, 25),
			new paper.Point(55, 30),
			new paper.Point(57, 32),
		],
		[
			new paper.Point(0, 0),
			new paper.Point(56, 29),
			new paper.Point(57, 32),
		],
		[
			new paper.Point(0, 0),
			new paper.Point(15, 5),
			new paper.Point(20, 15),
			new paper.Point(57, 32),
		],
		[
			new paper.Point(0, 0),
			new paper.Point(15, 5),
			new paper.Point(20, 2),
			new paper.Point(55, 3),
			new paper.Point(60, 5),
			new paper.Point(57, 32),
		],
	]

	for (let i = 0; i < paths.length; i++) {
		const path = new paper.Path(paths[i])
		path.strokeColor = new paper.Color(0, 1, 0)
		path.dashOffset = 5

		pathGroup.addChild(path)
	}

	pathGroup.matrix = new paper.Matrix().scale(30)

	return pathGroup
}

const generateObstacleGroup = (paper) => {
	const obstacleGroup = new paper.Group()

	const obstacles = [
		[
			new paper.Point(5, 20),
			new paper.Point(7, 16),
			new paper.Point(10, 20),
		],
		[
			new paper.Point(5, 29),
			new paper.Point(5, 33),
			new paper.Point(7, 31),
		],
		[
			new paper.Point(10, 2),
			new paper.Point(10, 1),
			new paper.Point(11, 1),
			new paper.Point(11, 2),
		],
		[
			new paper.Point(15, 17),
			new paper.Point(15, 15),
			new paper.Point(17, 15),
			new paper.Point(17, 17),
		],
		[
			new paper.Point(15, 31),
			new paper.Point(18, 35),
			new paper.Point(23, 33),
		],
		[
			new paper.Point(17, 5),
			new paper.Point(20, 5),
			new paper.Point(20, 8),
		],
		[
			new paper.Point(25, 25),
			new paper.Point(25, 23),
			new paper.Point(27, 23),
			new paper.Point(27, 25),
		],
		[
			new paper.Point(35, 10),
			new paper.Point(36, 12),
			new paper.Point(39, 11),
		],
		[
			new paper.Point(35, 33),
			new paper.Point(35, 30),
			new paper.Point(40, 30),
			new paper.Point(40, 33),
		],
		[
			new paper.Point(50, 10),
			new paper.Point(55, 10),
			new paper.Point(55, 5),
		],
		[
			new paper.Point(50, 20),
			new paper.Point(51, 17),
			new paper.Point(53, 20),
		],
		[
			new paper.Point(58, 1),
			new paper.Point(60, 3),
			new paper.Point(63, 1),
		],
		[
			new paper.Point(58, 32),
			new paper.Point(59, 34),
			new paper.Point(60, 35),
			new paper.Point(61, 34),
			new paper.Point(62, 32),
			new paper.Point(61, 28),
			new paper.Point(59, 28),
		],
	]

	for (let i = 0; i < obstacles.length; i++) {
		const obstacle = new paper.Path(obstacles[i])
		obstacle.closed = true
		obstacle.fillColor = new paper.Color(0, 0, 0, 0.01)

		obstacleGroup.addChild(obstacle)
	}

	obstacleGroup.matrix = new paper.Matrix().scale(30)

	return obstacleGroup
}

// Canvas component
export const Canvas = ({ props, children }) => {
	const canvasRef = createRef()

	// useEffect() for side effects after the component has rendered
	useEffect(() => {
		window.addEventListener('load', () => {
			paper.setup(canvasRef.current)

			const sea = new paper.Path.Rectangle(paper.view.bounds)
			sea.fillColor = 'lightblue'
			sea.sendToBack()

			const shipRaster = new paper.Raster(
				ship,
				new paper.Point(1754, 1240),
			)
			shipRaster.matrix = new paper.Matrix()
				.scale(0.065)
				.rotate(90, shipRaster.center)
			shipRaster.rotation = 90
			shipRaster.position = paper.view.center

			const obstacleGroup = generateObstacleGroup(paper)
			const pathGroup = generatePathGroup(paper)
			const worldGroup = new paper.Group([obstacleGroup, pathGroup])
			worldGroup.position.x += 1000
			worldGroup.position.y += 500
			worldGroup.rotate(-120, shipRaster.position)

			const lidar = new paper.Path.Circle(shipRaster.position, 100)
			lidar.strokeColor = 'blue'

			const dangerSense = () => {
				let danger = false

				for (let i = 0; i < obstacleGroup.children.length; i++) {
					let intersects = lidar.getIntersections(
						obstacleGroup.children[i],
					)

					if (!danger && intersects.length > 0) danger = true

					for (let j = 0; j < intersects.length; j++) {
						new paper.Path.Circle({
							center: intersects[j].point,
							radius: 3,
							fillColor: 'red',
							parent: worldGroup,
						})
					}
				}

				lidar.strokeColor = danger ? 'red' : 'blue'
			}

			const fineJoystickCenter = new paper.Point(
				100,
				paper.view.bounds.height - 100,
			)
			PaperJoystick(
				paper,
				'FINE',
				fineJoystickCenter,
				0.01,
				10,
				({ delta }) => {
					worldGroup.position.x -= delta.x
					worldGroup.position.y -= delta.y
					dangerSense()
				},
			)

			const mainJoystickCenter = new paper.Point(
				225,
				paper.view.bounds.height - 100,
			)
			PaperJoystick(
				paper,
				'MAIN',
				mainJoystickCenter,
				0.05,
				10,
				({ delta }) => {
					worldGroup.position.y -=
						Math.abs(delta.y) > 0.1 ? delta.y : 0
					worldGroup.rotate(-delta.x / 10, shipRaster.position)
					dangerSense()
				},
			)

			const title = new paper.PointText(new paper.Point(50, 50))
			title.content = 'BERTHINGBUDDY'
			title.fillColor = new paper.Color(0, 0, 0)
			title.fontFamily = 'JetBrains Mono'
			title.fontWeight = 'bold'
			title.fontSize = 16
		})
	})

	return (
		<Box
			as="canvas"
			width="100vw"
			height="100vh"
			ref={canvasRef}
			{...props}
		>
			{children}
		</Box>
	)
}
