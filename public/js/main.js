function fetchProfiles() {
  fetch("../../FishEyeData.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let html = "";
      for (i = 0; i < data.photographers.length; i++) {
        html += `<figure class="profile">
          <img class="profile__pic pp--big"
            src="content/photographers/${data.photographers[i].portrait}"
            alt="${data.photographers[i].name}"
          />
          <figcaption class="profile__caption">
            <h2 class="profile__name">${data.photographers[i].name}</h2>
            <h3 class="profile__location">${data.photographers[i].city}, ${data.photographers[i].country}</h3>
            <blockquote class="profile__quote">
              ${data.photographers[i].tagline}
            </blockquote>
            <h4 class="profile__price">${data.photographers[i].price}€/jour</h4>
            <ul class="profile__tags tags">`;
        let tags = data.photographers[i].tags
          .map((tag) => `<li class="profile__tag tags__tag">#${tag}</li>`)
          .join("");
        html += `${tags}
            </ul>
          </figcaption>
        </figure>`;
      }
      document.querySelector(".profiles").innerHTML = html;
    });
}
function fetchProfile() {
  fetch("../../FishEyeData.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let html = "";
      for (i = 0; i < data.photographers.length; i++) {
        if (data.photographers[i].id === 243) {
          html += `<img
              class="about__pic pp"
              src="content/photographers/${data.photographers[i].portrait}"
              alt="${data.photographers[i].name}"
            />
            <h2 class="about__name">${data.photographers[i].name}</h2>
            <h3 class="about__location">${data.photographers[i].city}, ${data.photographers[i].country}</h3>
            <blockquote class="about__quote">
              ${data.photographers[i].tagline}
            </blockquote>`;
          let tags = data.photographers[i].tags
            .map((tag) => `<li class="about__tag tags__tag">#${tag}</li>`)
            .join("");
          html += `${tags}
          </ul>
          <button type="button" class="about__cta cta">
            Contactez-moi
          </button>`;
        }
      }
      document.querySelector(".about").innerHTML = html;
    });
}
fetchProfiles();
fetchProfile();
