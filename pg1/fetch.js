fetch('http://localhost:3000/nodes')
    .then(resp => resp.json())
    .then(data => showNodes(data))

showNodes = res => {
    console.log(res)
    Array.from(res).forEach(data => {
        console.log(data.text)
        document.querySelector(".nodes").innerHTML += `<li class="node">
                <span class="node_text">${data.text}</span>
                <input class="node_text node_text-input" value="${data.text}">
                <button class="node_delete">x</button>  
            </li>`;
    })
};

const nodes = document.querySelector(".nodes");

// add nodes
const addNode = document.forms["add_node"];
addNode.addEventListener("submit", e => {
    e.preventDefault()
    const value = addNode.querySelector(".add_node-input").value;

    fetch('http://localhost:3000/nodes', {
        method: 'post',
        body: JSON.stringify({
            id: '',
            text: value
        }),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => {
            `<li class="node">
                <span class="node_text">${res.text}</span>
                <input class="node_text node_text-input" value="${res.text}">
                <button class="node_delete">x</button>  
            </li>`
        })
        .catch(err => console.error(err))

    addNode.reset();
});

// change node
nodes.addEventListener("dblclick", (e) => {
    if (e.target.classList == "node_text") {

        nodeText = document.querySelectorAll(".node_text");
        Array.from(nodeText).forEach(node => {
            node.style.display = "none";
        });

        nodeInput = document.querySelectorAll(".node_text-input");

        Array.from(nodeInput).forEach(node => {
            node.style.display = "block";

            node.addEventListener('change', e => {
                console.log(e)
                // axios.put('http://localhost:3000/nodes/3', {
                //     id: "",
                //     text: node.value
                // })
                //     .then(res => console.log(res))
                //     .catch(err => console.error(err))
                fetch('http://127.0.0.1:3000/nodes/1', {
                    method: 'patch',
                    mode: 'cors',
                    body: JSON.stringify({
                        text: node.value
                    }),
                    headers: { 
                        'Cors-Api-Host': 'cors-anywhere.herokuapp.com',
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json; charset=UTF-8' 
                    }
                })
                .then(json => console.log(json))
                .catch(err => console.log(err))
            })
        });
    }
});