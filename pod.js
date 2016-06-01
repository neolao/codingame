var pod,
    nextCheckpointX,
    nextCheckpointY,
    nextCheckpointDistance,
    nextCheckpointAngle,
    checkpoints = [],
    nextCheckpointIndex = 0,
    boostMax = 1,
    boostCount = 0,
    podRadius = 400,
    opponents = [];


function registerPodPosition(x, y)
{
    pod = {
        x : x,
        y : y
    };
}

function registerNextCheckpoint(x, y, distance, angle)
{
    nextCheckpointX = x;
    nextCheckpointY = y;
    nextCheckpointDistance = distance;
    nextCheckpointAngle = angle;

    printErr('Next checkpoint distance: ' + nextCheckpointDistance);
    printErr('Next checkpoint angle: ' + nextCheckpointAngle);

    // Select the next checkpoint index
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

function resetOpponents()
{
    opponents = [];
}

function registerOpponent(x, y)
{
    var opponent = {
        x: x,
        y: y
    };

    opponents.push(opponent);
}

function isNearOpponent()
{
    for (var total = opponents.length, index = 0; index < total; index++) {
        var opponent = opponents[index];

        // Get distance between the pod and the opponent
        // Pythagore
        var diffX = Math.abs(opponent.x - pod.x);
        var diffY = Math.abs(opponent.y - pod.y);
        var distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));

        //printErr('Opponent (' + opponent.x + ', ' + opponent.y+ ') Pod (' + pod.x + ', ' + pod.y + ')');
        printErr('Opponent ' + index + ' distance: ' + distance);
        if (distance < podRadius * 2 + 400) {
            return opponent;
        }
    }

    return false;
}

function goToPoint(x, y, speed)
{
    x = parseInt(x);
    y = parseInt(y);

    printErr('speed: ' + speed);
    print(x + ' ' + y + ' ' + speed);
}

function findMomentToBoost(x, y)
{
    // Get distance between the pod and the destination
    // Pythagore
    var diffX = Math.abs(x - pod.x);
    var diffY = Math.abs(y - pod.y);
    var distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));

    // Get the angle
    var angle = Math.atan2(y - pod.y, x - pod.x) * 180 / Math.PI;

    if (Math.abs(angle) > 1) {
        return false;
    }

    if (distance < 2000) {
        return false;
    }

    if (boostCount >= boostMax) {
        return false;
    }

    goToPoint(x, y, 'BOOST');
    printErr('Boosted');
    boostCount++;

    return true;
}

function goToPointWithBoost(x, y)
{
    var boosted = findMomentToBoost(x, y);
    if (boosted) {
        return;
    }

    goToPoint(x, y, 100);
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
    if (nextCheckpointDistance < 3000) {
        speed -= Math.abs((1 - nextCheckpointDistance / 2000) * 50);
    }

    // Decrease speed if the angle is too high
    if (Math.abs(nextCheckpointAngle) > 20) {
        speed -= Math.abs((nextCheckpointAngle / 180) * 50);
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

function goToPointSlowlyWithBoost(x, y)
{
    var boosted = findMomentToBoost(x, y);
    if (boosted) {
        return;
    }

    goToPointSlowly(x, y);
}

function ejectOpponent()
{
    var opponent = isNearOpponent();
    if (!opponent) {
        return false;
    }

    goToPointSlowlyWithBoost(opponent.x, opponent.y);
    return true;
}


// GAME LOOP
while (true) {
    var inputs = readline().split(' ');
    registerPodPosition(parseInt(inputs[0]), parseInt(inputs[1]));
    registerNextCheckpoint(parseInt(inputs[2]), parseInt(inputs[3]), parseInt(inputs[4]), parseInt(inputs[5]));

    var inputs = readline().split(' ');
    resetOpponents();
    registerOpponent(inputs[0], inputs[1]);


    /*
    var ejected = ejectOpponent();
    if (ejected) {
        continue;
    }
    //*/
    goToPointWithBoost(nextCheckpointX, nextCheckpointY);
    //goToPointSlowlyWithBoost(nextCheckpointX, nextCheckpointY);
}
