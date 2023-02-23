
const title = document.getElementById('title');

var items = [];

function render_category(category) {
    
    console.log(category);

    title.innerHTML = category.name;

    for (var i = 0; i < category.items.length; ++i) {

        const item = document.createElement('button');

        item.className = "menu_button";

        item.innerHTML = category.items[i].name;

        if (category.items[i].price != undefined) {
            item.innerHTML += "<br/>" + category.items[i].price + "TL";
        }

        if (category.items[i].info != undefined) {
            item.innerHTML += "<br/>" + category.items[i].info;
        }

        item.item_index = i;

        item.addEventListener('mousedown', (event) => {
                        
            const new_category = category.items[item.item_index];

            if (new_category.items == undefined) {
                return;
            }

            for (var i = 0; i < items.length; ++i) {
                items[i].remove();
            }

            items = [];
            
            render_category(new_category);
        });

        items.push(item);

        document.body.appendChild(item);
    }
}

window.addEventListener('load', (event) => {

    fetch("./menu.json")
        .then(response => response.json())
        .then(json => render_category(json));

});
