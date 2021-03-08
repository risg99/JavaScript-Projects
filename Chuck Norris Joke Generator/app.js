document.querySelector('.get-jokes').addEventListener('click', getJokes);

// Get jokes
function getJokes(e) {
    e.target.style.color = 'blue';
    // Get the number of jokes
    const number = document.querySelector('#number').value;
    // Create a new xhr request object
    const xhr = new XMLHttpRequest();
    // Create a connection
    xhr.open('GET',`http://api.icndb.com/jokes/random/${number}`,true);
    // Onload of data
    xhr.onload = function(){
        // Check for status if OK
        if(this.status === 200){
            const response = JSON.parse(this.responseText);

            let output = '';
            if(response.type === 'success'){
                response.value.forEach(function(joke){
                    output += `<li>${joke.joke}</li>`;
                });
            }else{
                output += '<li>Something Went Wrong! You can retry</li>';
            }
            document.querySelector('.jokes').innerHTML = output;
        }
    }
    xhr.send();
    e.preventDefault();
}