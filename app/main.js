import App from './data/App.js';

(function launch() {
  new App()
    .get()
    .then((data) => {
      if (data === undefined) {
        throw Error();
      }
      const url = new URLSearchParams(window.location.search);
      if (url.has('photographer')) {
        const id = parseInt(url.get('photographer'), 10);
        data.photographers.forEach((profile) => {
          if (profile.id === id) {
            const html = `
              <section class="about">
                <img
                  class="about__pic pp"
                  src="public/content/photographers/${profile.portrait}"
                  alt="${profile.name}"
                />
                <h2 class="about__name">${profile.name}</h2>
                <h3 class="about__location">
                  ${profile.city}, ${profile.country}
                </h3>
                <blockquote class="about__quote">
                  ${profile.tagline}
                </blockquote>
                <ul class="about__tags tags">
                  ${profile.tags.map(
    (tag) => `<li class="about__tag tags__tag">#${tag}</li>`,
  ).join(' ')}
                </ul><button type="button" class="about__cta cta">
                <button type="button" class="about__cta cta">
                  Contactez-moi
                </button>
              </section>
            `;
            document.querySelector('.container').innerHTML = html;
          }
        });
        document
          .querySelector('.container')
          .insertAdjacentHTML('beforeend', '<section class="work"></section>');
        data.media.forEach((medium) => {
          if (medium.photographerId === id) {
            let html = '<figure class="work__card">';
            if (typeof medium.image === 'undefined') {
              html += `
                <video controls class="work__display">
                  <source 
                    src="public/content/media/${id}/${medium.video}" 
                    type="video/mp4"
                  />
                </video>
              `;
            } else {
              html += `
                <img
                  class="work__display"
                  src="public/content/media/${id}/${medium.image}"
                  alt=""
                />
              `;
            }
            html += `
                  <figcaption class="work__caption">
                  <h2 class="work__desc">${medium.title}</h2>
                  <div class="work__like like">
                    <span class="like__count">${medium.likes}</span>
                    <i class="like__heart fas fa-heart"></i>
                  </div>
                </figcaption>
              </figure>
            `;
            document.querySelector('.work').innerHTML += html;
          }
        });
      } else {
        data.photographers.forEach((photographer) => {
          const html = `
            <figure class="profile">
              <a href="/index.html?photographer=${photographer.id}"><img class="profile__pic pp--big"
                src="public/content/photographers/${photographer.portrait}"
                alt="${photographer.name}"
              /></a>
              <figcaption class="profile__caption">
              <a href="/index.html?photographer=${photographer.id}"><h2 class="profile__name">${photographer.name}</h2></a>
                <h3 class="profile__location">
                  ${photographer.city}, ${photographer.country}
                </h3>
                <blockquote class="profile__quote">
                  ${photographer.tagline}
                </blockquote>
                <h4 class="profile__price">${photographer.price}€/jour</h4>
                <ul class="profile__tags tags">
                  ${photographer.tags
    .map((tag) => `<li class="profile__tag tags__tag">#${tag}</li>`)
    .join(' ')}
                </ul>
              </figcaption>
            </figure>
          `;
          document.querySelector('.container').innerHTML += html;
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
}());
