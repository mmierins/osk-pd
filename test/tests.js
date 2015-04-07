QUnit.test("InputDataGenerator Tests", function(assert) {
    this.isValuesInRange = function(queue, queueLength) {
        var min = 0;
        var max = queueLength-1;
        for (var i = 0; i < queue.length; i++) {
            if (queue[i] < min || queue[i] > max) {
                return false;
            }
        }
        return true;
    }

    var iqg = new InputDataGenerator(10, 200);
    assert.equal(iqg.getData().queue.length, 10);
    ok(this.isValuesInRange(iqg.getData().queue, 200));

    iqg = new InputDataGenerator(5, 100);
    assert.equal(iqg.getData().queue.length, 5);
    ok(this.isValuesInRange(iqg.getData().queue, 100));

    iqg = new InputDataGenerator(0, 50);
    assert.equal(iqg.getData().queue.length, 0);
});


QUnit.test("FCFS Tests", function(assert) {
    var fcfs = new FCFS();
    fcfs.doScheduling([95, 180, 34, 119, 11, 123, 62, 64], 50, 200);

    assert.equal(fcfs.getMovementsCount(), 644);
    assert.deepEqual(fcfs.getMovements(), [50, 95, 180, 34, 119, 11, 123, 62, 64]);
});

QUnit.test("SSTF Tests", function(assert) {
    var sstf = new SSTF();
    sstf.doScheduling([95, 180, 34, 119, 11, 123, 62, 64], 50, 200);

    assert.equal(sstf.getMovementsCount(), 236);
    assert.deepEqual(sstf.getMovements(), [50, 62, 64, 34, 11, 95, 119, 123, 180]);
});

QUnit.test("SCAN Tests", function(assert) {
    var scan = new SCAN();
    scan.doScheduling([95, 180, 34, 119, 11, 123, 62, 64], 50, 200);

    assert.equal(scan.getMovementsCount(), 230);
    assert.deepEqual(scan.getMovements(), [50, 34, 11, 0, 62, 64, 95, 119, 123, 180]);

    scan = new SCAN();
    scan.doScheduling([95, 180, 34, 119, 11, 123, 62, 64], 160, 200);

    assert.equal(scan.getMovementsCount(), 227);
    assert.deepEqual(scan.getMovements(), [160, 180, 199, 123, 119, 95, 64, 62, 34, 11]);
});

QUnit.test("C-SCAN Tests", function(assert) {
    var cscan = new CSCAN();
    cscan.doScheduling([95, 180, 34, 119, 11, 123, 62, 64], 50, 200);

    assert.equal(cscan.getMovementsCount(), 187);
    assert.deepEqual(cscan.getMovements(), [50, 34, 11, 0, "-", 199, 180, 123, 119, 95, 64, 62]);

    cscan = new CSCAN();
    cscan.doScheduling([95, 180, 34, 119, 11, 123, 62, 64], 160, 200);

    assert.equal(cscan.getMovementsCount(), 162);
    assert.deepEqual(cscan.getMovements(), [160, 180, 199, "-", 0, 11, 34, 62, 64, 95, 119, 123]);
});

QUnit.test("C-LOOK Tests", function(assert) {
    var clook = new CLOOK();
    clook.doScheduling([95, 180, 34, 119, 11, 123, 62, 64], 50, 200);

    assert.equal(clook.getMovementsCount(), 157);
    assert.deepEqual(clook.getMovements(), [50, 34, 11, "-", 180, 123, 119, 95, 64, 62]);

    clook = new CLOOK();
    clook.doScheduling([95, 180, 34, 119, 11, 123, 62, 64], 160, 200);

    assert.equal(clook.getMovementsCount(), 132);
    assert.deepEqual(clook.getMovements(), [160, 180, "-", 11, 34, 62, 64, 95, 119, 123]);
});