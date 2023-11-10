let username = document.getElementById("username")
let form = document.querySelector("form")
let ginput = document.querySelector("#ginput")
let groceryList = document.querySelector('.list-group')
let searchGrocery = document.querySelector("#searchg")
let clearBtn = document.querySelector("#clearbtn")

loadcontent()

function loadcontent() {
    document.addEventListener('DOMContentLoaded', getUsername)
    form.addEventListener('submit', addGrocery)
    groceryList.addEventListener('click', removeGrocery)
    clearBtn.addEventListener('click', clearGrocery)
    searchGrocery.addEventListener('keyup',filterGrocery)
}

function getUsername() {
    let usernameLs = localStorage.getItem('username')
       if(!usernameLs){
           location.href = 'login.html'
       }    

    username.innerText = usernameLs
    getGroceryFromLs()
}

function getGroceryFromLs(){
    let grocery
    if(localStorage.getItem("GroceryLs")== null){
        grocery = []
    }else{
            grocery = JSON.parse(localStorage.getItem("GroceryLs"))
        }
        grocery.forEach((gros) => {
            console.log(gros)
            let li = document.createElement('li')
            li.className = "list-group-item"
        
            let liText = document.createTextNode(gros)
                    
                    
        
                li.appendChild(liText)
        
                groceryList.appendChild(li)
        
         let link = document.createElement('a')
         link.className= 'delete-item'
         link.style.cursor = 'pointer'
         link.style.marginLeft = '95%'
         link.innerHTML = '<i class="fa-solid fa-xmark"> </i>'
         li.appendChild(link)
        
        }
        )        
}


function addGrocery(e) {
 if(ginput.value == ''){
    alert('enter grocery value')
} else {
    let li = document.createElement('li')
    li.className = "list-group-item"

    let liText = document.createTextNode(ginput.value)
            //    store user in to Ls
            addGrocerytoLs(ginput.value)

        li.appendChild(liText)

        groceryList.appendChild(li)

 let link = document.createElement('a')
 link.className= 'delete-item'
 link.style.cursor = 'pointer'
 link.style.marginLeft = '95%'
 link.innerHTML = '<i class="fa-solid fa-xmark"> </i>'
 li.appendChild(link)

//         // clear input after saved
         ginput.value = ''
}
    e.preventDefault()

}

function removeGrocery(e){

    if (e.target.parentElement.classList.contains('delete-item')){
        if(confirm('are you sure you want to delete grocery list')){
        e.target.parentElement.parentElement.remove()
        // remove grocery localstorage function start
        removeGroceryFromLs(e.target.parentElement.parentElement)   


        }
    }

    e.preventDefault()
}

// removegrocery ffromls
function removeGroceryFromLs(groceriesout){
    let grocery
    if(localStorage.getItem("GroceryLs")== null){
        grocery = []
    }else{
            grocery = JSON.parse(localStorage.getItem("GroceryLs"))
        }

        // loop through local storage array

        grocery.forEach((grosls, index) =>{
           if(groceriesout.textContent == grosls){
           grocery.splice(index, 1)
        }
    })

    // set localStorage value again
    localStorage.setItem("GroceryLs", JSON.stringify(grocery))
}

function clearGrocery(e){
    groceryList.innerHTML = ''
clearLs()
}

// cleargrocery from ls
function clearLs(){
    localStorage.removeItem("GroceryLs")
}
 function filterGrocery(e)
 {
    let search = e.target.value.toLowerCase()
     let listgrocery = document.querySelectorAll('.list-group-item')


    listgrocery.forEach((grocery) =>
    {
       const groceryContent = grocery.firstChild.textContent
      if(groceryContent.toLowerCase().indexOf(search) != -1) {
         grocery.style.display = 'block'
      } else{
          grocery.style.display = 'none'
       } 
} )

e.preventDefault()
}

// store grocery to localStorage

function addGrocerytoLs(groceriesin){
    let grocery
    if(localStorage.getItem("GroceryLs")== null){
        grocery = []
    }else{
            grocery = JSON.parse(localStorage.getItem("GroceryLs"))
        }
        grocery.push(groceriesin)
        localStorage.setItem("GroceryLs", JSON.stringify(grocery))
    }

