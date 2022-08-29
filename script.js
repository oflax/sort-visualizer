var arr = [];

var table = document.getElementById('table');

setInterval(() => {
    const theme = document.getElementById('theme').value
    const css_root = document.querySelector(':root')
    switch (theme) {
        case 'mc':
            css_root.style.setProperty('--back', 'white')
            css_root.style.setProperty('--fore', 'black')
            break
        case 'og':
            css_root.style.setProperty('--back', '#1e1e2e')
            css_root.style.setProperty('--fore', '#89b4fa')
            break
        case 'sz':
            css_root.style.setProperty('--back', '#151515')
            css_root.style.setProperty('--fore', '#B4A5A5')
            break
        case 'mt':
            css_root.style.setProperty('--back', '#282c34')
            css_root.style.setProperty('--fore', '#7EBDC2')
            break
        case 'tm':
            css_root.style.setProperty('--back', '#7EBDC2')
            css_root.style.setProperty('--fore', '#282c34')
            break
        case 'pw':
            css_root.style.setProperty('--fore', '#f2e964')
            css_root.style.setProperty('--back', '#d9598c')
            break
    }
})

function generate() {
    // * Clearing window for next generation
    for (let i=3; i<1000; i++) {
        window.clearInterval(i);
    }
    // * Getting amount of bars to create and where to create bars 
    var size = document.getElementById('size').value;

    // * Clearing the array to make this function usable more than once 
    arr = [];

    // * If there is already bars on screen making them dissapear
    [].slice.call(table.children).forEach(bar => {
        bar.style.maxHeight = '0';
    });

    var ti = 500;

    if(table.innerHTML=='') ti = 0

    setTimeout(()  => {
        table.innerHTML = ''
        // * Creating bars
        for (var i = 0; i < size; i++) {
            var bar = document.createElement('div');
            bar.classList.add('bar');
            bar.id = i
            table.appendChild(bar);
        }
        // * Adding them to our array to sort and make them appear on the screen
        setTimeout(() => {
            [].slice.call(table.children).forEach(bar => {
                bar_height = `${parseFloat((Math.random() * (100 - 10) + 10).toFixed(1))}%`;
                bar.style.maxHeight = bar_height;
                var value = [parseInt(bar.id), bar_height.replace('%', '')];
                arr.push(value)
            });            
        }, 100);
    }, ti)
}

function timer(array) {
    for(i=0; i<array.length; i++) {
        const bar = document.getElementById(i);
        //bar.style.transition = '0s';
        bar.style.transition = 'max-height .1s';
        bar.style.maxHeight = array[i].toString()+'%';
    }
}

// * Calculating which algorithm to use 
function sort() {
    var heights = []
    
    const dropdown = document.getElementById('dropdown').value;
    // * Creating array to sort with name heights
    arr.forEach(subarr => {
        heights.push(parseInt(subarr[1]))
    });
    
    //heights.sort(function(a, b){return a - b});

    const delay = document.getElementById('delay').value
    switch (dropdown) {
        case 'marge':
            mergeSort(heights, 0,heights.length-1);
            timer(heights);
            break;
        case 'bubble':
            bubbleSort(heights, delay);
            break;
        case 'insertion':
            insertionSort(heights, delay);
            break;
        case 'selection':
            selectionSort(heights, delay);
            break;
        case 'heap':
            heapSort(heights, delay);
            break;
        case 'merge':
            let cases = mergeSort(heights, delay);
            a = 1

            cases.forEach(cas => {
                setTimeout(() => {
                    timer(cas)
                }, delay*a)
                a++
            });
            break;
        case 'quick':
            quickSort(heights, 0, heights.length-1, delay)
            break;
        case 'radix':
            radixSort(heights)
            break;
        default:
            break;
    }

}


function mergeSort(array) {
    var arrays = [array.slice()],
    n = array.length,
    array0 = array,
    array1 = new Array(n);
  
    for (var m = 1; m < n; m <<= 1) {
        for (var i = 0; i < n; i += (m << 1)) {
            merge(i, Math.min(i + m, n), Math.min(i + (m << 1), n));
        }
        arrays.push(array1.slice());
        array = array0, array0 = array1, array1 = array;
    }
  
    function merge(left, right, end) {
        for (var i0 = left, i1 = right, j = left; j < end; ++j) {
            array1[j] = array0[i0 < right && (i1 >= end || array0[i0] <=    array0[i1]) ? i0++ : i1++];
        }
    }
    return arrays
}

function bubbleSort(arr, delay) {
    console.clear()
    let len = arr.length;
    let checked = false;
    do {
        checked = false;
        setInterval(() => {
            for (let i = 0; i < len; i++) {
                if (arr[i] > arr[i + 1]) {
                    let tmp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = tmp;
                    checked = true;
                }
                if (i == 0) {
                    timer(arr)
                }
            }
        }, delay);
    } while (checked);
}

function insertionSort(arr, delay) {
    console.clear()
    var cases = [];
    let len = arr.length;
    for (let i = 1; i < len; i++) {
        let j = i - 1
        let temp = arr[i]
        while (j >= 0 && arr[j] > temp) {
            arr[j + 1] = arr[j]
            j--
        }
        arr[j+1] = temp
        cases.push(arr.toString())
    }

    a = 1

    cases.forEach(cas => {
        setTimeout(() => {
            cas = cas.split(',')
            cas.forEach(val => parseInt(val))
            timer(cas)
        }, delay*a)
        a++
    });
}

function selectionSort(arr, delay) {
    let len = arr.length;
    a = 1
    for(let i = 0; i < len; i++) {
        setTimeout(() => {
            let min = i;
            for(let j = i+1; j < len; j++){
                if(arr[j] < arr[min]) {
                min=j; 
            }
        }
        if (min != i) {
            let tmp = arr[i]; 
            arr[i] = arr[min];
            arr[min] = tmp;      
            }
            timer(arr)
        }, delay*a)
        a++
    }
}

var array_length;

function heap_root(input, i) {
    var left = 2 * i + 1;
    var right = 2 * i + 2;
    var max = i;

    if (left < array_length && input[left] > input[max]) {
        max = left;
    }

    if (right < array_length && input[right] > input[max])     {
        max = right;
    }

    if (max != i) {
        swap(input, i, max);
        heap_root(input, max);
    }
}

function swap(input, index_A, index_B) {
    var temp = input[index_A];

    input[index_A] = input[index_B];
    input[index_B] = temp;
}

function heapSort(arr, delay) {
    console.clear();
    array_length = arr.length;

    let cases = [];
    let a = 0;

    for (var i = Math.floor(array_length / 2); i >= 0; i -= 1)      {
        heap_root(arr, i);
    }
    
    for (i = arr.length - 1; i > 0; i--) {
        swap(arr, 0, i);
        array_length--;
        heap_root(arr, 0);
        cases.push(arr.toString());
    }
    cases.forEach(cas => {
        setTimeout(() => {
            cas = cas.split(',')
            cas.forEach(val => parseInt(val))
            timer(cas)
        }, delay*a)
        a++
    });
    
}

function partition(arr, start, end) {
    const pivotValue = arr[start]
    let swapIndex = start
    for (let i = start + 1; i <= end; i++) {
        if (pivotValue > arr[i]) {
            swapIndex++
            if (i !== swapIndex) {
                // SWAP
                ;[arr[i], arr[swapIndex]] = [arr[swapIndex], arr[i]]
            }
        }
    }
    if (swapIndex !== start) {
        // Swap pivot into correct place
        ;[arr[swapIndex], arr[start]] = [arr[start], arr[swapIndex]]
    }
    timer(arr)
    return swapIndex
}

function quickSort(arr, start, end, delay) {
    // Base case
    if (start >= end) return
    setTimeout(() => {
        let pivotIndex = partition(arr, start, end)
        // Left
        quickSort(arr, start, pivotIndex - 1, delay)
        // Right
        quickSort(arr, pivotIndex + 1, end, delay)
    }, delay)
}