
let form=document.querySelector('form')
let inp=document.getElementById('list')
let subBtn=document.querySelector('.sub-btn')
let container=document.querySelector('.container')
let list=document.querySelector('ul')
let clearBtn=document.querySelector('.clear')
let pop=document.querySelector('.alert')

// edit option
let editElement,
    editFlag=false,
    editId='';

form.addEventListener('submit',addItem)
clearBtn.addEventListener('click',clearItems)
window.addEventListener('DOMContentLoaded',setupItem)

function addItem(e){
    e.preventDefault()

    let value=inp.value
    let id=new Date().getTime().toString()

    if(value && editFlag === false){
        createListItem(id,value)
        // add color
        say('item added','alert-success')
        container.classList.add('show-cont')

        // add to local storage
        addToLocalStorage(id,value)

        // set back to default
        setToDefault()
    }

    else if(value && editFlag === true){
       editElement.innerHTML=value
       say('value changed','alert-success')
        // edit local storage
       editLocalStorage(editId,value)
       setToDefault()
    }

    else{
        say('please enter value','alert-danger')

    }
    form.reset()
        
}

function say(text,action){
     pop.textContent=text
        pop.classList.add(action)
        setTimeout(()=>{
            pop.classList.remove(action)
        },2000) 
}

function deleteItem(e){
    const element=e.currentTarget.parentElement.parentElement;
    let id=element.dataset.id
    list.removeChild(element)
    say('item removed','alert-success')

    if(list.children.length===0){
        container.classList.remove('show-cont')
        say('list cleared','cleart')   
    }
    removeFromLocalStorage(id)
    setToDefault() 
}

function editItem(e){
    const element=e.currentTarget.parentElement.parentElement;

    // set edit item
    editElement=e.currentTarget.parentElement.previousElementSibling;
    inp.value=editElement.innerHTML;
    editFlag=true;
    editId=element.dataset.id
    subBtn.textContent='edit'
}

// set back to default
function setToDefault(){
    inp.value='';
    subBtn.textContent='submit'
    editFlag=false
    editId=''
}

function clearItems(){
    let items=document.querySelectorAll('.items')
    if(items.length > 0){
        items.forEach(item=>{
            list.removeChild(item)
        })
        container.classList.remove('show-cont')
        say('list cleared','cleart')
        localStorage.removeItem('list')
    }
}

// add to local storage
function addToLocalStorage(id,value){
    const grocery={id,value}
    console.log(grocery)

    let item=getLocalStorage()
    item.push(grocery)

    localStorage.setItem('list',JSON.stringify(item))   
}
// remove local storage
function removeFromLocalStorage(id){
    let item=getLocalStorage();

    item=item.filter((item)=> {
        if(item.id !== id){
            return item
        }
    })
    localStorage.setItem('list',JSON.stringify(item))
}
// edit local storage
function editLocalStorage(id,value){
    let item=getLocalStorage()
    item=item.map(item=>{
        if(item.id === id){
            item.value=value
        }
        return item
    })
    localStorage.setItem('list',JSON.stringify(item))
}

function getLocalStorage(){
    return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : []; 
}

function setupItem(){
    let item=getLocalStorage()

    if(item.length > 0){
        item.forEach(item=>{
            createListItem(item.id,item.value)
        })
        container.classList.add('show-cont')
    }
}

// THIS DISPLAYS THE ITEM IN THE DOM FROM LOCAL STORAGE
function createListItem(id,value){
    let li=document.createElement('li')
        li.classList.add('items')

        let attr=document.createAttribute('data-id')
        attr.value=id
        li.setAttributeNode(attr)

        li.innerHTML=`<p class='full'>${value}</p>
                    <div class="btn-cont">
                        <button class="edit-btn">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="del-btn">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>`;
        
        const deleteBtn=li.querySelector('.del-btn');
        const editBtn=li.querySelector('.edit-btn');

        deleteBtn.addEventListener('click',deleteItem);
        editBtn.addEventListener('click',editItem);
        
        // append child
        list.appendChild(li)
}