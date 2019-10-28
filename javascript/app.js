let Location = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Boston",
  "Detroit",
  "Miami",
  "Seattle",
  "Houston",
  "Denver",
  "Cleveland",
  "Madison",
  "Portland",
  "Las Vegas",
  "Philadelphia",
  "Washington",
  "Dallas"
];

function generateButton() {
  for (let city of Location) {
    var button = $("<button>");
    $(button).text(city);
    $(button).click(() => {
      searchGifandMovie(city);
    });
    $("#button-list").append(button);
    button.addClass("button-generated fs col-3 col-sm-3 col-md-2 col-lg-1");
  }
}

generateButton();

$("#search").click(event => {
  event.preventDefault();
  var searchContent = $("#userInput")
    .val()
    .trim();
  if (searchContent && !Location.includes(searchContent)) {
    $("#userInput").val("");
    $("#button-list").empty();
    Location.push(searchContent);
    generateButton(Location);
  }
  console.log(Location);
});

function searchGifandMovie(anyCity) {
  let gifName = anyCity;
  let queryUrlGif =
    "https://api.giphy.com/v1/gifs/search?q=" +
    gifName +
    "&api_key=5gOIQ53jSPuWg25UaMaTZuEzaXPZ8qBF&limit=10";
  $.ajax({
    url: queryUrlGif,
    method: "GET"
  }).then(response => {
    console.log(response);
    for (let i = 0; i < 10; i++) {
      var eachGiphy = $("<img>");
      var rating = $("<p>");
      eachGiphy.addClass("each-giphy");
      eachGiphy.attr("src", response.data[i].images.fixed_height_still.url);
      eachGiphy.attr("data-state", "still");
      eachGiphy.attr(
        "data-still",
        response.data[i].images.fixed_height_still.url
      );
      eachGiphy.attr("data-animate", response.data[i].images.fixed_height.url);
      eachGiphy.click(function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });

      rating.addClass("each-rating");
      rating.text("RATING: " + response.data[i].rating);

      $(".giphy")
        .prepend(rating)
        .prepend(eachGiphy);
    }
  });

  let movieName = anyCity;
  var queryUrlMovie =
    "https://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy";
  $.ajax({
    url: queryUrlMovie,
    method: "GET"
  }).then(response => {
    console.log(response);
    var movieImg = $("<img>");
    movieImg.addClass("movie-photo");
    movieImg.attr("src", response.Poster);
    var movieTitle = $("<h1>");
    movieTitle.addClass("movie-title");
    movieTitle.text(response.Title);
    console.log(response.Poster);
    var movieDetail = $("<p>");
    movieDetail.addClass("movie-detail");
    movieDetail.html(
      "Country: " +
        response.Country +
        "<br>" +
        "Director: " +
        response.Director +
        "<br>" +
        "Production: " +
        response.Production +
        "<br>" +
        "Year: " +
        response.Year +
        "<br>" +
        "imdbRating: " +
        response.imdbRating
    );
    $(".movie")
      .prepend(movieDetail)
      .prepend(movieTitle)
      .prepend(movieImg);
  });
}
