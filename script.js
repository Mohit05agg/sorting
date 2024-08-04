let container = document.getElementById("array");
let message = document.getElementById("message");

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


function swap(el1, el2) {
    return new Promise((resolve) => {
        let temp = el1.style.transform;
        el1.style.transform = el2.style.transform;
        el2.style.transform = temp;
        window.requestAnimationFrame(function () {
            setTimeout(() => {
                container.insertBefore(el2, el1);
                resolve();
            }, 250);
        });
    });
}

async function bubbleSort(delay = 100) {
    let blocks = document.querySelectorAll(".block");
    for (let i = 0; i < blocks.length; i++) {
        for (let j = 0; j < blocks.length - i - 1; j++) {
            blocks[j].style.backgroundColor = "#FF4949";
            blocks[j + 1].style.backgroundColor = "#FF4949";
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
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

async function insertionSort(delay = 300) {
    let blocks = document.querySelectorAll(".block");
    for (let i = 1; i < blocks.length; i++) {
        let j = i - 1;
        let value = Number(blocks[i].childNodes[0].innerHTML);
        blocks[i].style.backgroundColor = "#FF4949";
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, delay)
        );
        while (j >= 0 && Number(blocks[j].childNodes[0].innerHTML) > value) {
            blocks[j].style.backgroundColor = "#FF4949";
            blocks[j + 1].style.height = blocks[j].style.height;
            blocks[j + 1].childNodes[0].innerText = blocks[j].childNodes[0].innerText;
            j--;
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
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

async function hoarePartition(l, r, delay = 100) {
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
                }, delay)
            );
        } while (Number(blocks[i].childNodes[0].innerHTML) < pivot);
        do {
            j--;
            blocks[j].style.backgroundColor = "yellow";
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
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
            }, delay)
        );
    }
}

async function quickSortHelper(l, r, delay = 100) {
    if (l < r) {
        let pivotIdx = await hoarePartition(l, r);
        await quickSortHelper(l, pivotIdx);
        await quickSortHelper(pivotIdx + 1, r);
    }
}

async function quickSort(delay = 100) {
    await quickSortHelper(0, document.querySelectorAll(".block").length - 1, delay);
    message.innerText = "Sorting Complete.";
}

async function binarySearch(delay = 100) {
    let blocks = document.querySelectorAll(".block");
    let num = Number(document.getElementById("searchNumber").value); // Convert input to a number
    let message = document.getElementById("message");
    message.innerText = "";

    for (let i = 0; i < blocks.length; i++) {
        blocks[i].style.backgroundColor = "#6b5b95"; // Reset block colors
    }

    let start = 0;
    let end = blocks.length - 1;
    let found = false;

    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        let midValue = Number(blocks[mid].childNodes[0].innerText); // Convert block label to number

        blocks[mid].style.backgroundColor = "#FF4949"; // Highlight mid block

        await new Promise((resolve) => setTimeout(() => resolve(), delay));

        if (midValue === num) { // Use strict equality
            blocks[mid].style.backgroundColor = "#13CE66"; // Mark block as found
            message.innerText = "Element found!";
            found = true;
            break;
        } else if (midValue < num) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }

        blocks[mid].style.backgroundColor = "#6b5b95"; // Reset color if not found
    }

    if (!found) {
        message.innerText = "Element not found!";
    }
}

async function linearSearch(delay = 300) {
    let blocks = document.querySelectorAll(".block");
    let num = Number(document.getElementById("searchNumber").value);
    let message = document.getElementById("message");
    message.innerText = "";

    for (let i = 0; i < blocks.length; i++) {
        blocks[i].style.backgroundColor = "#6b5b95"; // Reset block colors
    }

    let found = false;
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].style.backgroundColor = "#FF4949"; // Highlight current block

        await new Promise((resolve) => setTimeout(() => resolve(), delay));

        let value = Number(blocks[i].childNodes[0].innerText);
        if (value === num) {
            blocks[i].style.backgroundColor = "#13CE66"; // Mark block as found
            message.innerText = "Element found!";
            found = true;
            break;
        } else {
            blocks[i].style.backgroundColor = "#6b5b95"; // Reset color if not found
        }
    }

    if (!found) {
        message.innerText = "Element not found!";
    }
}


async function selectionSort(delay = 300) {
    let blocks = document.querySelectorAll(".block");
    let n = blocks.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        blocks[minIndex].style.backgroundColor = "#FF4949"; // Highlight the current minimum

        for (let j = i + 1; j < n; j++) {
            blocks[j].style.backgroundColor = "#FF4949"; // Highlight the current block being compared

            await new Promise((resolve) => setTimeout(() => resolve(), delay));

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


async function merge(l, mid, r, delay = 100) {
    let blocks = document.querySelectorAll(".block");
    let leftSize = mid - l + 1;
    let rightSize = r - mid;
    
    // Create temporary arrays
    let leftArray = new Array(leftSize);
    let rightArray = new Array(rightSize);
    
    // Copy data to temp arrays leftArray[] and rightArray[]
    for (let i = 0; i < leftSize; i++) {
        leftArray[i] = blocks[l + i].style.height;
        blocks[l + i].style.backgroundColor = "#FF4949"; // Mark left part
    }
    for (let j = 0; j < rightSize; j++) {
        rightArray[j] = blocks[mid + 1 + j].style.height;
        blocks[mid + 1 + j].style.backgroundColor = "#FF4949"; // Mark right part
    }

    await new Promise((resolve) => setTimeout(resolve, delay));
    
    let i = 0, j = 0, k = l;

    // Merge the temp arrays back into blocks[]
    while (i < leftSize && j < rightSize) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        
        if (parseInt(leftArray[i]) <= parseInt(rightArray[j])) {
            blocks[k].style.height = leftArray[i];
            i++;
        } else {
            blocks[k].style.height = rightArray[j];
            j++;
        }
        blocks[k].style.backgroundColor = "#13CE66"; // Sorted elements
        k++;
    }

    // Copy the remaining elements of leftArray[], if there are any
    while (i < leftSize) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        blocks[k].style.height = leftArray[i];
        blocks[k].style.backgroundColor = "#13CE66"; // Sorted elements
        i++;
        k++;
    }

    // Copy the remaining elements of rightArray[], if there are any
    while (j < rightSize) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        blocks[k].style.height = rightArray[j];
        blocks[k].style.backgroundColor = "#13CE66"; // Sorted elements
        j++;
        k++;
    }
}

// Asynchronous MergeSort function
async function mergeSort(l, r, delay = 100) {
    if (l >= r) return;

    let mid = Math.floor((l + r) / 2);
    await mergeSort(l, mid, delay);
    await mergeSort(mid + 1, r, delay);
    await merge(l, mid, r, delay);
    message.innerText = "Sorting Complete.";
}

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
        case "binarySearch":
            binarySearch();
            break;
        case "linearSearch":
            linearSearch();
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






