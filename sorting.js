let container = document.getElementById("array");
let message = document.getElementById("message");
let speedSlider = document.getElementById("speedSlider");
let speedValue = document.getElementById("speedValue");

// Function to generate a random array
function generateArray() {
    container.innerHTML = ""; // Clear the existing array
    message.innerText = ""; // Clear the message
    for (let i = 0; i < 20; i++) {
        let value = Math.ceil(Math.random() * 100);
        let array_ele = document.createElement("div");
        array_ele.classList.add("block");
        array_ele.style.height = `${value * 3}px`;
        array_ele.style.transform = `translate(${i * 30}px)`;
        let array_ele_label = document.createElement("label");
        array_ele_label.classList.add("block_id");
        array_ele_label.innerText = value;
        array_ele.appendChild(array_ele_label);
        container.appendChild(array_ele);
    }
}

// Function to get the current delay from the speed slider
function getDelay() {
    let speedValue = speedSlider.value;
    return 1000 - speedValue * 10; // Adjust this formula as needed
}

// Update the speed value display
speedSlider.addEventListener('input', () => {
    speedValue.innerText = speedSlider.value;
});

// Swap function with delay
function swap(el1, el2) {
    return new Promise((resolve) => {
        let temp = el1.style.transform;
        el1.style.transform = el2.style.transform;
        el2.style.transform = temp;
        window.requestAnimationFrame(function () {
            setTimeout(() => {
                container.insertBefore(el2, el1);
                resolve();
            }, getDelay());
        });
    });
}

// Bubble Sort
async function bubbleSort() {
    let blocks = document.querySelectorAll(".block");
    for (let i = 0; i < blocks.length; i++) {
        for (let j = 0; j < blocks.length - i - 1; j++) {
            blocks[j].style.backgroundColor = "#FF4949";
            blocks[j + 1].style.backgroundColor = "#FF4949";
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, getDelay())
            );
            let value1 = Number(blocks[j].childNodes[0].innerHTML);
            let value2 = Number(blocks[j + 1].childNodes[0].innerHTML);
            if (value1 > value2) {
                await swap(blocks[j], blocks[j + 1]);
                blocks = document.querySelectorAll(".block");
            }
            blocks[j].style.backgroundColor = "#6b5b95";
            blocks[j + 1].style.backgroundColor = "#6b5b95";
        }
        blocks[blocks.length - i - 1].style.backgroundColor = "#13CE66";
    }
    message.innerText = "Sorting Complete.";
}

// Insertion Sort
async function insertionSort() {
    let blocks = document.querySelectorAll(".block");
    for (let i = 1; i < blocks.length; i++) {
        let j = i - 1;
        let value = Number(blocks[i].childNodes[0].innerHTML);
        blocks[i].style.backgroundColor = "#FF4949";
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, getDelay())
        );
        while (j >= 0 && Number(blocks[j].childNodes[0].innerHTML) > value) {
            blocks[j].style.backgroundColor = "#FF4949";
            blocks[j + 1].style.height = blocks[j].style.height;
            blocks[j + 1].childNodes[0].innerText = blocks[j].childNodes[0].innerText;
            j--;
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, getDelay())
            );
            for (let k = i; k >= 0; k--) {
                blocks[k].style.backgroundColor = "#6b5b95";
            }
        }
        blocks[j + 1].style.height = `${value * 3}px`;
        blocks[j + 1].childNodes[0].innerText = value;
        blocks[i].style.backgroundColor = "#13CE66";
    }
    message.innerText = "Sorting Complete.";
}

// Hoare Partition for Quick Sort
async function hoarePartition(l, r) {
    let blocks = document.querySelectorAll(".block");
    let pivot = Number(blocks[l].childNodes[0].innerHTML);
    blocks[l].style.backgroundColor = "red";
    let i = l - 1;
    let j = r + 1;
    while (true) {
        do {
            i++;
            blocks[i].style.backgroundColor = "yellow";
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, getDelay())
            );
        } while (Number(blocks[i].childNodes[0].innerHTML) < pivot);
        do {
            j--;
            blocks[j].style.backgroundColor = "yellow";
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, getDelay())
            );
        } while (Number(blocks[j].childNodes[0].innerHTML) > pivot);
        if (i >= j) {
            for (let k = 0; k < 20; k++) blocks[k].style.backgroundColor = "#6b5b95";
            return j;
        }
        let temp1 = blocks[i].style.height;
        let temp2 = blocks[i].childNodes[0].innerText;
        blocks[i].style.height = blocks[j].style.height;
        blocks[j].style.height = temp1;
        blocks[i].childNodes[0].innerText = blocks[j].childNodes[0].innerText;
        blocks[j].childNodes[0].innerText = temp2;
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, getDelay())
        );
    }
}

// Quick Sort Helper
async function quickSortHelper(l, r) {
    if (l < r) {
        let pivotIdx = await hoarePartition(l, r);
        await quickSortHelper(l, pivotIdx);
        await quickSortHelper(pivotIdx + 1, r);
    }
}

// Quick Sort
async function quickSort() {
    await quickSortHelper(0, document.querySelectorAll(".block").length - 1);
    message.innerText = "Sorting Complete.";
}

// Selection Sort
async function selectionSort() {
    let blocks = document.querySelectorAll(".block");
    let n = blocks.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        blocks[minIndex].style.backgroundColor = "#FF4949"; // Highlight the current minimum

        for (let j = i + 1; j < n; j++) {
            blocks[j].style.backgroundColor = "#FF4949"; // Highlight the current block being compared

            await new Promise((resolve) => setTimeout(() => resolve(), getDelay()));

            let value1 = Number(blocks[minIndex].childNodes[0].innerText);
            let value2 = Number(blocks[j].childNodes[0].innerText);

            if (value2 < value1) {
                if (minIndex !== i) {
                    blocks[minIndex].style.backgroundColor = "#6b5b95"; // Reset previous minimum's color
                }
                minIndex = j;
            } else {
                blocks[j].style.backgroundColor = "#6b5b95"; // Reset non-minimum's color
            }
        }

        if (minIndex !== i) {
            // Swap the found minimum element with the first element
            let tempHeight = blocks[minIndex].style.height;
            let tempLabel = blocks[minIndex].childNodes[0].innerText;

            blocks[minIndex].style.height = blocks[i].style.height;
            blocks[minIndex].childNodes[0].innerText = blocks[i].childNodes[0].innerText;
            blocks[i].style.height = tempHeight;
            blocks[i].childNodes[0].innerText = tempLabel;

            blocks[minIndex].style.backgroundColor = "#6b5b95"; // Reset color after swap
        }

        blocks[i].style.backgroundColor = "#13CE66"; // Mark the sorted element
    }

    blocks[n - 1].style.backgroundColor = "#13CE66"; // Mark the last element as sorted
    message.innerText = "Sorting Complete.";
}

// Merge function for Merge Sort
async function merge(l, mid, r) {
    let blocks = document.querySelectorAll(".block");

    let leftSize = mid - l + 1;
    let rightSize = r - mid;

    let leftArray = [];
    let rightArray = [];

    for (let i = 0; i < leftSize; i++) {
        leftArray[i] = Number(blocks[l + i].childNodes[0].innerText);
        blocks[l + i].style.backgroundColor = "#FF4949"; // Mark left part
    }
    for (let j = 0; j < rightSize; j++) {
        rightArray[j] = Number(blocks[mid + 1 + j].childNodes[0].innerText);
        blocks[mid + 1 + j].style.backgroundColor = "#FF4949"; // Mark right part
    }

    await new Promise(resolve => setTimeout(resolve, getDelay()));

    let i = 0, j = 0, k = l;

    while (i < leftSize && j < rightSize) {
        if (leftArray[i] <= rightArray[j]) {
            blocks[k].style.height = `${leftArray[i] * 3}px`;
            blocks[k].childNodes[0].innerText = leftArray[i];
            i++;
        } else {
            blocks[k].style.height = `${rightArray[j] * 3}px`;
            blocks[k].childNodes[0].innerText = rightArray[j];
            j++;
        }
        blocks[k].style.backgroundColor = "#13CE66"; // Sorted elements
        k++;
        await new Promise(resolve => setTimeout(resolve, getDelay()));
    }

    while (i < leftSize) {
        blocks[k].style.height = `${leftArray[i] * 3}px`;
        blocks[k].childNodes[0].innerText = leftArray[i];
        blocks[k].style.backgroundColor = "#13CE66"; // Sorted elements
        i++;
        k++;
        await new Promise(resolve => setTimeout(resolve, getDelay()));
    }

    while (j < rightSize) {
        blocks[k].style.height = `${rightArray[j] * 3}px`;
        blocks[k].childNodes[0].innerText = rightArray[j];
        blocks[k].style.backgroundColor = "#13CE66"; // Sorted elements
        j++;
        k++;
        await new Promise(resolve => setTimeout(resolve, getDelay()));
    }
}

// Merge Sort
async function mergeSort(l, r) {
    if (l < r) {
        let mid = Math.floor((l + r) / 2);

        await mergeSort(l, mid);
        await mergeSort(mid + 1, r);
        await merge(l, mid, r);
    } else {
        let blocks = document.querySelectorAll(".block");
        blocks[l].style.backgroundColor = "#13CE66"; // Mark the sorted element
    }
    message.innerText = "Sorting Complete.";
}

// Start sorting based on the selected algorithm
function startSort() {
    let algorithm = document.getElementById("algorithm").value;
    switch (algorithm) {
        case "bubbleSort":
            bubbleSort();
            break;
        case "insertionSort":
            insertionSort();
            break;
        case "quickSort":
            quickSort();
            break;
        case "selectionSort":
            selectionSort();
            break;
        case "mergeSort":
            mergeSort(0, document.querySelectorAll(".block").length - 1);
            break;
        default:
            bubbleSort();
            break;
    }
}

generateArray();
