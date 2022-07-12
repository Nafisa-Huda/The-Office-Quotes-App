const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

update.addEventListener('click', _ => {
 //underscore is because there's no parameter, we're telling it we want to immediatly run fetch onclick w no function.
    fetch('/quotes', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ //convert data into string, turns the key value pair or the property itself into string.
            name: 'Dwight Schrute',
            quote: 'False.'
        })
    })
    .then(res =>{
        if(res.ok) return res.json()
    })
    .then(response =>{
        window.location.reload(true)//reloads window for every quote update so we don't have to keep refreshing.
    })
}) //Do research on fetch and this in the tutorial

deleteButton.addEventListener('click', _ =>{
    fetch('/quotes', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: "Dwight Schrute"
        })
    })
    .then(res =>{
        if(res.ok) return res.json()
    })
    .then(response =>{
        if (response === 'No quote to delete') { //if the server responds there is no quote to delete, log that reponse into the DOM so the user can see it.
            messageDiv.textContent = 'No Dwight Schrute quote to delete'
          } else { //if that's not the case reload the window and delete the quote
            window.location.reload(true)
          }
    })
})