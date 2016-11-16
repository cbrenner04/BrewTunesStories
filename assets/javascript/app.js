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
      var listItem = $('<li>').addClass('listItem list-group-item')
                              .attr('data-key', storyKeys[i])
                              .text(currentItem.name);

      if (currentItem.status === 'necessary') {
        $('#necessary').append(listItem);
      } else if (currentItem.status === 'nice-to-have') {
        $('#nice-to-have').append(listItem);
      } else if (currentItem.status === 'completed') {
        $('#completed').append(listItem);
      }
    }
  });

  $('#incomplete').on('click', '.listItem', function() {
    $(this).remove();
    database.ref().child('data/stories').child($(this).data('key'))
            .update({
              status: 'completed'
            });
  });

  // Capture Button Click
  $("#add-story").on("click", function() {
    if (($("#name-input").val === undefined || ($("#name-input").val === '') ||
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
