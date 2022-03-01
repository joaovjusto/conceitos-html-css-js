let el = document.getElementById("name");

if (el) {
  // Ouvir Input
  el.addEventListener("input", (evt) => {
    console.log(el.value, evt);
    if (el.value) {
      el.style.borderColor = "green";
    } else {
      el.style.borderColor = "#d4d4d4";
      el.style.color = "black";
    }
  });

  //   Ouvir keypress
  el.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      if (el.value.includes("Pokemon Name: ")) {
        let pokemonName = el.value.split(": ")[1];

        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
          .then((response) => response.json())
          .then((data) => {
            Object.keys(data.sprites).forEach((pokemonSpriteName) => {
              // Validando se é url
              if (typeof data.sprites[pokemonSpriteName] === "string") {
                let image = document.createElement("img");
                image.src = data.sprites[pokemonSpriteName];
                document.querySelector(".images").appendChild(image);

                el.style.color = "green";
              }
            });
          })
          .catch((error) => {
            console.error("Error:", error);
            el.style.borderColor = "red";
            el.style.color = "red";
          });
      }
    }
  });
}
