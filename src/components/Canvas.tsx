import { createRef, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import paper from 'paper'
import 'jetbrains-mono'

const PaperJoystick = (
  paper,
  joystickCenter, 
  sensitivity, 
  pollInterval, 
  joystickInputCallback
) => {
  const joystick = new paper.Path.Circle(new paper.Point(0, 0), 25);
  joystick.fillColor = paper.Color(0.7, 0.7, 0.7);

  const joystickBase = new paper.Path.Circle(joystickCenter, 50);
  joystickBase.fillColor = new paper.Color(0.5, 0.5, 0.5, 0.1);

  joystick.bringToFront();
  let joystickActive = false;

  const resetJoystick = () => {
    joystickActive = false;
    joystick.position.x = joystickBase.position.x;
    joystick.position.y = joystickBase.position.y;
    joystick.onMouseUp = null;
    joystick.onMouseLeave = null;
    joystick.onMouseDrag = null;
  }
  resetJoystick();

  const applyJoystickInput = () => { 
    joystickInputCallback({
      delta: {
        x: (joystick.position.x - joystickBase.position.x) * sensitivity,
        y: (joystick.position.y - joystickBase.position.y) * sensitivity,
      }
    });

    setTimeout(() => {
      if (joystickActive) applyJoystickInput();   
    }, pollInterval);
  }

  joystick.onMouseDown = (event) => {
    joystickActive = true;
    applyJoystickInput();

    joystick.onMouseDrag = (event) => {
      joystick.position.x += event.delta.x;
      joystick.position.y += event.delta.y;
    }

    joystick.onMouseUp = () => {
      resetJoystick();
    }

    joystick.onMouseLeave = () => {
      resetJoystick();
    }
  }
}

const generatePathGroup = (paper) => {
  const pathGroup = new paper.Group();

  const paths = [
    [new paper.Point(0,0), new paper.Point(4,25), new paper.Point(55,30), new paper.Point(57,32)],
    [new paper.Point(0,0), new paper.Point(56,29), new paper.Point(57,32)],
    [new paper.Point(0,0), new paper.Point(15,5), new paper.Point(20,15), new paper.Point(57,32)],
    [new paper.Point(0,0), new paper.Point(15,5), new paper.Point(20,2), new paper.Point(55,3), new paper.Point(60,5), new paper.Point(57,32)]
  ]

  for (let i=0; i<paths.length; i++) {
    const path = new paper.Path(paths[i]);
    path.strokeColor = new paper.Color(0, 0, 0, 0.2);
    path.dashOffset = 5;

    pathGroup.addChild(path);
  }

  pathGroup.matrix = new paper.Matrix().scale(30);

  return pathGroup;
}

const generateObstacleGroup = (paper) => {
  const obstacleGroup = new paper.Group();

  const obstacles = [
    [new paper.Point(5,20), new paper.Point(7,16), new paper.Point(10,20)],
    [new paper.Point(5,29), new paper.Point(5,33), new paper.Point(7,31)],
    [new paper.Point(10,2), new paper.Point(10,1), new paper.Point(11,1), new paper.Point(11,2)],
    [new paper.Point(15,17), new paper.Point(15,15), new paper.Point(17,15), new paper.Point(17,17)],
    [new paper.Point(15,31), new paper.Point(18,35), new paper.Point(23,33)],
    [new paper.Point(17,5), new paper.Point(20,5), new paper.Point(20,8)],
    [new paper.Point(25,25), new paper.Point(25,23), new paper.Point(27,23), new paper.Point(27,25)],
    [new paper.Point(35,10), new paper.Point(36,12), new paper.Point(39,11)],
    [new paper.Point(35,33), new paper.Point(35,30), new paper.Point(40, 30), new paper.Point(40, 33)],
    [new paper.Point(50,10), new paper.Point(55,10), new paper.Point(55, 5)],
    [new paper.Point(50, 20), new paper.Point(51,17), new paper.Point(53,20)],
    [new paper.Point(58,1), new paper.Point(60,3), new paper.Point(63,1)],
    [new paper.Point(58,32), new paper.Point(59,34), new paper.Point(60,35), new paper.Point(61,34), new paper.Point(62,32), new paper.Point(61,28), new paper.Point(59,28)]
  ]

  for (let i=0; i<obstacles.length; i++) {
    const obstacle = new paper.Path(obstacles[i]);
    obstacle.closed = true;
    obstacle.fillColor = Math.random() > 0.5 ? new paper.Color(0, 0, 0, 0.01) : 'black';

    obstacleGroup.addChild(obstacle);
  }

  obstacleGroup.matrix = new paper.Matrix().scale(30);

  return obstacleGroup;
}

// Canvas component
export const Canvas = ({ props, children }) => {
  const canvasRef = createRef();

  // useEffect() for side effects after the component has rendered
  useEffect(() => {
    window.addEventListener('load', () => {
      paper.setup(canvasRef.current);

      const obstacleGroup = generateObstacleGroup(paper);
      const pathGroup = generatePathGroup(paper);
      const worldGroup = new paper.Group([obstacleGroup, pathGroup]);
      worldGroup.position.x += 1000;
      worldGroup.position.y += 500;

      const sea = new paper.Path.Rectangle(paper.view.bounds);
      sea.fillColor = 'lightblue';
      sea.sendToBack();

      const lidar = new paper.Path.Circle(paper.view.center, 100);
      lidar.strokeColor = 'blue'

      const dangerSense = () => {
        let danger = false;

        for (let i=0; i<obstacleGroup.children.length; i++) {
          let intersects = lidar.getIntersections(obstacleGroup.children[i]);

          if (!danger && intersects.length > 0) danger = true;

          for (let j=0; j<intersects.length; j++) {
            new paper.Path.Circle({
              center: intersects[j].point,
              radius: 3,
              fillColor: 'red',
              parent: worldGroup
            })
          }
        }

        lidar.strokeColor = danger ? 'red' : 'blue'
      }

      PaperJoystick(paper, new paper.Point(
        100,
        paper.view.bounds.height - 100
      ), 0.01, 10, ({delta}) => {
          worldGroup.position.x -= delta.x;
          worldGroup.position.y -= delta.y;
          dangerSense();
        });

      PaperJoystick(paper, new paper.Point(
        225,
        paper.view.bounds.height - 100
      ), 0.01, 10, ({delta}) => {
        dangerSense();
      })
    })
  })

  return (
    <Box as="canvas" width="100vw" height="100vh" ref={canvasRef} {...props}>
      {children}
    </Box>
  );
}
