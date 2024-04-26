// Denne funktion henter vores data fra json filen.
d3.json("/albums.json").then(function (data) {
  // Her laver vi et tomt array
  let cdObjects = [];
  // Laver et CD object for hvert element i json array'et
  for (let i in data) {
    let cd = new CD(
      data[i].artistName,
      data[i].albumName,
      data[i].trackList.length
    );
    //Vi skubber den færdige instans i vores tomme array
    cdObjects.push(cd);
  }
  // Vi får fat i vores dropdown element fra dom
  let dropdown = document.getElementById("dropdown");

  // Vi tilføjer en eventlistner til vores dropdown variablen så lytter til der sker en ændring.
  dropdown.addEventListener("change", function () {
    d3.select("#result").selectAll("p").remove();

    //Vi registrere hvilken genre der er valgt i dropdown
    let selectedOption = dropdown.options[dropdown.selectedIndex].text;

    d3.select("#result")
      .selectAll("p")
      .data(data)
      .enter()
      .append("p")
      .text(function (album) {
        if (album.genre == selectedOption) {
          return album.artistName + " - " + album.albumName;
        }
      });
  });
});

function CD(artist, title, numberOfTracks) {
  this.artist = artist;
  this.title = title;
  this.numberOfTracks = numberOfTracks;
}
