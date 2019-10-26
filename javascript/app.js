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
      eachGiphy.addClass("each-giphy");
      eachGiphy.attr("src", response.data[i].images.fixed_height.url);
      $(".giphy").prepend(eachGiphy);
    }
  });
}
