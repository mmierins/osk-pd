function numericSort(a, b) {
    return a - b;
}

function removeDupes(arr) {
    return arr.filter(function(item, pos) {
        return !pos || item != arr[pos - 1];
    });
}

function countMovements(arr, start, end) {
    var movements = 0;

    if (start === undefined && end === undefined) {
        start = 0;
        end = arr.length;
    }

    var specialSymbol = "-";

    for (var i = start; i < end-1; i++) {
        if (arr[i] === specialSymbol || arr[i+1] === specialSymbol) continue;
        var cur = arr[i];
        var next = arr[i+1];
        movements += Math.abs(next-cur);
    }
    return movements;
}