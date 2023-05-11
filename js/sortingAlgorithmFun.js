class SortingArray{

    
    static pxHeight = 200 / 500;

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

    render() {
        let parent = document.getElementById("arrayContainer");
        var child;
            parent.innerHTML = "";
            for (const element of this.array) {
                child = document.createElement("div");
                child.setAttribute('id', element.toString());
                parent.appendChild(child);
                child.style.height = `${element * SortingArray.pxHeight }px`;
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
        this.render();
        endTime = new Date();
        timeDiff = endTime - startTime; 

        timeEle = document.getElementById('bubbleSortTime');
        numCompareEle = document.getElementById('bubbleSortnumComparisons');
        numSwapEle = document.getElementById('bubbleSortNumSwaps');

        timeEle.innerHTML = `Time: ${timeDiff} Ms`;
        numCompareEle.innerHTML = `Number of Comparisons: ${this.numComparisons}`;
        numSwapEle.innerHTML = `Number of swapped values ${this.numSwaps}`;
    }


}


let newArray = new SortingArray(500);
newArray.render();
let bubbleSortButton = document.getElementById('bubbleSortButton');
let bubbleSortReset = document.getElementById('bubbleSortReset');

bubbleSortButton.addEventListener('click', () => newArray.bubbleSort());
bubbleSortReset.addEventListener('click', () => {
    newArray = new SortingArray(500);
    newArray.render();
});