// callAPI function that takes the recipe details as parameters
var callAPI = (NameOfDish, PrepTime, Serves, Difficulty, Cuisine, Tags, AddedBy, Ingredients, Image)=>{
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    var raw = JSON.stringify({"NameOfDish":NameOfDish,
                              "PrepTime":PrepTime,
                              "Serves":Serves,
                              "Difficulty":Difficulty,
                              "Cuisine":Cuisine,
                              "Tags":Tags,
                              "AddedBy":AddedBy,
                              "Ingredients":Ingredients,
                              "Image":Image });
                              
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
<<<<<<< HEAD
    fetch("PUT-API-URL-HERE", requestOptions)
=======
    fetch("YOUR-API-URL", requestOptions)
>>>>>>> 2c36e31a4a956d335ef13f67becc143f8ad82706
    .then(response => response.text())
    .then(result => alert(JSON.parse(result).body))
    .catch(error => console.log('error', error));
}
<<<<<<< HEAD

=======
>>>>>>> 2c36e31a4a956d335ef13f67becc143f8ad82706
