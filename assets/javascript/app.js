// Initialize Firebase
var config = {
  apiKey: "AIzaSyA_DGjtOkkEvVXFiEiXpp95AZAP8J8TWhs",
  authDomain: "brewtunesstories.firebaseapp.com",
  databaseURL: "https://brewtunesstories.firebaseio.com",
  storageBucket: "brewtunesstories.appspot.com",
  messagingSenderId: "359024481793"
};
firebase.initializeApp(config);

// reference to firebase database
var database = firebase.database();

// initial story object
var data = {
  first: {
    name: 'On the initial view user should be able enter a beer',
    status: 'necessary',
    position: 1
  },
  second: {
    name: 'A user should be able to enter the beer on desktop and mobile',
    status: 'necessary',
    position: 2
  },
  third: {
    name: 'The user should be shown an error if they enter unexpected characters',
    status: 'necessary',
    position: 3
  },
  fourth: {
    name: 'The input field for the beer should limit input to specific characters',
    status: 'necessary',
    position: 4
  },
  fifth: {
    name: 'If the user enters an unrecognized beer, they should be shown an error',
    status: 'necessary',
    position: 5
  },
  sixth: {
    name: 'On the initial view a user should see recent searches and their results',
    status: 'necessary',
    position: 6
  },
  seventh: {
    name: 'On the initial view a user should see blurb about the app',
    status: 'necessary',
    position: 7
  },
  eighth: {
    name: 'When a user submits the form the Untappd API should be queried with the users input',
    status: 'necessary',
    position: 8
  },
  ninth: {
    name: 'When the Untappd API returns the results of the query, the app should get the first beer',
    status: 'necessary',
    position: 9
  },
  tenth: {
    name: 'When the app gets the specific beer, the app will then query the Untappd API for that beer',
    status: 'necessary',
    position: 10
  },
  eleventh: {
    name: 'When the Untappd API returns the results of the specific beer query, the app should get the rating of the beer',
    status: 'necessary',
    position: 11
  },
  twelfth: {
    name: 'When the Untappd API returns the results of the specific beer query, the app should get the number of ratings for the beer',
    status: 'necessary',
    position: 12
  },
  thirteen: {
    name: 'When the app has the beer, the rating, and the number of ratings, it should send this data to Firebase',
    status: 'necessary',
    position: 13
  },
  fourteen: {
    name: 'When the app has the beer, the rating, and the number of ratings, it should turn this into a query parameter(s) for the Spotify API',
    status: 'necessary',
    position: 14
  },
  fifteen: {
    name: 'When the app has the query parameter(s) for Spotify API, it should query the Spotify API',
    status: 'necessary',
    position: 15
  },
  sixteen: {
    name: 'When the app has the results from the Spotify API, it should send this data to Firebase',
    status: 'necessary',
    position: 16
  },
  seventeen: {
    name: 'When the app has the results from the Spotify API, it should relate these to UI',
    status: 'necessary',
    position: 17
  },
  eighteen: {
    name: 'The Firebase data should have an object for each search that contains the beer, the Spotify results, and a timestamp',
    status: 'necessary',
    position: 18
  },
  nineteen: {
    name: 'When a user submits the form they should be shown a loading view',
    status: 'necessary',
    position: 19
  },
  twenty: {
    name: 'The loading view should show an animation of a beer getting poured',
    status: 'necessary',
    position: 20
  },
  twentyOne: {
    name: 'Once the loading view has completed the user should be taken to the playlist view',
    status: 'necessary',
    position: 21
  },
  twentyTwo: {
    name: 'When the load view completes, the user should be shown their results',
    status: 'necessary',
    position: 22
  },
  twentyThree: {
    name: 'The results should be a playlist',
    status: 'necessary',
    position: 23
  },
  twentyFour: {
    name: 'The results should be displayed in a widget that plays the playlist',
    status: 'necessary',
    position: 24
  },
  twentyFive: {
    name: 'When the Untappd API returns the results of the query, the app should get the most likely beer',
    status: 'nice-to-have',
    position: 25
  },
  twentySix: {
    name: 'The loading view should play the sound of a beer getting poured',
    status: 'nice-to-have',
    position: 26
  },
  twentySeven: {
    name: 'The loading view should belch once the beer has been poured',
    status: 'nice-to-have',
    position: 27
  }
};

$(document).on('ready', function() {
  // holding on to the below and object above during development
  // var dataKeys = Object.keys(data);

  // for (var i = 0; i < dataKeys.length; i++) {
  //   var currentItem = data[dataKeys[i]];
  //   database.ref().push({
  //     name: currentItem.name,
  //     status: currentItem.status,
  //     position: currentItem.position
  //   });
  // }

  // I use these variables later
  var stories;
  var storyKeys;

  database.ref().orderByChild('position').on('value', function(snapshot) {
    $('#necessary').empty();
    $('#nice-to-have').empty();
    $('#completed').empty();

    stories = snapshot.val();
    storyKeys = Object.keys(stories);

    for (var i = 0; i < storyKeys.length; i++) {
      var currentItem = stories[storyKeys[i]];
      var ownerBadge = $('<span>').addClass('badge pull-right').text(currentItem.owner);
      var listItem = $('<div>').addClass('listItem list-group-item')
                              .append(ownerBadge)
                              .attr('data-key', storyKeys[i])
                              .attr('data-toggle', 'collapse')
                              .attr('data-target', '#' + storyKeys[i])
                              .attr('aria-expanded', 'false')
                              .html(
                                $('<p>').text(currentItem.name)
                                        .append(' ')
                                        .append(ownerBadge)
                              );
      var nameInput = $('<div>').addClass('form-group').append(
                        $('<label>').attr('for', 'name-update').text('Name')
                      ).append(
                        $('<input>').addClass('form-control nameUpdate')
                                    .attr('id', 'name-update')
                                    .attr('type', 'text')
                                    .val(currentItem.name)
                      );
      var statusSelect = $('<div>').addClass('form-group').append(
                           $('<label>').attr('for', 'status-update').text('Status')
                         ).append(
                           $('<select>').addClass('form-control statusUpdate')
                                       .attr('id', 'status-update')
                                       .append($('<option>',{value: 'necessary', text:'necessary'}))
                                       .append($('<option>',{value: 'nice-to-have', text:'nice-to-have'}))
                                       .append($('<option>',{value: 'completed', text:'completed'}))
                                       .val(currentItem.status)
                         );
      var ownerSelect = $('<div>').addClass('form-group').append(
                          $('<label>').attr('for', 'owner-update').text('Owner')
                        ).append(
                          $('<select>').addClass('form-control ownerUpdate')
                                      .attr('id', 'owner-update')
                                      .append($('<option>',{value: 'Alan', text:'Alan'}))
                                      .append($('<option>',{value: 'Adam', text:'Adam'}))
                                      .append($('<option>',{value: 'Chris', text:'Chris'}))
                                      .append($('<option>',{value: 'Max', text:'Max'}))
                                      .val(currentItem.status)
                         );
      var updateButton = $('<button>').addClass('btn btn-default updateButton')
                                      .attr('type', 'submit')
                                      .attr('data-key', storyKeys[i])
                                      .text('Update');
      var updateForm = $('<form>').attr('role', 'form')
                                  .append(nameInput)
                                  .append(statusSelect)
                                  .append(ownerSelect)
                                  .append(updateButton);
      var updateWell = $('<div>').addClass('well').append(updateForm);
      var collapse = $('<div>').addClass('collapse').attr('id', storyKeys[i])
                                 .append(updateWell);

      if (currentItem.status === 'necessary') {
        $('#necessary').append(listItem)
                       .append(collapse);
      } else if (currentItem.status === 'nice-to-have') {
        $('#nice-to-have').append(listItem)
                          .append(collapse);
      } else if (currentItem.status === 'completed') {
        $('#completed').append(listItem)
                       .append(collapse);
      }
    }
  });

  $('#incomplete').on('click', '.statusButton', function() {
    database.ref().child($(this).data('key'))
            .update({
              status: 'completed'
            });

    // Don't refresh the page!
    return false;
  });

  $('#completed').on('click', '.statusButton', function() {
    database.ref().child($(this).data('key'))
            .update({
              status: 'nice-to-have'
            });

    // Don't refresh the page!
    return false;
  });

  $('body').on('click', '.updateButton', function() {
    var nameUpdateInput = $(this).parent().children('.form-group')
                                          .children('.nameUpdate');
    var statusUpdateInput = $(this).parent().children('.form-group')
                                            .children('.statusUpdate');
    var ownerUpdateInput = $(this).parent().children('.form-group')
                                           .children('.ownerUpdate');
    if (nameUpdateInput.val() === undefined || nameUpdateInput.val() === '') {
      // empty the inputs
      nameUpdateInput.val('');
      return false;
    }

    // Grabbed values from text boxes
    name = nameUpdateInput.val().trim();
    status = statusUpdateInput.val();
    owner = ownerUpdateInput.val();

    // Code for handling the push
    database.ref().child($(this).data('key')).update({
      name: name,
      status: status,
      owner: owner
    });

    // empty the inputs
    nameUpdateInput.val('');

    // Don't refresh the page!
    return false;
  });

  // Capture Button Click
  $("#add-story").on("click", function() {
    if (($("#name-input").val() === undefined || ($("#name-input").val() === '') ||
       ($("#status-input").val() === undefined) || $("#status-input").val() === ''))  {
      // empty the inputs
      $("#name-input").val('');
      $("#status-input").val('');
      return false;
    }

    // Grabbed values from text boxes
    name = $("#name-input").val().trim();
    status = $("#status-input").val().trim();

    // Code for handling the push
    database.ref().push({
      name: name,
      status: status,
      position: storyKeys.length + 1
    });

    // empty the inputs
    $("#name-input").val('');
    $("#status-input").val('');

    // Don't refresh the page!
    return false;
  });
});
