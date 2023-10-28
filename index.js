const todoNameInput = document.querySelector('.todo-name-input');
const todoMobileInput = document.querySelector('.todo-mobile-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list')
let selectBox = document.querySelector('.type-todo')
const filterOption = document.querySelector('.filter-todo')

// function creatElement
function generattElement(tagName, attribute, ...childs) {
    const element = document.createElement(tagName)
    if (attribute) {
        Object.keys(attribute).forEach(key => {
            element.setAttribute(key, attribute[key]);
        })
    }
    if (childs) {
        childs.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild((document.createTextNode(child)))
            } else {
                element.appendChild(child)
            }
        })
    }
    return element
}
//add phone
todoButton.addEventListener('click', additem)
//remove phone
todoList.addEventListener("click", removePhone);
//filter options
filterOption.addEventListener('click', filterContacts)
//local storeg ALl
//document.addEventListener('DOMContentLoaded', getContact)

//add Item
function additem(event) {
    event.preventDefault()
    const todoDiv = generattElement('div', { class: 'todo' },
        generattElement('li', { class: 'todoItem' },
            generattElement('span', null, todoNameInput.value),
            generattElement('span', null, todoMobileInput.value),
            generattElement('span', null, selectBox.options[selectBox.selectedIndex].innerText)
        ),
        generattElement('button', { class: 'trashButton' }, 'X')

    )
    saveLocalContact({
        name: todoNameInput.value,
        mobileNumber: todoMobileInput.value,
        type: selectBox.options[selectBox.selectedIndex].innerText
    })
    todoNameInput.value = ''
    todoMobileInput.value = '';
    filterOption.style.display = 'flex';
    todoDiv.classList.add(selectBox.options[selectBox.selectedIndex].value)


    // append div to ul
    todoList.appendChild(todoDiv)
}
//remove contact
function removePhone(event) {
    item = event.target

    if (item.classList[0] === 'trashButton') {
        let contact = item.parentElement;
        console.log(contact)
        contact.classList.add('fall')
        setTimeout(() => {
            contact.remove()
        }, 1000);
        removeLocalContact(contact)
    }

}
//filter 
function filterContacts(event) {
    const contacts = todoList.childNodes;
    //console.log(contacts)
    // console.log(event.target.value)
    contacts.forEach(contact => {
        switch (event.target.value) {
            case '2':
                contact.style.display = 'flex';
                break;
            case "1":
                if (contact.classList.contains('1')) {
                    contact.style.display = "flex";
                } else {
                    contact.style.display = "none"
                }
                break;
            case "0":
                if (!contact.classList.contains('1')) {
                    contact.style.display = "flex";
                } else {
                    contact.style.display = "none"
                }
                break;
            default:
                break;
        }
    });
}
//add &save localStorage
function saveLocalContact(contact) {
    // console.log(contact)
    let contacts;
    if (localStorage.getItem('contacts') === null) {
        contacts = []
    } else {
        contacts = JSON.parse(localStorage.getItem('contacts'))
    }
    contacts.push(contact)
    localStorage.setItem('contacts', JSON.stringify(contacts))
}
//remove localStorage
function removeLocalContact(contact) {
    console.log(contact)
    let contacts;
    if (localStorage.getItem('contacts') === null) {
        contacts = []
    } else {
        contacts = JSON.parse(localStorage.getItem("contacts"))
    }

    let result = contact.childNodes[0].innerHTML.split('</span>')
    let number = result[1].match(/\d/g).join('')
    let index = contacts.findIndex(item => item.number)
    // console.log(contacts)
    contacts.splice(index, 1)
    // console.log(contacts)
    localStorage.setItem('contacts', JSON.stringify(contacts))
}


