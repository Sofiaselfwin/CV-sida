const NavBar = {
  template: `
    <nav aria-label="Huvudmeny">
      <a href="erfarenhet.html" :class="getNavClass('erfarenhet.html')">Erfarenhet</a>
      <a href="utbildning-kompetens.html" :class="getNavClass('utbildning-kompetens.html')">Utbildning &amp; kompetens</a>
      <a href="kontakt.html" :class="getNavClass('kontakt.html')">Kontakt</a>
    </nav>
  `,
  methods: {
    getNavClass(href) {
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      const linkPage = href;
      return currentPage === linkPage ? 'nav-link nav-link--primary' : 'nav-link';
    }
  }
};

