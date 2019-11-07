let Countries = [
  "australia",
  "usa",
  "india",
  "japan",
  "korea",
  "malaysia",
  "england",
  "china",
  "germany",
  "france",
  "iceland",
  "singapore",
  "spain",
  "italy",
  "sweden",
  "russia"
];

function generateButton() {
  for (let country of Countries) {
    var button = $("<button>");
    $(button).text(country);
    $(button).click(() => {
      searchGifandMovie(country);
    });
    $("#button-list").append(button);
    button.addClass("button-generated fs col-3 col-sm-3 col-md-2 col-lg-1");
  }
}
//initialise button generation on HTML for default options//
generateButton();

//when user clicked on the search button, extra button texted with elements (actually can be anything) will be generated and added to existing button section. Repeat search is restricted.//

$("#search").click(event => {
  event.preventDefault();
  var searchContent = $("#userInput")
    .val()
    .trim()
    .toLowerCase();
  if (searchContent && !Countries.includes(searchContent)) {
    $("#userInput").val("");
    $("#button-list").empty();
    Countries.push(searchContent);
    generateButton(Countries);
  }
});

//function for when user click on each individual item's button to retrieve data using API (giphy and imdb)
function searchGifandMovie(anycountry) {
  let gifName = anycountry;
  let queryUrlGif =
    "https://api.giphy.com/v1/gifs/search?q=" +
    gifName +
    "&api_key=5gOIQ53jSPuWg25UaMaTZuEzaXPZ8qBF&limit=10";
  $.ajax({
    url: queryUrlGif,
    method: "GET"
  }).then(response => {
    //GIPHY PART: only retrieve 10 giphy images at a time//
    for (let i = 0; i < 10; i++) {
      var eachGiphy = $("<img>");
      var rating = $("<p>");
      eachGiphy.addClass("each-giphy");
      eachGiphy.attr("src", response.data[i].images.fixed_height_still.url);

      //adding attributes for state toggle//
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
      //showing giphy rating//
      rating.addClass("each-rating");
      rating.text("RATING: " + response.data[i].rating);

      $(".giphy")
        .prepend(rating)
        .prepend(eachGiphy);
    }
  });

  //IMDB PART: using API to retrieve movie data and display on html page//
  let movieName = anycountry;
  var queryUrlMovie =
    "https://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy";
  $.ajax({
    url: queryUrlMovie,
    method: "GET"
  }).then(response => {
    var movieImg = $("<img>");
    movieImg.addClass("movie-photo");
    movieImg.attr("src", response.Poster);
    var movieTitle = $("<h1>");
    movieTitle.addClass("movie-title");
    movieTitle.text(response.Title);

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
