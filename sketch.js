//--------------------------------- VARIABLES -----------------------------------------------------//

let arrVal // array

let i = 0  // index 
let j = 0  // index
let t = 0  // tmp 
let c = 0  // counter  

let h = false // loopFlag
let f = false // swapFlag
let s = false // sortFlag

// colors
const normal   = '#1e1e1e'
const marker   = '#f05454'
const backdrop = '#a0dbdb'

//--------------------------------- SETUP --------------------------------------------------------//

function setup() {

  // create canvas of window size
  createCanvas(windowWidth, windowHeight)

  // define border size
  strokeWeight(2)

  // define border color
  stroke(backdrop)

  // drop down menu to select sorting algorithm
  sortAlgo = createSelect()
  sortAlgo.style("font-size", '' + windowHeight / 35 + 'px')
  sortAlgo.style('background', normal)
  sortAlgo.style('color', 'white')
  sortAlgo.option("Merge Sort")
  sortAlgo.option("Insertion Sort")
  sortAlgo.option("Selection Sort")
  sortAlgo.option("Quick Sort")
  sortAlgo.option("Bubble Sort")
  sortAlgo.position(25, 2 * (windowHeight / 35))
  sortAlgo.mouseClicked(pShuffle)

  // drop down menu to select sort speed
  sortSpeed = createSelect()
  sortSpeed.style("font-size", '' + windowHeight / 35 + 'px')
  sortSpeed.style('background', normal)
  sortSpeed.style('color', 'white')
  sortSpeed.option("Sort Speed : Fast", 10)
  sortSpeed.option("Sort Speed : Normal", 50)
  sortSpeed.option("Sort Speed : Slow", 500)
  sortSpeed.position(25, 4 * (windowHeight / 35))

  // button to simulate sorting
  sortBtn = createButton("Simulate Sort")
  sortBtn.style("font-size", '' + windowHeight / 35 + 'px')
  sortBtn.style('background', normal)
  sortBtn.style('color', 'white')
  sortBtn.position(25, 6 * (windowHeight / 35))
  sortBtn.mouseClicked(pSort)

  // button to perform shuffle ~ reset
  resetBtn = createButton("Reset Array")
  resetBtn.style("font-size", '' + windowHeight / 35 + 'px')
  resetBtn.style('background', normal)
  resetBtn.style('color', 'white')
  resetBtn.position(25, 8 * (windowHeight / 35))
  resetBtn.mouseClicked(pShuffle)

  // perform shuffle on start
  pShuffle()
}

//----------------------------------------- SHUFFLE ----------------------------------------//

function pShuffle() {

  // reset sorting variables

  arrVal = [];

  i = 0;  j = 0;  t = 0;  c = 0;
  
  h = false;  f = false;  s = false;

  // push random values into the array
  for (i = 0; i < floor(windowWidth / 30); i++) arrVal.push(Math.ceil(random(height - 200)))
}

//--------------------------------- SORT SWITCH ---------------------------------------------------//

function pSort() {
  switch (sortAlgo.value()) {
    case "Bubble Sort":
      h = false;  j = -1; c = arrVal.length - 1
      pBubble()
      break
    case "Selection Sort":
      i = 0;  j = -1; t = 0;
      pSelect()
      break
    case "Insertion Sort":
      i = 0;  j = -1; t = 0;
      pInsert()
      break
    case "Merge Sort":
      f = true; j = -1;
      pMerge(arrVal)
      break
    case "Quick Sort":
      pQuick(arrVal, 0, arrVal.length - 1)
      break
  }
}

//--------------------------------- DRAW ---------------------------------------------------------//

function draw() {

  // clear canvas for redraw
  clear()

  // paint background
  background(backdrop)

  // iterate over the array
  for (let k = 0; k < arrVal.length; k++) {

    // select color scheme
    switch (sortAlgo.value()) {

      case "Bubble Sort":
        k == j || k == j + 1 ? fill(marker) : fill(normal); break

      case "Selection Sort":
        k == j || k == t     ? fill(marker) : fill(normal); break

      case "Insertion Sort":
        k == i || k == j     ? fill(marker) : fill(normal); break

      case "Merge Sort":
        k == i || k == j     ? fill(marker) : fill(normal); break

      case "Quick Sort":
        states[k] == 0       ? fill(marker) : fill(normal); break

      default: fill(normal)
    }

    // draw rectangle with desired array value
    rect(k * 30, windowHeight, 30, -arrVal[k])
  }
}

//-------------------------------------- BUBBLE SORT ----------------------------------------//

// bubble sort is an algorithm that compares the adjacent elements and swaps their positions
// if they are not in the intended order. The order can be ascending or descending.

function pBubble() {

  // make sure "Bubble Sort" is still selected
  if (sortAlgo.value() != "Bubble Sort") {
    return
  }

  // starting from the first index,
  j++

  // compare the first and the second elements.
  if (arrVal[j] > arrVal[j + 1]) {

    // if the first element is greater than the second element
    swap(arrVal, j, j + 1)

    // flag that a swap occurred
    h = true
  }

  // repeat the above, until current index
  // reaches index of last sorted element
  if (j <= c) setTimeout(pBubble, sortSpeed.value())

  // if a swap occurred i.e aray is still not sorted
  // and the current index has reached index of last sorted element
  if (h && j == c) {

    // reset values

    c--        // index of last sorted item
    h = false  // swap flag
    j = -1     // current index
  }

}

//-------------------------------------- SELECTION SORT ----------------------------------------//

// Selection sort works by selecting the smallest element from
// an unsorted list and moving it to the front.

// We'll scan through all the items (from left to right) to find the smallest one ...
// ... and move it to the front.

function pSelect() {

  // make sure "Selection Sort" is still selected
  if (sortAlgo.value() != "Selection Sort") {
    return
  }

  // consider index 0 to be smallest, lets call it 't'
  j++ // increment current index ~ look through all the unsorted items

  // if current element < smallest element
  if (arrVal[j] < arrVal[t]) {
    // then update smallest index to be current index
    t = j
  }

  // repeat above across array, to find next smallest element
  if (j < arrVal.length) setTimeout(pSelect, sortSpeed.value())

  // otherwise, if last sorted index < array length
  else if (i < arrVal.length) {

    // swap smallest to last sorted index (front) i.e i
    swap(arrVal, i, t)

    i++   // increment last sorted index
    t = i // update smallest index to last sorted index
    j = i // reset current index to last sorted index

    // repeat process
    setTimeout(pSelect, sortSpeed.value())
  }
}

//-------------------------------------- INSERTION SORT ----------------------------------------//

// Insertion sort works by inserting elements from an unsorted list into
// a sorted subsection of the list, one item at a time.

function pInsert() {

  // make sure "Insertion Sort" is still selected
  if (sortAlgo.value() != "Insertion Sort") {
    return
  }

  // to begin with, there'd be no swaps
  f = false

  // move to the next index
  j++

  // from the above index value j, move towards the start of array
  for (i = j; i < arrVal.length - 1; i++) {

    // if the first element is greater than the second element
    if (arrVal[i] > arrVal[i + 1]) {

      // swap them
      f = true
      swap(arrVal, i, i + 1)
      break
    }
  }

  // repeat the above process until the end of the array
  if (i < arrVal.length - 1) {
    j = -1
    setTimeout(pInsert, sortSpeed.value())
  }
}

//-------------------------------------- MERGE SORT ----------------------------------------//

// Merge sort is a recursive algorithm that works like this :
// 1. split the input in half
// 2. sort each half by recursively using the same process
// 3. merge the sorted halves back together

// sorting of recursive halves is done by comparing the respective first elements
// the smaller of the two is (say) popped, so for the next comparison we dont include
// the popped element.

function pMerge(a) {

  // make sure "Merge Sort" is still selected
  if (sortAlgo.value() != "Merge Sort") {
    return
  }

  // we begin by making a copy of the original array
  copy = a.slice()

  // then we sort this copy, asynchronously...
  pMergeSlice(copy, 0, copy.length);
  return;
}

async function pMergeSlice(a, start, end) {

  // make sure "Merge Sort" is still selected
  if (sortAlgo.value() != "Merge Sort") {
    return
  }

  // if there is only one element left, return
  if (end - start <= 1)
    return;

  // find the mid point of current array
  var mid = Math.round((end + start) / 2);

  // slice the array at the mid, then wait until subarrays are sorted
  await pMergeSlice(a, start, mid);
  await pMergeSlice(a, mid, end);

  // merge divide
  i = start
  j = mid

  while (i < end && j < end) {
    if (a[i] > a[j]) {
      let t = a[j]; a.splice(j, 1); a.splice(i, 0, t);
      j++;
    }
    i++;
    if (i == j) j++;

    // copy back the current state of the subarray
    arrVal = a.slice();

    // slow down
    await sleep(sortSpeed.value());
  }

  // restart the process
  if (start == 0 && end == a.length) {
    await sleep(sortSpeed.value());
    f = true;
  }
}

//-------------------------------------- QUICK SORT ----------------------------------------//

// Quicksort works by dividing the input into two smaller lists:
// one with small items and the other with large items. Then, it recursively
// sorts both the smaller lists.

let states = []
async function pQuick(arr, start, end) {

  // return if only one element is left or "Quick Sort" is not selected
  if (start >= end || sortAlgo.value() != "Quick Sort") {
    return;
  }

  // first, we grab the last item in the list. We'll call this item the pivot.
  let index = await partition(arr, start, end);
  // using states array to visualize changes
  states[index] = -1;

  // recursively sorts both the smaller lists
  await Promise.all([
    pQuick(arr, start, index - 1),
    pQuick(arr, index + 1, end)
  ]);
}

async function partition(arr, start, end) {

  for (let i = start; i < end; i++) {
    states[i] = 1;
  }

  let pivotValue = arr[end];
  let pivotIndex = start;

  states[pivotIndex] = 0;

  // we'll scoot things around until everything less than the pivot
  // is to the left of the pivot, and everything greater than the pivot is to the right.

  // We call this "partitioning," since we're dividing the input list into two parts
  // (a smaller-than-the-pivot part and a larger-than-the-pivot part).

  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex);
      states[pivotIndex] = -1;
      pivotIndex++;
      states[pivotIndex] = 0;
    }
  }

  // having found element on either sides that don't belong there, we will swap them
  await swap(arr, pivotIndex, end);

  // update values in states array
  for (let i = start; i < end; i++) {
    if (i != pivotIndex) {
      states[i] = -1;
    }
  }

  // return pivot
  return pivotIndex;
}

//-------------------------------------- UTILITY FUNCTIONS -------------------------------------//

// function to perform
async function swap(arr, a, b) {
  await sleep(sortSpeed.value());
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

// function to emulate sleep
async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


