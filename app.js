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
        case 'search':
            method = 'GET';
            break;
        default:
            console.error('Invalid action');
            return;
    }

    var requestOptions = {
        method: method,
        headers: myHeaders,
        redirect: 'follow'
    };
    
    if (method !== 'GET' && action !== 'search') { // Add condition to exclude 'search' action
        requestOptions.body = JSON.stringify(requestBody);
    }

    fetch("https://fqdxvcbyt2.execute-api.us-west-2.amazonaws.com/Dev*", requestOptions)
        .then(response => {
            if (action === 'search') {
                return response.json();
            } else {
                return response.text();
            }
        })
        .then(result => {
            if (action === 'search') {
                displaySearchResult(result);
            } else {
                alert(result);
            }
        })
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

document.getElementById("search-btn").addEventListener("click", function() {
    // Retrieve the recipe name to search
    var searchName = document.getElementById('search-name').value;
    var action = 'search';

    // Call the callAPI function with the provided parameters
    callAPI(action, null, searchName, null, null, null, null, null, null, null, null);
});

// Function to display search results
function displaySearchResult(result) {
    var displayArea = document.getElementById('display-area');
    displayArea.value = ''; // Clear previous search results    
    
    displayArea.value = JSON.stringify(result);
    // if (!Array.isArray(result) || result.length === 0) {
    //     displayArea.value = 'No recipes found.';
    // } else {
    //     result.forEach(recipe => {
    //         displayArea.value += 'ID: ' + recipe.ID + '\n';
    //         displayArea.value += 'Name of Dish: ' + recipe.NameOfDish + '\n';
    //         displayArea.value += 'Preparation Time: ' + recipe.PrepTime + '\n';
    //         displayArea.value += 'Serves: ' + recipe.Serves + '\n';
    //         displayArea.value += 'Difficulty: ' + recipe.Difficulty + '\n';
    //         displayArea.value += 'Cuisine: ' + recipe.Cuisine + '\n';
    //         displayArea.value += 'Tags: ' + recipe.Tags + '\n';
    //         displayArea.value += 'Added By: ' + recipe.AddedBy + '\n';
    //         displayArea.value += 'Ingredients: ' + recipe.Ingredients + '\n';
    //         displayArea.value += 'Image: ' + recipe.Image + '\n\n';
    //     });
    // }
}
