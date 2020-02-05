'use strict';

function getUsernameInfo(username) {
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            else {
                throw new Error(response.statusText);
            }
        })
        .then(responseJson =>
            displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function displayResults(responseJson) {
    // console.log(responseJson);
    $('#results-list').html('');
    responseJson.forEach(function (item) {
        // console.log(item);
        $("#results-list").append(`
    <li class="repo-name">${item.name}</li>
    <li class="repo-url">
      <a href="${item.html_url}">URL</a>
    </li>`);
    });
    $('#results').removeClass('hidden');
}

function getValue() {
    const inputUsername = $('#js-search-username').val();
    // console.log(inputUsername);
    return inputUsername;
}

function watchForm() {
    $('form').submit(function (event) {
        event.preventDefault();
        const userInput = getValue();
        getUsernameInfo(userInput);
        $('#js-error-message').empty();
    });
}

$(function () {
    console.log('App loaded')
    watchForm();
});