console.log('client side file is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const loc = search.value

    messageTwo.textContent = ''
    messageOne.textContent = 'Getting forecast for ' + loc + '...'

    fetch('/weather?address='+ loc).then((response) => {
    
    response.json().then((data) => {
        if(data.error){
            console.log(data.error)
            messageOne.textContent = data.error
        } else {
           console.log(data.location)
           console.log(data.forecastData)
           messageOne.textContent = data.location 
           messageTwo.textContent = data.forecastData 

        }
    })

})

     console.log('from form : ' + loc)
})