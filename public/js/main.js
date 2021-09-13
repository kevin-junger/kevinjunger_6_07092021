function fetchProfiles () {
  fetch('../../FishEyeData.json')
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      const container = document.querySelector('.profiles')
      for (const photographer of data.photographers) {
        container.insertAdjacentHTML(
          'beforeend',
          `<figure class="profile" id="${photographer.id}"></figure>`
        )
        const figure = document.getElementById(photographer.id)
        figure.insertAdjacentHTML(
          'beforeend',
          `<img class="profile__pic pp--big"
            src="content/photographers/${photographer.portrait}"
            alt="${photographer.name}"
          />
          <figcaption class="profile__caption"></figcaption>`
        )
        const figcaption = figure.querySelector('.profile__caption')
        figcaption.insertAdjacentHTML(
          'beforeend',
          `<h2 class="profile__name">${photographer.name}</h2>
          <h3 class="profile__location">${photographer.city}, ${photographer.country}</h3>
          <blockquote class="profile__quote">
            ${photographer.tagline}
          </blockquote>
          <h4 class="profile__price">${photographer.price}€/jour</h4>
          <ul class="profile__tags tags"></ul>`
        )
        const tags = figcaption.querySelector('.profile__tags')
        tags.insertAdjacentHTML(
          'beforeend',
          photographer.tags
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
      for (const photographer of data.photographers) {
        if (photographer.id === 243) {
          container.insertAdjacentHTML(
            'afterbegin',
            `<img
              class="about__pic pp"
              src="content/photographers/${photographer.portrait}"
              alt="${photographer.name}"
            />
            <h2 class="about__name">${photographer.name}</h2>
            <h3 class="about__location">${photographer.city}, ${photographer.country}</h3>
            <blockquote class="about__quote">
              ${photographer.tagline}
            </blockquote>
            <ul class="about__tags tags></ul><button type="button" class="about__cta cta">
            <button type="button" class="about__cta cta">
            Contactez-moi
          </button>`
          )
          const tags = document.querySelector('.about__tags')
          tags.insertAdjacentHTML(
            'beforeend',
            photographer.tags
              .map((tag) => `<li class="about__tag tags__tag">#${tag}</li>`)
              .join('')
          )
        }
      }
    })
}
