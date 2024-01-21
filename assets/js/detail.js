const id =new URLSearchParams(window.location.search).get("id")
const menuMain=document.querySelector(".menu-main")
axios.get(` http://localhost:3000/menu/`+id)
    .then(res => res.data)
    .then(element => {
            
                menuMain.innerHTML+=`
                    <div>
              <div class="card">
                <div id="header">
                    <h3>${element.name}</h3>
                    
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