var podX,
    podY,
    nextCheckpointX,
    nextCheckpointY,
    nextCheckpointDistance,
    nextCheckpointAngle,
    checkpoints = [],
    nextCheckpointIndex = 0;


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

    // Select the checkpoint index
    var checkpoint
    for (var total = checkpoints.length, index = 0; index < total; index++) {
        checkpoint = checkpoints[index];
        if (checkpoint.x === x && checkpoint.y === y) {
            nextCheckpointIndex = index;
            //printErr('Next checkpoint index: ' + nextCheckpointIndex)
            return;
        }
    }
    checkpoint = {
        x: x,
        y: y
    };
    checkpoints.push(checkpoint);
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

    speed = (nextCheckpointDistance / 1000) * 100;
    speed = Math.abs(Math.ceil(speed));
    if (speed > 100) {
        speed = 100;
    }

    // Decrease speed near the checkpoint
    if (nextCheckpointDistance < 2000) {
        speed -= Math.abs((1 - nextCheckpointDistance / 2000) * 30);
    }

    // Decrease speed if the angle is too high
    if (Math.abs(nextCheckpointAngle) > 90) {
        speed -= Math.abs((nextCheckpointAngle / 180) * 60);
    }

    // Speed limits
    speed = Math.ceil(speed);
    if (speed < 10) {
        speed = 10;
    }
    if (speed > 100) {
        speed = 100;
    }

    // Go go go!
    goToPoint(x, y, speed);
}

var boostMax = 1;
var boostCount = 0;
function goToPointSlowlyWithBoost(x, y)
{
    if (Math.abs(nextCheckpointAngle) > 1) {
        goToPointSlowly(x, y);
        return;
    }

    if (nextCheckpointDistance < 6000) {
        goToPointSlowly(x, y);
        return;
    }

    if (boostCount >= boostMax) {
        goToPointSlowly(x, y);
        return;
    }

    goToPoint(x, y, 'BOOST');
    boostCount++;
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
    goToPointSlowlyWithBoost(nextCheckpointX, nextCheckpointY);
}
