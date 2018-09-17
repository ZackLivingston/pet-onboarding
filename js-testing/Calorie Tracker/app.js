// Item Controller
const ItemCtrl = (function() {
    const Item = function(id, name, calories) {
        this.id = id
        this.name = name
        this.calories = calories
    }

    function getItems() {
        const items = JSON.parse(localStorage.getItem('tasks'))
        if (items && items.length > 0) {
            return items
        } else {
            return []
        }
    } 

    // state
    const state = {
        items: getItems(),
        currentItem: null,
        totalCalories: 0
    }

    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(state.items))
    }

    return {
        logState: () => state,
        getItems,
        addItem: (name, calories) => {
            if (state.items.length === 0) {
                var id = 0
            } else {
                var id = state.items[state.items.length - 1].id + 1
            }
            state.items.push({id, name, calories})
            UICtrl.addItem(id, name, calories)
            updateLocalStorage()
        },
        clearFood: (id) => {
            const newItems = state.items.filter((item) => item.id != id)
            state.items = newItems
            UICtrl.addItems(state.items)
            updateLocalStorage()
        },
        updateItem: (id, name, calories) => {
            state.items.forEach((item) => {
                console.log(item)
                if (item.id == id) {
                    item.name = name
                    item.calories = calories
                }
            })
            console.log(state.items)
            UICtrl.addItems(state.items)
            updateLocalStorage()
        },
        submitFood(event) {
            event.preventDefault()
            if (inputForm.children[4].style.display !== 'none') {
                ItemCtrl.addItem(inputFood.value, inputCalories.value)
            }
        }
    }
})()

const UICtrl = (function() {
    itemList = document.getElementById('item-list')
    inputCard = document.getElementById('input-card')
    calorieCounter = document.getElementById('total-calories')
    submit = document.getElementById('submit')
    update = document.getElementById('update')
    update.addEventListener('mouseup', updateItem)
    back = document.getElementById('back')
    back.addEventListener('mouseup', exitEditState)
    deleteItem = document.getElementById('delete')
    deleteItem.addEventListener('mouseup', clearFood)
    clear = document.getElementById('clear')
    clear.addEventListener('mouseup', clearAll)

    const state = {
        id: null
    }

    function clearInput() {
        inputFood.value = ''
        inputCalories.value = ''
    }

    function addItems(items) {
        items.forEach((item) => {
            addItem(item.id, item.name, item.calories)
        })
    }

    function editState(target) {
        const elements = target.parentElement.children
        inputFood.value = elements[0].innerText
        inputCalories.value = elements[1].innerText
        update.style.display = 'inline'
        deleteItem.style.display = 'inline'
        back.style.display = 'inline'
        submit.style.display = 'none'
        state.id = target.parentElement.id
    }

    function exitEditState() {
        clearInput()
        update.style.display = 'none'
        deleteItem.style.display = 'none'
        back.style.display = 'none'
        submit.style.display = 'inline'
    }

    function addItem(id, food, calories) {
        clearInput()
        const name = document.createElement('h4')
        name.className = 'list-item-text'
        name.innerText = food
        const itemCalories = document.createElement('h4')
        itemCalories.innerText = calories
        itemCalories.className = 'list-item-text'
        const edit = document.createElement('h4')
        edit.className = 'list-item-text'
        edit.innerText = 'Edit'

        const listItem = document.createElement('div')
        listItem.className = 'list-item'
        listItem.id = id
        listItem.appendChild(name)
        listItem.appendChild(itemCalories)
        listItem.appendChild(edit)
        listItem.addEventListener('click', (event) => {
            if (event.target === edit) {
                editState(event.target)
            }
        })

        itemList.appendChild(listItem)

        updateCalories()
    }

    function updateCalories() {
        let count = 0
        Array.from(itemList.children).forEach((child) => {
            count = count + parseInt(child.children[1].innerText)
        })
        calorieCounter.innerText = `Total Calories: ${count}`
    }

    function clearFood() {
        itemList.innerHTML = ''
        const id = state.id
        ItemCtrl.clearFood(id)
        exitEditState()
    }

    function clearAll() {
        itemList.innerHTML = ''
        localStorage.setItem('tasks', JSON.stringify([]))
        updateCalories()
    }

    function updateItem() {
        itemList.innerHTML = ''
        const id = state.id
        ItemCtrl.updateItem(id, inputFood.value, inputCalories.value)
        exitEditState()
    }

    return({
        addItems, addItem
    })

})()

// App Controller
const App = (function(ItemCtrl, UICtrl) {
    return {
        init: () => {
            const items = ItemCtrl.getItems()
            UICtrl.addItems(items)
        }
    }
})(ItemCtrl, UICtrl)


// basic variable setup
const inputFood = document.getElementById('input-food')
const inputCalories = document.getElementById('input-calories')
const inputForm = document.getElementById('input-form')
inputForm.addEventListener('submit', ItemCtrl.submitFood)



// Start App
App.init()
