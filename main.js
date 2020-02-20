const nodes = document.querySelector('.nodes')

// add nodes
const addNode = document.forms['add_node']
addNode.addEventListener('submit', e => {
    e.preventDefault()
    const value = addNode.querySelector(".add_node-input").value
    console.log(value)

    // create elements
    const node = document.createElement('li')
    const nodeText = document.createElement('span')
    const deleteBtn = document.createElement('button')

    // 
    // nodeDataText.push(value)

    // add context
    nodeText.textContent = value
    deleteBtn.textContent = 'x'

    // add classes
    node.classList.add('node')
    nodeText.classList.add('node_text')
    deleteBtn.classList.add('node_delete')

    node.appendChild(nodeText)
    node.appendChild(deleteBtn)
    nodes.appendChild(node)

    addNode.reset()
})

// change node
nodes.addEventListener('dblclick', e => {
    if (e.target.classList == 'node_text') {
        nodeText = document.querySelectorAll('.node_text')
        Array.from(nodeText).forEach(node => {
            node.style.display = 'none'
        })
        nodeInput = document.querySelectorAll('.node_text-input')
        const value = nodeInput.value
        Array.from(nodeInput).forEach(node => {
            node.style.display = 'block'
        })
    }
})

// delete nodes
nodes.addEventListener('click', e => {
    if (e.target.classList == 'node_delete') {
        e.preventDefault()
        const nodeSelect = e.target.parentElement
        nodes.removeChild(nodeSelect)
    }
})

// filter nodes
const search = document.querySelector('.search_input')
search.addEventListener('keyup', e => {
    const input = e.target.value.toLowerCase()
    const nodeAll = nodes.querySelectorAll('.node')

    Array.from(nodeAll).forEach(node => {
        const text = node.firstElementChild.textContent
        if (text.toLowerCase().indexOf(input) != -1)
            node.style.display = 'block'
        else 
            node.style.display = 'none'
    })
})