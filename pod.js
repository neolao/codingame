var podX,
    podY,
    nextCheckpointX,
    nextCheckpointY,
    nextCheckpointDistance,
    nextCheckpointAngle;


function registerPodPosition(x, y)
{
    podX = x;
    podY = y;
}

function registerNextCheckpoint(x, y, distance, angle)
{
    nextCheckpointX = x;
    nextCheckpointY = y;
    nextCheckpointDistance = distance;
    nextCheckpointAngle = angle;
}

function getOppositePoint()
{
}

function goToPoint(x, y, speed)
{
    printErr('speed: ' + speed);
    print(x + ' ' + y + ' ' + speed);
}

function goToPointSlowly(x, y)
{
    var speed = 0;

    speed = (nextCheckpointDistance / 5000) * 100;
    speed = Math.abs(Math.ceil(speed));
    if (speed < 50) {
        speed = 50;
    }
    if (speed > 100) {
        speed = 100;
    }

    goToPoint(x, y, speed);
}

function debugNextCheckpointDistance()
{
    printErr('Next checkpoint distance: ' + nextCheckpointDistance);
}
function debugNextCheckpointAngle()
{
    printErr('Next checkpoint angle: ' + nextCheckpointAngle);
}

// GAME LOOP
while (true) {
    var inputs = readline().split(' ');
    var x = parseInt(inputs[0]);
    var y = parseInt(inputs[1]);
    var nextCheckpointX = parseInt(inputs[2]); // x position of the next check point
    var nextCheckpointY = parseInt(inputs[3]); // y position of the next check point
    var nextCheckpointDist = parseInt(inputs[4]); // distance to the next checkpoint
    var nextCheckpointAngle = parseInt(inputs[5]); // angle between your pod orientation and the direction of the next checkpoint
    var inputs = readline().split(' ');
    var opponentX = parseInt(inputs[0]);
    var opponentY = parseInt(inputs[1]);


    registerPodPosition(x, y);
    registerNextCheckpoint(nextCheckpointX, nextCheckpointY, nextCheckpointDist, nextCheckpointAngle);

    debugNextCheckpointDistance();
    debugNextCheckpointAngle();
    goToPointSlowly(nextCheckpointX, nextCheckpointY);
}
