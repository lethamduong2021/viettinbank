var array = ['1', 'x1', '1','2', '2', 'x2', 'x3', '3', 'x4', 'x5', '3']
var array = ['1', 'x1', '2', '2', '3', 'x2', 'x3', '1', 'x4', 'x5', '4']
var array = ['1', 'x1', '2', '2', '3', 'x2', 'x3', '1', 'x4', 'x5', '4']
var array = ['1', 'x1', '2', '2', '3', 'x2', 'x3', '1', 'x4', 'x5', '4']
// var result = ['1', '1', 'x1', '2', '2', '3', 'x2', 'x3', 'x4', 'x5', '4']

function groupElements(arr) {
    const groupedElements = [];
    const seenElements = new Set();

    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if (!seenElements.has(element)) {
            seenElements.add(element);
            groupedElements.push(element);
        }
    }

    return groupedElements;
}

console.log(groupElements(array))