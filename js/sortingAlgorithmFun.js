class SortingArray{

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

    constructor() {
        this.array = SortingArray._generateArray(50);
        this.numComparisons = 0;
        this.numSwaps = 0;
    }

    
}

let newArray = new SortingArray();

let arrayDiv = document.getElementById("arrayContainer");