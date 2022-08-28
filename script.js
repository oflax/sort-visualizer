var arr = [];

function generate() {
    var size = document.getElementById('size').value;
    var table = document.getElementById('table');

    arr = [];

    [].slice.call(table.children).forEach(bar => {
        bar.style.maxHeight = '0';
    });
    setTimeout(()  => {
        table.innerHTML = ''

        for (var i = 0; i < size; i++) {
            var bar = document.createElement('div');
            bar.classList.add('bar');
            bar.id = i
            table.appendChild(bar);
        }

        setTimeout(() => {
            [].slice.call(table.children).forEach(bar => {
                bar_height = `${(Math.floor(Math.random() * 90)+5).toString()}%`;
                bar.style.maxHeight = bar_height;
                var value = bar_height.slice(0,2);
                arr.push(value)
            });            
        }, 500);
    }, 500)
}

function merge(left, right) {
    let sortedArr = []; // the sorted elements will go here
    if(left.length == 1 && right.length ==1){
        var r =Math.floor(Math.random() * 255);
        var g =Math.floor(Math.random() * 255);
        var b =Math.floor(Math.random() * 255);
        var color = `rgb(${r.toString()},${g.toString()},${b.toString()})`;
        [].slice.call(table.children).forEach(bar => {
            if(bar.maxHeight == `${left.toString()}%`){
                bar.style.background = color;
            }
        }),
        [].slice.call(table.children).forEach(bar => {
            if(bar.maxHeight == `${right.toString()}%`){
                bar.style.background = color;
            }
        })
    }
    while (left.length && right.length) {
        // insert the smallest element to the sortedArr
        if (left[0] < right[0]) {
        sortedArr.push(left.shift());
        } else {
        sortedArr.push(right.shift());
        }
    }
    // use spread operator and create a new array, combining the three arrays
    return [...sortedArr, ...left, ...right];
}
function mergeSort(arr) {
    const half = arr.length / 2;

    // the base case is array length <=1
    if (arr.length <= 1) {
        return arr;
    }

    const left = arr.splice(0, half); // the first half of the array
    const right = arr;
    return merge(mergeSort(left), mergeSort(right));
}

function sort() {
    mergeSort(arr)
    console.log(arr)
}
