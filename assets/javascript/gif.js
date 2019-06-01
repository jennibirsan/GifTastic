
    // <!-- Code copied from form id and input type from week 6 activity 7 movie button -->
    // <!-- Code copied from the still/animate from type from week 6 activity 15 -->
    // <!-- All code copied and tweaked from week 6 activities, really -->


// setting the offset to render new images everytime a button is pressed
var offset = 0;
function displayFoodGifs() {
  $(".gif").remove();
  $(".rates").remove();
  var food = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    food + "&api_key=dlKuW4v13jmJLirr9iKljBKx241oemPR&limit=10&offset=" + offset;
// JB API KEY: dlKuW4v13jmJLirr9iKljBKx241oemPR
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        
        var gifDiv = $("<div class='foodPorn'>");

        var rating = results[i].rating;

        var p = $("<p class='rates'>").text("Rating: " + rating);

        var foodImage = $("<img>");
        var pauseGif = results[i].images.fixed_height_still.url;
        var playGif = results[i].images.fixed_height.url;
        foodImage.attr("src", pauseGif);
        foodImage.attr("data-pause", pauseGif);
        foodImage.attr("data-play", playGif);
        foodImage.attr("data-state", "still");
        foodImage.addClass("gif");
        gifDiv.append(p);
        gifDiv.append(foodImage);

        $("#gifs-appear-here").prepend(gifDiv);
        
      }
      offset = offset+10;
    });
}

$(document).on("click", ".food-btn", displayFoodGifs);


var foods = ["Cake", "Beer", "Pizza", "Tacos", "Ice Cream", "Soda", "Burger"];
function renderButtons() {
  $("#buttons-view").empty();
  for (var i = 0; i < foods.length; i++) {
    var a = $("<button>");
    a.addClass("food-btn");
    a.addClass("btn");
    a.addClass("btn-outline-info")
    a.attr("data-name", foods[i]);
    a.text(foods[i]);
    $("#buttons-view").append(a);
  }
}
$("#add-food").on("click", function(event) {
  event.preventDefault();
  var foodie = $("#food-input").val().trim();
  foods.push(foodie);
  renderButtons();
});

renderButtons();


$(document).on("click",".gif", function() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-play"));
    $(this).attr("data-state", "play");
  } else {
    $(this).attr("src", $(this).attr("data-pause"));
    $(this).attr("data-state", "still");
  }
});
