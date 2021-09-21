export default class Nav {
  constructor(data) {
    if (Nav.exists) {
      return Nav.instance;
    }
    this.data = data;
    Nav.instance = this;
    Nav.exists = true;
    return this;
  }
  async display() {
    document.querySelector(".navbar").insertAdjacentHTML('beforeend',`
      <ul class="navbar__categories tags">
        ${this.data.map((tag) => `<li class="navbar__category tags__tag">#${tag}</li>`).join(' ')}
      </ul>
    `)
  }
}