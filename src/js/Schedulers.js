//var AbstractScheduler = Class.create({
//    movementsCount : 0,
//    movements : [],
//
//    moveToNext : function(inputQueue, head, tail, curIdx) {
//        // dummy function
//        // to be overriden in subclassees
//    },
//
//    doScheduling : function(inputQueue, head, tail) {
//        // curIdx = -1 means head
//        var clonedInputQueue = inputQueue.clone(inputQueue);
//        for (var curIdx = -1; curIdx < inputQueue.length-1; curIdx++) {
//            this.moveToNext(clonedInputQueue, head, tail, curIdx);
//        }
//    },
//
//    getMovements : function() {
//        return this.movements;
//    },
//
//    getMovementsCount : function() {
//        return this.movementsCount;
//    }
//
//});

//var FCFS = Class.create(AbstractScheduler, {
function FCFS() {

    this.movements = [];

    this.getMovements = function() {
        return this.movements;
    }

    this.getMovementsCount = function() {
        return countMovements(this.movements);
    }

    this.doScheduling = function(inputQueue, head, cyllindersCount) {
        this.movements = [head].concat(inputQueue);
    }

}
//});

//var SSTF = Class.create(AbstractScheduler, {
function SSTF() {

    this.movements = [];

    // naive implementation
    this.getNextNearestElemIdx = function(inputQueue, cur) {
        var searchFromIdx = 0;
        var nextNearestIdx = searchFromIdx;
        var nextNearest = inputQueue[nextNearestIdx];
        var nearestDistance = Math.abs(nextNearest - cur);

        for (var i = searchFromIdx + 1; i < inputQueue.length; i++) {
            var curDistance = Math.abs(inputQueue[i] - cur);
            if (curDistance < nearestDistance) {
                nearestDistance = curDistance;
                nextNearestIdx = i;
            }
        }

        return nextNearestIdx;
    }

    this.moveToNext = function(inputQueue, head) {
        var prevMovement = this.movements[this.movements.length-1];

        var cur = (this.movements.length === 0) ? head : prevMovement;

        var nextIdx = this.getNextNearestElemIdx(inputQueue, cur);
        var next = inputQueue[nextIdx];

        inputQueue.splice(nextIdx, 1); // remove found elem from array

        this.movements.push(next);
    }

    this.doScheduling = function(inputQueue, head, cyllindersCount) {
        var inputQueueCopy = inputQueue.slice();

        for (var i = 0; i < inputQueue.length; i++) {
            this.moveToNext(inputQueueCopy, head);
        }

        this.movements = [head].concat(this.movements);
    }

    this.getMovements = function() {
        return this.movements;
    }

    this.getMovementsCount = function() {
        return countMovements(this.movements);
    }

}
//});

function SCAN() {

    this.movements = [];

    this.doScheduling = function(inputQueue, head, cyllindersCount) {
        var clonedInputQueue = inputQueue.slice();

        clonedInputQueue.push(0, head, cyllindersCount-1);
        clonedInputQueue.sort(numericSort);
        clonedInputQueue = removeDupes(clonedInputQueue);

        var curHeadIdx = clonedInputQueue.indexOf(head);

        var movementsToStart = countMovements(clonedInputQueue, 0, curHeadIdx);
        var movementsToEnd = countMovements(clonedInputQueue, curHeadIdx, clonedInputQueue.length-1);

        if (movementsToStart < movementsToEnd) {
            var headPart = clonedInputQueue.slice(0, curHeadIdx+1).reverse();
            var tailPart = clonedInputQueue.slice(curHeadIdx+1, clonedInputQueue.length-1)
            this.movements = this.movements.concat(headPart);
            this.movements = this.movements.concat(tailPart);
        } else {
            var headPart = clonedInputQueue.slice(1, curHeadIdx).reverse();
            var tailPart = clonedInputQueue.slice(curHeadIdx, clonedInputQueue.length);
            this.movements = this.movements.concat(tailPart);
            this.movements = this.movements.concat(headPart);
        }
    }

    this.getMovements = function() {
        return this.movements;
    }

    this.getMovementsCount = function() {
        return countMovements(this.movements);
    }

}

function CSCAN() {

    this.movements = [];

    this.doScheduling = function(inputQueue, head, cyllindersCount) {
        var clonedInputQueue = inputQueue.slice();

        clonedInputQueue.push(0, head, cyllindersCount-1);
        clonedInputQueue.sort(numericSort);
        clonedInputQueue = removeDupes(clonedInputQueue);

        var curHeadIdx = clonedInputQueue.indexOf(head);

        var movementsToStart = countMovements(clonedInputQueue, 0, curHeadIdx);
        var movementsToEnd = countMovements(clonedInputQueue, curHeadIdx, clonedInputQueue.length-1);

        if (movementsToStart < movementsToEnd) {
            var headPart = clonedInputQueue.slice(0, curHeadIdx+1).reverse();
            var tailPart = clonedInputQueue.slice(curHeadIdx+1, clonedInputQueue.length).reverse();

            this.movements = this.movements.concat(headPart);
            this.movements.push("-");
            this.movements = this.movements.concat(tailPart);
        } else {
            var tailPart = clonedInputQueue.slice(curHeadIdx, clonedInputQueue.length);
            var headPart = clonedInputQueue.slice(0, curHeadIdx);

            this.movements = this.movements.concat(tailPart);
            this.movements.push("-");
            this.movements = this.movements.concat(headPart);
        }
    }

    this.getMovements = function() {
        return this.movements;
    }

    this.getMovementsCount = function() {
        return countMovements(this.movements);
    }

}

function CLOOK() {

    this.movements = [];

    this.doScheduling = function(inputQueue, head, cyllindersCount) {
        var cscan = new CSCAN();
        cscan.doScheduling(inputQueue, head, cyllindersCount);

        var temp = cscan.getMovements();

        var firstCyllinder = 0;
        var lastCyllinder = cyllindersCount - 1;

        temp.splice(temp.indexOf(firstCyllinder), 1);
        temp.splice(temp.indexOf(lastCyllinder), 1);

        this.movements = temp;
    }

    this.getMovements = function() {
        return this.movements;
    }

    this.getMovementsCount = function() {
        return countMovements(this.movements);
    }

}