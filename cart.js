
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

function addItem(e){
    e.preventDefault()

    let value=inp.value
    
    let id=new Date().getTime().toString()


    if(value && editFlag === false){
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

        // add color
        say('item added','alert-success')

        container.classList.add('show-cont')

        
        // add to local storage
        addToLocalStorage(id,value)

        // set back to default
        setToDefault()
    }

    else if(value && editFlag === true){
        console.log('editing')
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
    list.removeChild(element)
    say('item removed','alert-success')

    if(list.children.length===0){
        container.classList.remove('show-cont')
        say('list cleared','cleart')
       
    }
    
}

function editItem(){
    console.log('editing')
}

// add to local storage
function addToLocalStorage(){
    console.log('add to storage')
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
        // localStorage.removeItem('list')
    }
}

