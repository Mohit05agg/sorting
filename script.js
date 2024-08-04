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
    message.innerText = "I hope now you have understood the implementation.";
}

async function insertionSort(delay = 100) {
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
    message.innerText = "I hope now you have understood the implementation.";
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
    message.innerText = "I hope now you have understood the implementation.";
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
        default:
            bubbleSort();
            break;
    }
}

generateArray();
