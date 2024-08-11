document.getElementById('algorithm').addEventListener('change', function() {
    const searchNumberInput = document.getElementById('searchNumber');
    if (this.value) {
        searchNumberInput.style.display = 'block';
        generateArray(this.value === 'binarySearch');
    } else {
        searchNumberInput.style.display = 'none';
    }
});

function generateArray(sort = false) {
    const arrayContainer = document.getElementById('array');
    arrayContainer.innerHTML = '';
    const arraySize = 20;
    const array = [];

    for (let i = 0; i < arraySize; i++) {
        const value = Math.floor(Math.random() * 100);
        array.push(value);
    }

    if (sort) {
        array.sort((a, b) => a - b);
    }

    for (let i = 0; i < array.length; i++) {
        const value = array[i];
        const arrayElement = document.createElement('div');
        arrayElement.classList.add('block');
        arrayElement.style.height = `${value * 3}px`;
        arrayElement.style.transform = `translateX(${i * 30}px)`;

        const arrayLabel = document.createElement('label');
        arrayLabel.classList.add('block_id');
        arrayLabel.innerText = value;

        arrayElement.appendChild(arrayLabel);
        arrayContainer.appendChild(arrayElement);
    }
}

function swap(el1, el2) {
    return new Promise(resolve => {
        const style1 = window.getComputedStyle(el1);
        const style2 = window.getComputedStyle(el2);

        const transform1 = style1.getPropertyValue('transform');
        const transform2 = style2.getPropertyValue('transform');

        el1.style.transform = transform2;
        el2.style.transform = transform1;

        window.requestAnimationFrame(function() {
            setTimeout(() => {
                const container = el1.parentNode;
                container.insertBefore(el2, el1);
                resolve();
            }, 250);
        });
    });
}

async function bubbleSort(delay = 100) {
    const blocks = document.querySelectorAll('.block');
    for (let i = 0; i < blocks.length - 1; i++) {
        for (let j = 0; j < blocks.length - i - 1; j++) {
            blocks[j].style.backgroundColor = '#FF4949';
            blocks[j + 1].style.backgroundColor = '#FF4949';

            await new Promise(resolve => setTimeout(resolve, delay));

            const value1 = parseInt(blocks[j].childNodes[0].innerHTML);
            const value2 = parseInt(blocks[j + 1].childNodes[0].innerHTML);

            if (value1 > value2) {
                await swap(blocks[j], blocks[j + 1]);
                blocks = document.querySelectorAll('.block');
            }

            blocks[j].style.backgroundColor = '#6b5b95';
            blocks[j + 1].style.backgroundColor = '#6b5b95';
        }
        blocks[blocks.length - 1 - i].style.backgroundColor = '#13CE66';
    }
    blocks[0].style.backgroundColor = '#13CE66';
}

async function binarySearch(delay = 100) {
    const blocks = document.querySelectorAll('.block');
    const searchNumber = parseInt(document.getElementById('searchNumber').value);

    let start = 0;
    let end = blocks.length - 1;
    let found = false;

    while (start <= end) {
        const mid = Math.floor((start + end) / 2);
        blocks[mid].style.backgroundColor = '#FF4949';

        await new Promise(resolve => setTimeout(resolve, delay));

        const value = parseInt(blocks[mid].childNodes[0].innerHTML);
        if (value === searchNumber) {
            blocks[mid].style.backgroundColor = '#13CE66';
            found = true;
            break;
        } else if (value < searchNumber) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
        blocks[mid].style.backgroundColor = '#6b5b95';
    }

    document.getElementById('message').innerText = found ? 'Element Found' : 'Element Not Found';
}

function startSearch() {
    const algorithm = document.getElementById('algorithm').value;
    const speed = document.getElementById('speedSlider').value;
    
    // Map slider value to delay range (e.g., 10ms to 500ms)
    const minDelay = 10; // minimum delay for fast speed
    const maxDelay = 500; // maximum delay for slow speed
    const delay = maxDelay - (speed / 100) * (maxDelay - minDelay);

    if (algorithm === 'linearSearch') {
        linearSearch(delay);
    } else if (algorithm === 'binarySearch') {
        binarySearch(delay);
    }
}

async function linearSearch(delay = 100) {
    const array = document.querySelectorAll('.block');
    const searchNumber = parseInt(document.getElementById('searchNumber').value);
    let found = false;
    for (let i = 0; i < array.length; i++) {
        array[i].style.backgroundColor = '#FF4949';
        await new Promise(resolve => setTimeout(resolve, delay));
        const value = parseInt(array[i].childNodes[0].innerHTML);
        if (value === searchNumber) {
            array[i].style.backgroundColor = '#13CE66';
            found = true;
            break;
        }
        array[i].style.backgroundColor = '#6b5b95';
    }
    document.getElementById('message').innerText = found ? 'Element Found' : 'Element Not Found';
}
