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
      searchGifandMovie(this.text);
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
  if (searchContent) {
    $("#userInput").val("");

    $("#button-list").empty();
    Location.push(searchContent);
    generateButton(Location);
  }
  console.log(Location);
});


searchGifandMovie(cityName){

}