// Function to call the API for inserting or updating a recipe
var callAPI = (action, ID, NameOfDish, PrepTime, Serves, Difficulty, Cuisine, Tags, AddedBy, Ingredients, Image) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Construct the request body including ID for updating
    var requestBody = {
        "action" : action,
        "ID": ID, // Provide the ID of the recipe to update
        "NameOfDish": NameOfDish,
        "PrepTime": PrepTime,
        "Serves": Serves,
        "Difficulty": Difficulty,
        "Cuisine": Cuisine,
        "Tags": Tags,
        "AddedBy": AddedBy,
        "Ingredients": Ingredients,
        "Image": Image
    };

    var method;
    switch (action) {
        case 'insert':
            method = 'POST';
            break;
        case 'update':
            method = 'PUT';
            break;
        case 'delete':
            method = 'DELETE';
            break;
        default:
            console.error('Invalid action');
            return;
    }

    var requestOptions = {
        method: method,
        headers: myHeaders,
        body: JSON.stringify(requestBody),
        redirect: 'follow'
    };

    fetch("PUT-API-URL-HERE", requestOptions)
        .then(response => response.text())
        .then(result => alert(JSON.parse(result).body))
        .catch(error => console.log('error', error));
}

// Function to handle insert button click event
document.getElementById("insert-btn").addEventListener("click", function() {
    // Retrieve values from input fields or wherever you store them
    var ID = ""; // Leave ID empty for new recipes
    var action = 'insert';
    var NameOfDish = document.getElementById('name').value;
    var PrepTime = document.getElementById('prep-time').value;
    var Serves = document.getElementById('serves').value;
    var Difficulty = document.getElementById('difficulty').value;
    var Cuisine = document.getElementById('cuisine').value;
    var Tags = document.getElementById('tags').value;
    var AddedBy = document.getElementById('addedby').value;
    var Ingredients = document.getElementById('ingredients').value;
    var Image = document.getElementById('image').value;

    // Call the callAPI function with the provided parameters
    callAPI(action, ID, NameOfDish, PrepTime, Serves, Difficulty, Cuisine, Tags, AddedBy, Ingredients, Image);
});

// Function to handle update button click event
document.getElementById("update-btn").addEventListener("click", function() {
    // Retrieve values from input fields or wherever you store them
    var ID = document.getElementById('id').value;; // Replace with the actual recipe ID
    var action = 'update';
    var NameOfDish = document.getElementById('name').value;
    var PrepTime = document.getElementById('prep-time').value;
    var Serves = document.getElementById('serves').value;
    var Difficulty = document.getElementById('difficulty').value;
    var Cuisine = document.getElementById('cuisine').value;
    var Tags = document.getElementById('tags').value;
    var AddedBy = document.getElementById('addedby').value;
    var Ingredients = document.getElementById('ingredients').value;
    var Image = document.getElementById('image').value;

    // Call the callAPI function with the provided parameters
    callAPI(action, ID, NameOfDish, PrepTime, Serves, Difficulty, Cuisine, Tags, AddedBy, Ingredients, Image);
});

// Function to handle delete button click event
document.getElementById("delete-btn").addEventListener("click", function() {
    // Retrieve the recipe ID to delete
    var ID = document.getElementById('id').value;
    var action = 'delete';

    // Call the callAPI function with the provided parameters
    callAPI(action, ID, null, null, null, null, null, null, null, null, null);
});

document.getElementById("clear-btn").addEventListener("click", function() {
    // Clear all input fields
    document.getElementById('name').value = '';
    document.getElementById('prep-time').value = '';
    document.getElementById('serves').value = '';
    document.getElementById('difficulty').value = '';
    document.getElementById('cuisine').value = '';
    document.getElementById('tags').value = '';
    document.getElementById('addedby').value = '';
    document.getElementById('ingredients').value = '';
    document.getElementById('image').value = '';
    document.getElementById('id').value = ''; // Also clear the ID field if needed
});
