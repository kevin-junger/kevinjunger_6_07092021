function fetchProfiles () {
  fetch('../../FishEyeData.json')
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      const container = document.querySelector('.profiles')
      for (i = 0; i < data.photographers.length; i++) {
        container.insertAdjacentHTML(
          'beforeend',
          `<figure class="profile" id="${data.photographers[i].id}"></figure>`
        )
        const figure = document.getElementById(data.photographers[i].id)
        figure.insertAdjacentHTML(
          'beforeend',
          `<img class="profile__pic pp--big"
            src="content/photographers/${data.photographers[i].portrait}"
            alt="${data.photographers[i].name}"
          />
          <figcaption class="profile__caption"></figcaption>`
        )
        const figcaption = figure.querySelector('.profile__caption')
        figcaption.insertAdjacentHTML(
          'beforeend',
          `<h2 class="profile__name">${data.photographers[i].name}</h2>
          <h3 class="profile__location">${data.photographers[i].city}, ${data.photographers[i].country}</h3>
          <blockquote class="profile__quote">
            ${data.photographers[i].tagline}
          </blockquote>
          <h4 class="profile__price">${data.photographers[i].price}€/jour</h4>
          <ul class="profile__tags tags"></ul>`
        )
        const tags = figcaption.querySelector('.profile__tags')
        tags.insertAdjacentHTML(
          'beforeend',
          data.photographers[i].tags
            .map((tag) => `<li class="profile__tag tags__tag">#${tag}</li>`)
            .join('')
        )
      }
    })
}
function fetchProfile () {
  fetch('../../FishEyeData.json')
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      const container = document.querySelector('.about')
      for (i = 0; i < data.photographers.length; i++) {
        if (data.photographers[i].id === 243) {
          container.insertAdjacentHTML(
            'afterbegin',
            `<img
              class="about__pic pp"
              src="content/photographers/${data.photographers[i].portrait}"
              alt="${data.photographers[i].name}"
            />
            <h2 class="about__name">${data.photographers[i].name}</h2>
            <h3 class="about__location">${data.photographers[i].city}, ${data.photographers[i].country}</h3>
            <blockquote class="about__quote">
              ${data.photographers[i].tagline}
            </blockquote>
            <ul class="about__tags tags></ul><button type="button" class="about__cta cta">
            <button type="button" class="about__cta cta">
            Contactez-moi
          </button>`
          )
          const tags = document.querySelector('.about__tags')
          tags.insertAdjacentHTML(
            'beforeend',
            data.photographers[i].tags
              .map((tag) => `<li class="about__tag tags__tag">#${tag}</li>`)
              .join('')
          )
        }
      }
    })
}
