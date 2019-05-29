
$("button").on("click", function() {
  var food = $(this).attr("data-food");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    food + "&api_key=dlKuW4v13jmJLirr9iKljBKx241oemPR&limit=10";
// JB API KEY: dlKuW4v13jmJLirr9iKljBKx241oemPR
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $(".card-body");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var foodImage = $("<img>");
        foodImage.attr("src", results[i].images.fixed_height.url);

        gifDiv.prepend(p);
        gifDiv.prepend(foodImage);

        $("#gifs-appear-here").prepend(gifDiv);
      }
    });
});