function del(){
    list.addEventListener('click',(e)=>{
    console.log(e.target.dataset.id)
    if(e.target.classList.contains('fa-trash')){
        e.target.parentElement.parentElement.parentElement.remove()
    }
})
}

export default del