

const todos = document.querySelector(".todos");
const form = document.querySelector("form");
const button = document.querySelector("form input[type='button']");
const wrapper = document.querySelector('.wrapper');
let txt = document.querySelector("#text");

function getTodos() {
    let data=[];
    if(localStorage.getItem('data')){
        data=JSON.parse(localStorage.getItem("data"))
    }
    return data;
}

function createTodos(todo) {
    return `
        <div class="todo" data-id="${todo.id}">
                <p>${todo.txt}</p>
                <div>
                    <button data-todoID="${todo.id}" class="edit">Edit</button>
                    <button data-todoID="${todo.id}" class="delete">Delete</button>
                </div>
            </div>
    `;
}

function validate(){
    if(txt.value.length < 3){
        alert("Eng kamida 4 ta belgi kiriting");
        txt.style.outlineColor="red";
        txt.focus();
        return false;
    }

    return true;
}

function savaLocalSorage(txt){
    const item={
        txt: txt,
        status: 'active',
        id: Date.now()
    }
    let data=[];
    if(localStorage.getItem("data")){
        data=JSON.parse(localStorage.getItem("data"));
    }
    data.push(item);
    localStorage.setItem("data", JSON.stringify(data));
    return;
}


button && button.addEventListener('click', (event) => {
    event.preventDefault();
    
    let isValid=validate();
    if(!isValid){
        return;
    }

    savaLocalSorage(txt.value);
    window.location.reload();

    form.reset();
})

document.addEventListener("DOMContentLoaded", () => {
    let data=getTodos();
    
    if(data.length>0){
        data.forEach(element => {
            let item=createTodos(element);
            wrapper.innerHTML+=item;
        });
    }

    let deleteBtns=document.querySelectorAll(".delete");
    let editBtns=document.querySelectorAll(".edit");

    // console.log(deleteBtns);
    deleteBtns && deleteBtns.forEach(btn => {
        btn.addEventListener("click", (e)=>{
            // console.log(e.target.parentElement);
            let parent=e.target.parentElement;
            let id=e.target.dataset.todoid;
            parent.parentElement.remove();
            let data=getTodos();
            data=data.filter(value=>{
                return value.id!=id;
            })
            localStorage.setItem("data", JSON.stringify(data));
        })
    });
})