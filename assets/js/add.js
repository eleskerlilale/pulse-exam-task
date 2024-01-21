const id=new URLSearchParams(window.location.search).get("id")
console.log(id)
// const img=document.querySelector("img")
// const file=document.querySelector("#file")
const name=document.querySelector("#name")
const price=document.querySelector("#price")
const save=document.querySelector(".save")
if(id){
    axios.get(` http://localhost:3000/menu/`+id)
    .then(res => res.data)
    .then(data => {
        name.value=data.name
        price.value=data.price
    })
}
save.addEventListener("click" ,() => {
    if(id){
        axios.put(` http://localhost:3000/menu/`+id, {
            name:name.value,
            price:price.value
        })
    }else{
        axios.post(` http://localhost:3000/menu/`, {
            name:name.value,
            price:price.value
        })
    }
    window.location='./index.html'
})