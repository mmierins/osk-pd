function numericSort(a, b) {
    return a - b;
}

function removeDupes(arr) {
    return arr.filter(function(item, pos) {
        return !pos || item != arr[pos - 1];
    });
}