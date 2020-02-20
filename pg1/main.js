axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";
CSRF_COOKIE_NAME = "XCSRF-TOKEN"

const nodes = document.querySelector(".nodes");

axios
    .get("http://localhost:3000/nodes")
    .then(res => {
        // console.log(res.data)
        showNodes(res);
    })
    .catch(err => console.log(err));

showNodes = res => {
    res.data.forEach(data => {
        console.log(data.id)
        
        document.querySelector(".nodes").innerHTML += `<li class="node">
        <span class="node_text">${data.text}</span>
        <input class="node_text node_text-input" value="${data.text}">
        <button class="node_delete">x</button>  
    </li>`;
    })
    // node.setAttribute("data-id", res.data.id)
    
};

// add nodes
const addNode = document.forms["add_node"];
addNode.addEventListener("submit", e => {
    e.preventDefault();
    const value = addNode.querySelector(".add_node-input").value;

    axios
        .post("http://localhost:3000/nodes", {
            id: "",
            text: value
        })
        .then(res => {
            `<li class="node">
            <span class="node_text">${res.data.text}</span>
            <input class="node_text node_text-input" value="${res.data.text}">
            <button class="node_delete">x</button>  
        </li>`
        })
        .catch(err => console.error(err))

    addNode.reset();
});

// change node
// nodes.addEventListener("dblclick", function (e) {
//     console.log(e)
//     if (e.target.classList == "node_text") {
//         console.log(this.request)

//         nodeText = document.querySelectorAll(".node_text");
//         Array.from(nodeText).forEach(node => {
//             node.style.display = "none";
//         });

//         nodeInput = document.querySelectorAll(".node_text-input");

//         Array.from(nodeInput).forEach(node => {
//             node.style.display = "block";

//             node.addEventListener('change', e => {
//                 console.log(e)
//                 axios.put(`http://localhost:3000/nodes/` + e, {
//                     id: "",
//                     text: node.value
//                 })
//                     .then(res => console.log(res))
//             })
//         });
//     }
// });

// delete nodes
// nodes.addEventListener("click", e => {
//     if (e.target.classList == "node_delete") {
//         e.preventDefault();
//         axios.delete(`http://localhost:3000/nodes/2`)
//             .then(res => console.log(res))
//             .catch(err => console.error(err))
//     }
// });

// filter nodes
const search = document.querySelector(".search_input");
search.addEventListener("keyup", e => {
    const input = e.target.value.toLowerCase();
    const nodeAll = nodes.querySelectorAll(".node");

    Array.from(nodeAll).forEach(node => {
        const text = node.firstElementChild.textContent;
        if (text.toLowerCase().indexOf(input) != -1) node.style.display = "block";
        else node.style.display = "none";
    });
});
