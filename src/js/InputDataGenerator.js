//var InputQueueGenerator = Class.create({
function InputDataGenerator(queueLength, cyllindersCount) {

    this.queueLength = queueLength;
    this.cyllindersCount = cyllindersCount;

    this.getRandomNum = function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    this.genQueue = function(queueLength, cyllindersCount) {
        var queue = [];
        for (var i = 0; i < queueLength; i++) {
            var curRand = this.getRandomNum(0, cyllindersCount);
            queue.push(curRand);
        }
        return queue;
    }

    this.getData = function() {
        return {
            queue: this.genQueue(this.queueLength, this.cyllindersCount),
            head: this.getRandomNum(0, this.cyllindersCount)
        };
    }

}
