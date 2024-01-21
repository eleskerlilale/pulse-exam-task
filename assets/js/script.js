const nav=document.querySelector("nav")
const menu=document.querySelector(".menu-button")
const menuList=document.querySelector(".menu-list")
const p=document.querySelectorAll(".menu-list p")
const menuMain=document.querySelector(".menu-main")
const sort=document.querySelector(".sort")
const search =document.querySelector("#search")
const seeMore=document.querySelector(".see")

window.addEventListener("scroll", () => {
    if(document.body.scrollTop>200 || document.documentElement.scrollTop>200){
        nav.style.backgroundColor='#000000a8'
    }
    else{
        nav.style.backgroundColor='transparent'
    }
})
menu.addEventListener("click", () => {
    if(menu.classList.value=='menu-button'){
        menuList.style.height=`230px`
        menuList.style.fontSize=`17px`
        p.forEach(element => element.style.display='block')
        menu.classList.toggle("active")
    }else{
        menuList.style.height=`0`
        menuList.style.fontSize=`0`
        p.forEach(element => element.style.display='none')
        menu.classList.toggle("active")
    }
})
let page=1;
function item(){
    axios.get(` http://localhost:3000/menu?_page=${page}&_limit=4`)
    .then(res => res.data)
    .then(data => {
            data.forEach(element => {
                menuMain.innerHTML+=`
                    <div class="col-lg-6 col-md-12">
              <div class="card">
                <div id="header">
                    <h3>${element.name}</h3>
                    <a href='./add.html?id=${element.id}'><i class="bi bi-pencil-square"></i></a>
                    <i class="bi bi-trash-fill" onclick="delFunc(${element.id})"></i>
                    <a href="./detail.html?id=${element.id}">Detail</a>
                </div>
                <div class="text">
                  <p>with wild mushrooms and asparagus</p>
                  <div class="noqte"></div>
                  <div class="price">$${element.price}</div>
                </div>
              </div>
            </div>
                    `
        })
    })
}
item()
seeMore.addEventListener("click" ,() => {
    page++
    item()
    axios.get(` http://localhost:3000/menu`)
    .then(res => res.data)
    .then(data => {
        if(data.length<=page*4){
            seeMore.remove()
        }
    })
})
function delFunc(id){
    axios.delete(`http://localhost:3000/menu/`+id)
    window.location.reload()
}

search.addEventListener("input", () => {
    menuMain.innerHTML=``
    seeMore.remove()
    axios.get(` http://localhost:3000/menu`)
    .then(res => res.data)
    .then(data => {
        data.forEach(element =>{
            if(element.name.toLowerCase().includes(search.value.toLowerCase())){
                menuMain.innerHTML+=
                    `<div class="col-lg-6 col-md-12">
                        <div class="card">
                            <div id="header">
                                <h3>${element.name}</h3>
                                <a href='./add.html?id=${element.id}'><i class="bi bi-pencil-square"></i></a>
                                <i class="bi bi-trash-fill" onclick="delFunc(${element.id})"></i>
                                <a href="./detail.html?id=${element.id}">Detail</a>
                            </div>
                            <div class="text">
                                <p>with wild mushrooms and asparagus</p>
                                <div class="noqte"></div>
                                <div class="price">$${element.price}</div>
                            </div>
                        </div>
                    </div> `
            }
        })
    })
})

sort.addEventListener("click", () => {
    menuMain.innerHTML=``
    seeMore.remove()
    axios.get(` http://localhost:3000/menu`)
    .then(res => res.data)
    .then(data => {
        const info=[...data]
        if(sort.innerText=='Default'){
            infonew=data.sort((a,b) => a.price.localeCompare(b.price))
            sort.innerText='Artan'
        }else if(sort.innerText=="Artan"){
            infonew=data.sort((a,b) => b.price.localeCompare(a.price))
            sort.innerText='Azalan'
        }else{
            infonew=info
            sort.innerText='Default'
        }
        console.log(infonew)
        infonew.forEach(element => {
            menuMain.innerHTML+=`
                    <div class="col-lg-6 col-md-12">
              <div class="card">
                <div id="header">
                    <h3>${element.name}</h3>
                    <a href='./add.html?id=${element.id}'><i class="bi bi-pencil-square"></i></a>
                    <i class="bi bi-trash-fill" onclick="delFunc(${element.id})"></i>
                    <a href="./detail.html?id=${element.id}">Detail</a>
                </div>
                <div class="text">
                  <p>with wild mushrooms and asparagus</p>
                  <div class="noqte"></div>
                  <div class="price">$${element.price}</div>
                </div>
              </div>
            </div>
                    `
        })
    })
})