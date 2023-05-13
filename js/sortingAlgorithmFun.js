class SortingArray{

    
    static numEles = 500;

    static _shuffleArray(array) {
        let j = 0;
        let temp = 0;
        for (let i = 0; i < array.length; i++){
            j = Math.floor(Math.random() * array.length);
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    static _generateArray(num) {
        let outputArray = [];
        for (let i = 0; i < num; i++) {
            outputArray.push(i);
        }
        outputArray = SortingArray._shuffleArray(outputArray);
        return outputArray;
    }

    constructor(num) {
        this.array = SortingArray._generateArray(num);
        this.numComparisons = 0;
        this.numSwaps = 0;
    }

    static getPxHeight() {
        return 200 / SortingArray.numEles;
    }

    render(container) {
        let parent = document.getElementById(container);
        var child;
            parent.innerHTML = "";
            for (const element of this.array) {
                child = document.createElement("div");
                child.setAttribute('id', element.toString());
                parent.appendChild(child);
                child.style.height = `${element * SortingArray.getPxHeight() }px`;
            }
    }

    swap(index1, index2) {
        this.numSwaps++;
        let temp = this.array[index1];
        this.array[index1] = this.array[index2];
        this.array[index2] = temp;
    }

    compare(index1, index2) {
        this.numComparisons++;
        return this.array[index2]-this.array[index1];
    }
    
    bubbleSortPass(numPasses) {
        let sorted = true;
        for (let i = 0; i < this.array.length - (numPasses + 1); i++) {
            if (this.compare(i, i+1) < 0) {
                this.swap(i, i+1);
                sorted = false;
            }
        }
        return sorted;
    }



    bubbleSort() {
        let sorted = false;
        let numPasses = 0;
        let startTime = new Date()
        var endTime;
        var timeDiff;
        var timeEle;
        var numCompareEle;
        var numSwapEle;

        while (!sorted) {
            sorted = this.bubbleSortPass(numPasses);
            numPasses++;

        }

        endTime = new Date();
        timeDiff = endTime - startTime; 

        timeEle = document.getElementById('bubbleSortTime');
        numCompareEle = document.getElementById('bubbleSortnumComparisons');
        numSwapEle = document.getElementById('bubbleSortNumSwaps');

        timeEle.innerHTML = `Time: ${timeDiff} miliseconds`;
        numCompareEle.innerHTML = `Number of Comparisons: ${this.numComparisons}`;
        numSwapEle.innerHTML = `Number of swapped values ${this.numSwaps}`;
        this.render("bubbleContainer");
    }

    partition(lowIndex, highIndex) {
        let mid = Math.floor((lowIndex + highIndex) / 2);
        let pivot = this.array[mid];
    
        //iterating through the part of the array from low to high
    
        let nextLow = lowIndex;
    
        for (let ele = lowIndex; ele <= highIndex; ele++) {
            // console.log('pivot equals: ' + pivot);
            //(this.compare(ele, mid) < 0);
            this.numComparisons += 1;
            if (this.array[ele] < pivot){
                // console.log('element ' + numbers[ele] + ' is less than pivot');
                //if number is less than pivor put on left side of array
                // console.log('\n\n   before swap: ' + numbers);
                //[this.array[nextLow], this.array[ele]] = [this.array[ele], this.array[nextLow]];
                this.swap(nextLow, ele);    
                // console.log('\n\n   after swap: ' + numbers);
    
                nextLow++;   
            } else {
                // console.log('element ' + numbers[ele] + ' is greater than pivot');
            }
    
        }
        // console.log(numbers);
        // console.log(pivot);
        let pivotIndex = this.array.indexOf(pivot);
        // console.log('pivotIndex =' + pivotIndex);
    
        [this.array[nextLow], this.array[pivotIndex]] = [this.array[pivotIndex], this.array[nextLow]];
        // console.log('partition numbers ' + numbers);
    
        return nextLow;
    }
    
    
    
    quickSort(lowIndex, highIndex) {
    
        if (lowIndex >= highIndex) {
            return;
        }
        
        let pivotIndex = this.partition(lowIndex, highIndex);
    
    
        //sorting left side
        this.quickSort(lowIndex, pivotIndex);


        
        //sorting right side
        this.quickSort(pivotIndex + 1, highIndex);

    }

    selectionSort() {
        let numPasses = 0;
        var max;
        for (let j = 0; j < this.array.length; j++) {

        
            for (let i = 0; i < this.array.length -numPasses; i++) {
                let max = 0;
                if (this.compare(max, i) > 0) {
                    max = i;
                }
            }
            numPasses++;
            this.swap(max, (this.array.length - numPasses - 1));
        }
    }
}

//bubble sort dom modification
let bubbleArray = new SortingArray(SortingArray.numEles);
bubbleArray.render("bubbleContainer");
let bubbleSortButton = document.getElementById('bubbleSortButton');
let bubbleSortReset = document.getElementById('bubbleSortReset');

bubbleSortButton.addEventListener('click', () => bubbleArray.bubbleSort());
bubbleSortReset.addEventListener('click', () => {
    bubbleArray = new SortingArray(SortingArray.numEles);
    bubbleArray.render("bubbleContainer");
});

//quicksort dom modification
let quickSortArray = new SortingArray(SortingArray.numEles);
quickSortArray.render("quickContainer");
let quickSortButton = document.getElementById('quickSortButton');
let quickSortReset = document.getElementById('quickSortReset');

quickSortButton.addEventListener('click', () => {
    let startTime = new Date();
    
    quickSortArray.quickSort(0,SortingArray.numEles);
    quickSortArray.render("quickContainer");
    endTime = new Date();
    timeDiff = endTime - startTime; 

    let timeEle = document.getElementById('quickSortTime');
    numCompareEle = document.getElementById('quickSortnumComparisons');
    numSwapEle = document.getElementById('quickSortNumSwaps');

    timeEle.innerHTML = `Time: ${timeDiff} miliseconds`;
    numCompareEle.innerHTML = `Number of Comparisons: ${quickSortArray.numComparisons}`;
    numSwapEle.innerHTML = `Number of swapped values ${quickSortArray.numSwaps}`;
});
quickSortReset.addEventListener('click', () => {
    quickSortArray = new SortingArray(SortingArray.numEles);
    quickSortArray.render("quickContainer");
});

//selection sort dom modification
let selectionSortArray = new SortingArray(SortingArray.numEles);
selectionSortArray.render("selectionContainer");
let selectionSortButton = document.getElementById('selectionSortButton');
let selectionSortReset = document.getElementById('selectionSortReset');

selectionSortButton.addEventListener('click', () => {
    let selectionStartTime = new Date();
    
    selectionSortArray.selectionSort(0,SortingArray.numEles);
    console.log(selectionSortArray);
    selectionSortArray.render("selectionContainer");
    quickSortArray.render("quickContainer");
    let selectionEndTime = new Date();
    let selectionTimeDiff = selectionEndTime - selectionStartTime; 

    let selectionTimeEle = document.getElementById('selectionSortTime');
    let selectionNumCompareEle = document.getElementById('selectionSortnumComparisons');
    let selectionNumSwapEle = document.getElementById('selectionSortNumSwaps');

    selectionTimeEle.innerHTML = `Time: ${timeDiff} miliseconds`;
    selectionNumCompareEle.innerHTML = `Number of Comparisons: ${selectionSortArray.numComparisons}`;
    selectionNumSwapEle.innerHTML = `Number of swapped values ${selectionSortArray.numSwaps}`;
});
selectionSortReset.addEventListener('click', () => {
    selectionSortArray = new SortingArray(SortingArray.numEles);
    selectionSortArray.render("selectionContainer");
});