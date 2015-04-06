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

    this.movementsCount = 0;
    this.movements = [];

    this.moveToNext = function(inputQueue, curIdx) {
        var cur = inputQueue[curIdx];

        if (curIdx+1 <= inputQueue.length-1) {
            var next = inputQueue[curIdx + 1];
            this.movementsCount += Math.abs(next - cur);
        }

        this.movements.push(cur);
    }

    this.getMovements = function() {
        return this.movements;
    }

    this.getMovementsCount = function() {
        return this.movementsCount;
    }

    this.doScheduling = function(inputQueue, head, cyllindersCount) {
        var inputQueueCopy = inputQueue.slice();
        inputQueueCopy = [head].concat(inputQueueCopy);

        for (var i = 0; i < inputQueueCopy.length; i++) {
            this.moveToNext(inputQueueCopy, i);
        }
    }

}
//});

//var SSTF = Class.create(AbstractScheduler, {
function SSTF() {

    this.movementsCount = 0;
    this.movements = [];

    this.getNextNearestElemIdx = function(inputQueue, cur) {
        var searchFromIdx = 0;
        var nearestIdx = searchFromIdx;
        var next = inputQueue[nearestIdx];
        var nearestDistance = Math.abs(next - cur);

        for (var i = searchFromIdx + 1; i < inputQueue.length; i++) {
            var curDistance = Math.abs(inputQueue[i] - cur);
            if (curDistance < nearestDistance) {
                nearestDistance = curDistance;
                nearestIdx = i;
            }
        }

        return nearestIdx;
    }

    this.moveToNext = function(inputQueue, head) {
        var cur = this.movements.length === 0 ? head : this.movements[this.movements.length-1];
        var nextIdx = this.getNextNearestElemIdx(inputQueue, cur);
        var next = inputQueue[nextIdx];
        inputQueue.splice(nextIdx, 1);

        this.movementsCount += Math.abs(next - cur);
        this.movements.push(next);
    }

    this.doScheduling = function(inputQueue, head, tail) {
        // curIdx = -1 means head
        var clonedInputQueue = inputQueue.slice();
        for (var curIdx = -1; curIdx < inputQueue.length-1; curIdx++) {
            this.moveToNext(clonedInputQueue, head);
        }
    }

    this.getMovements = function() {
        return this.movements;
    }

    this.getMovementsCount = function() {
        return this.movementsCount;
    }

}
//});

function SCAN() {

    this.movementsCount = 0;
    this.movements = [];

    this.getNextNearestElemIdx = function(inputQueue, cur) {
        var searchFromIdx = 0;
        var nearestIdx = searchFromIdx;
        var next = inputQueue[nearestIdx];
        var nearestDistance = Math.abs(next - cur);

        for (var i = searchFromIdx + 1; i < inputQueue.length; i++) {
            var curDistance = Math.abs(inputQueue[i] - cur);
            if (curDistance < nearestDistance) {
                nearestDistance = curDistance;
                nearestIdx = i;
            }
        }

        return nearestIdx;
    }

    this.countMovements = function(arr, start, end) {
        var movements = 0;
        for (var i = start; i < end-1; i++) {
            var cur = arr[i];
            var next = arr[i+1];
            movements += Math.abs(next-cur);
        }
        return movements;
    }

    this.doScheduling = function(inputQueue, head, tail) {
        // curIdx = -1 means head
        var clonedInputQueue = inputQueue.slice();
        if (clonedInputQueue.indexOf(head) < 0) {
            clonedInputQueue.push(head);
        }
        clonedInputQueue.push(0);
        clonedInputQueue.push(tail);
        clonedInputQueue.sort(
            function(a,b) {
                return a-b;
            }
        );

        var curHeadIdx = clonedInputQueue.indexOf(head);

        var movementsToStart = this.countMovements(clonedInputQueue, 0, curHeadIdx);
        var movementsToEnd = this.countMovements(clonedInputQueue, curHeadIdx, clonedInputQueue.length-1);

        if (movementsToStart > movementsToEnd) {
            this.movements = this.movements.concat(clonedInputQueue.slice(curHeadIdx, clonedInputQueue.length-1));
            var temp = clonedInputQueue.slice(0, curHeadIdx-1);
            this.movements = this.movements.concat(temp.reverse());
        } else {
            var temp = clonedInputQueue.slice(0, curHeadIdx);
            this.movements = this.movements.concat(temp.reverse());
            this.movements = this.movements.concat(clonedInputQueue.slice(curHeadIdx+1, clonedInputQueue.length-1));
        }

        this.movementsCount = this.countMovements([head].concat(this.movements), 0, this.movements.length+1);
    }

    this.getMovements = function() {
        return this.movements;
    }

    this.getMovementsCount = function() {
        return this.movementsCount;
    }

}

function CSCAN() {

    this.movementsCount = 0;
    this.movements = [];

    this.getNextNearestElemIdx = function(inputQueue, cur) {
        var searchFromIdx = 0;
        var nearestIdx = searchFromIdx;
        var next = inputQueue[nearestIdx];
        var nearestDistance = Math.abs(next - cur);

        for (var i = searchFromIdx + 1; i < inputQueue.length; i++) {
            var curDistance = Math.abs(inputQueue[i] - cur);
            if (curDistance < nearestDistance) {
                nearestDistance = curDistance;
                nearestIdx = i;
            }
        }

        return nearestIdx;
    }

    this.countMovements = function(arr, start, end) {
        var movements = 0;
        for (var i = start; i < end-1; i++) {
            var cur = arr[i];
            var next = arr[i+1];
            movements += Math.abs(next-cur);
        }
        return movements;
    }

    this.doScheduling = function(inputQueue, head, tail) {
        // curIdx = -1 means head
        var clonedInputQueue = inputQueue.slice();
        if (clonedInputQueue.indexOf(head) < 0) {
            clonedInputQueue.push(head);
        }
        clonedInputQueue.push(0);
        clonedInputQueue.push(tail);
        clonedInputQueue.sort(
            function(a,b) {
                return a-b;
            }
        );

        var curHeadIdx = clonedInputQueue.indexOf(head);

        var movementsToStart = this.countMovements(clonedInputQueue, 0, curHeadIdx);
        var movementsToEnd = this.countMovements(clonedInputQueue, curHeadIdx, clonedInputQueue.length-1);

        if (movementsToStart > movementsToEnd) {
            this.movements = this.movements.concat(clonedInputQueue.slice(curHeadIdx, clonedInputQueue.length-1));
            this.movementsCount = this.countMovements(this.movements.concat([tail]), 0, this.movements.length+1);

            var temp = clonedInputQueue.slice(0, curHeadIdx-1);
            this.movementsCount += this.countMovements([head].concat(temp), 0, temp.length+1);
            this.movements = this.movements.concat(temp.reverse());
        } else {
            var temp = clonedInputQueue.slice(0, curHeadIdx);
            this.movementsCount = this.countMovements([head].concat(temp), 0, temp.length+1);
            this.movements = this.movements.concat(temp.reverse());

            temp = clonedInputQueue.slice(curHeadIdx+1, clonedInputQueue.length);
            temp = temp.reverse();

            this.movementsCount += this.countMovements(temp.concat([tail]), 0, temp.length+1);
            this.movements = this.movements.concat(temp);
        }

        this.movementsCount = this.countMovements([head].concat(this.movements), 0, this.movements.length+1);
    }

    this.getMovements = function() {
        return this.movements;
    }

    this.getMovementsCount = function() {
        return this.movementsCount;
    }

}
