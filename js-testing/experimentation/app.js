// console.log('app.js connected')
// console.table({a: 1, b: 2, c: 3})
// console.error('Error: Something went wrong.')
// console.warn('Warning! Something might go wrong.')
// console.time('Done!')
//     console.log('Go!')
//     console.log('Timing...')
//     console.log('Timing...')
//     console.log('Timing...')
//     console.log('Timing...')
// console.timeEnd('Done!')


// console.log(document.getElementById('header'))
// console.log(document.getElementById('header').id)

var header = document.getElementById('header')

// header.style.backgroundColor = '#AAA'
// header.style.display = 'none'
// header.textContent = 'New Header'
// header.innerText = 'Inner Text'
// header.innerHTML = '<h2>Inner HTML</h2>'

//console.log(header)


var query;

// # to select by ID
query = document.querySelector('#header')

// . for classes, only get the first instance of that class
query = document.querySelector('.big-text')

// for tags, but only gets the first instance of that tag
query = document.querySelector('h1')

// console.log(query)


var mutliSelect;

multiSelect = document.getElementsByClassName('big-text')
multiSelect = document.getElementsByTagName('h1')

// console.log(multiSelect)

var converted = Array.from(multiSelect)

// console.log(converted)

// querySelectorAll returns a nodelist, can use most array methods on it
var all;
all = document.querySelectorAll('h1')
all = document.querySelectorAll('h1.big-text')
// console.log(all)
all.forEach((item) => {
    // console.log(item)
})

const h1odd = document.querySelectorAll('h1:nth-child(odd')
h1odd.forEach((h1) => {
    h1.style.color = 'orange'
})


const div = document.querySelector('div')
// console.log(div)
// console.log(div.children)

// console.log(div.children[0].parentElement)
// console.log(div.children[0].parentElement.parentElement)

// console.log(div.children[0].nextElementSibling) // gets to children[1]
// console.log(div.children[0].nextElementSibling.nextElementSibling) // gets children[2]
// console.log(div.children[0].nextElementSibling.previousElementSibling) // goes right back to children[0]

const newHeader = document.createElement('h1')
newHeader.className = 'big-text'
newHeader.id = 'header-5'
newHeader.setAttribute('title', '5th Header')
newHeader.appendChild(document.createTextNode('Second Header of Second Div'))
const link = document.createElement('h1')
link.className = 'big-text'
//link.innerHTML="<a href='https://google.ca' target='_blank'> Google</a>"
newHeader.appendChild(link)
document.getElementById('div-2').appendChild(newHeader)

// console.log(newHeader)
// console.log(newHeader.hasAttribute('title'))

const newNewHeader = document.createElement('h1')
newNewHeader.className = 'big-text'
newNewHeader.id = 'header-1-new'
newNewHeader.setAttribute('title', '1st Header New')
newNewHeader.appendChild(document.createTextNode('New First Header'))
const div1 = document.getElementById('div-1')

div1.replaceChild(newNewHeader, document.getElementById('header'))

div1.children[1].remove()


document.querySelector('#header-4').addEventListener('click', () => {
    console.log('clicked')
})

document.querySelector('#header-3').addEventListener('mouseover', (event) => {
    console.log('moused over header-3')
    event.preventDefault()
})

const onClick = (event) => {
    //console.log('clicked header 5')
    // console.log(event.target)
    event.target.style.color = 'orange'
    event.target.innerText = 'Clicked'
}

const onDblClick = (event) => {
    //console.log('clicked header 5')
    // console.log(event.target)
    event.target.style.color = 'orange'
    event.target.innerText = 'Double Clicked'
}

document.querySelector('#header-5').addEventListener('click', onClick)
document.querySelector('#header-4').addEventListener('dblclick', onDblClick)
document.querySelector('div').addEventListener('mousemove', (event) => {
    //console.log(`mousemove: ${event.offsetX}, ${event.offsetY}`)
    event.target.style.backgroundColor = `rgb(${event.offsetX}, 0, ${event.offsetY * 10})`
})



/* ----- Async ----- */

document.getElementById('get-data').addEventListener('mousedown', fetchExternal)

function getData() {
    console.log('getting data')
    const xhr = new XMLHttpRequest()
    xhr.open('GET', 'data.txt', true)
    xhr.onload = function() {
        console.log('onload status: ', this.status)
        if (this.status === 200) {
            console.log(this.responseText)
        }
    }
    xhr.send()
}

// Using Ajax & JSON
function getCustomer(event) {
    xhr = new XMLHttpRequest()
    xhr.open('GET', 'customer.json', true)
    xhr.onload = function() {
        if (this.status === 200) {
            console.log(this.responseText)
            const parsed = JSON.parse(this.responseText)
            console.log(parsed)
        }
    }
    xhr.send()
}

// Using fetch
function fetchData() {
    fetch('data.txt')
    .then((response) => {
        return(response.text())
        .then((text) => {
            console.log(text)
        })
    })
}

// fetching JSON
function fetchJSON() {
    fetch('customer.json')
    .then((response) => {
        //console.log(response.json())
        return response.json()
        .then((customers) => {
            console.log(customers)
        })  
    })
}

// fetch from external api
function fetchExternal() {
    fetch('https://api.github.com/users')
    .then((response) => {
        console.log(response)
        return response.json()
        .then((users) => {
            console.log(users)
        })  
    })
}


const aSet = new Set()

aSet.add(1)
aSet.add('String')
aSet.add({key: "value"})
aSet.add(1)
aSet.add({key: "value"})

//console.log(aSet.size)
// console.log(aSet)

aSet.delete('String')
// console.log(aSet)

console.log(aSet)
for (let item of aSet) {
    aSet.add(item)
}
console.log(aSet)
