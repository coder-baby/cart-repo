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
                        <!-- the icon buttons -->
                        <button class="edit-btn">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="del-btn">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>`

        
        list.appendChild(li)
        say('item added','alert-success')
        container.classList.add('show-cont')

        // add to local storage
        addToLocalStorage(id,value)

        // set back to default
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
