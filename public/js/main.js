function fetchData() {
  fetch("../../FishEyeData.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.photographers);
      document.getElementById('test').innerHTML = 
        `<img class="profile__pic pp--big"
          src="content/photographers/${data.photographers[0].portrait}"
          alt="${data.photographers[0].name}"
        />
        <figcaption class="profile__caption">
          <h2 class="profile__name">${data.photographers[0].name}</h2>
          <h3 class="profile__location">${data.photographers[0].city}, ${data.photographers[0].country}</h3>
          <blockquote class="profile__quote">
            ${data.photographers[0].tagline}
          </blockquote>
          <h4 class="profile__price">${data.photographers[0].price}€/jour</h4>
          <ul class="profile__tags tags">
            <li class="tags__tag">#${data.photographers[0].tags[0]}</li>
            <li class="tags__tag">#${data.photographers[0].tags[1]}</li>
            <li class="tags__tag">#${data.photographers[0].tags[2]}</li>
            <li class="tags__tag">#${data.photographers[0].tags[3]}</li>
          </ul>
        </figcaption>`;
    });
}
fetchData();
