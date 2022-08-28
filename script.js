var arr = [];

function generate() {
    // * Clearing window for next generation
    for (let i=1; i<1000; i++) {
        window.clearInterval(i);
    }
    // * Getting amount of bars to create and where to create bars 
    var size = document.getElementById('size').value;
    var table = document.getElementById('table');

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
        // * Adding them to our array to sort and making them appear on the screen
        setTimeout(() => {
            [].slice.call(table.children).forEach(bar => {
                bar_height = `${(Math.floor(Math.random() * 90)+5).toString()}%`;
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
        bar.style.transition = '.1s';
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

    const speed = document.getElementById('speed').value
    switch (dropdown) {
        case 'marge':
            mergeSort(heights, 0,heights.length-1);
            timer(heights);
            break;
        case 'bubble':
            bubbleSort(heights, speed);
            break;
        case 'insertion':
            insertionSort(heights, speed);
            break;
        case 'selection':
            selectionSort(heights, speed);
            break;
        case 'heap':
            heapSort(heights, speed);
            break;
        case 'quick':
            quickSort(heights, 0,heights.length -1)
            timer(heights);
            break;
        default:
            break;
    }

}

function merge(arr, start, mid, end)
{
    let start2 = mid + 1;

    // * If the direct merge is already sorted
    if (arr[mid] <= arr[start2]) 
    {
        return;
    }

    // * Two pointers to maintain start
    // * of both arrays to merge
    while (start <= mid && start2 <= end)
    {
        
        // * If element 1 is in right place
        if (arr[start] <= arr[start2])
        {
            start++;
        }
        else 
        {
            let value = arr[start2];
            let index = start2;

            // * Shift all the elements between element 1
            // * element 2, right by 1.
            while (index != start) 
            {
                arr[index] = arr[index-1];
                index--;
                
            }
            arr[start] = value;

            // * Update all the pointers
            start++;
            mid++;
            start2++;
        }
    }
}

// * l is for left index and r is right index 
// * of the sub-array of arr to be sorted 
function mergeSort(arr, l, r)
{
    console.clear()
    if (l < r) 
    {

        // * Same as (l + r) / 2, but avoids overflow
        // * for large l and r
        let m = l + Math.floor((r - l) / 2);

        // * Sort first and second halves
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);

        merge(arr, l, m, r);
    }
}
function bubbleSort(arr, speed) {
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
        }, speed);
    } while (checked);
}

function insertionSort(arr, speed) {
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
        }, speed*a)
        a++
    });
}

function selectionSort(arr, speed) {
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
        }, speed*a)
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

function heapSort(arr, speed) {
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
        }, speed*a)
        a++
    });

}

function partition(arr, low, high) {

    // * pivot
    let pivot = arr[high];
    
    // * Index of smaller element and
    // * indicates the right position
    // * of pivot found so far
    let i = (low - 1);
    
    for (let j = low; j <= high - 1; j++) {
    
        // * If current element is smaller 
        // * than the pivot
        if (arr[j] < pivot) {
    
            // * Increment index of 
            // * smaller element
            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, high);
    return (i + 1);
    /* The main function that implements QuickSort
            arr[] --> Array to be sorted,
            low --> Starting index,
            high --> Ending index
     */
}
function quickSort(arr, low, high) {
    if (low < high) {
    
        // * pi is partitioning index, arr[p]
        // * is now at right place 
        let pi = partition(arr, low, high);
    
        // * Separately sort elements before
        // * partition and after partition
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}
