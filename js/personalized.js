document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll('nav .nav-link');
  
  // Hautatu Bootstrap-en menu kolapsagarria (id-a zure HTMLaren arabera aldatu behar bada)
  const menuKolapsagarria = document.getElementById('navbarNav'); 

  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      // 1. KLASE AKTIBOA ALDATU
      document.querySelector('nav .nav-link.active')?.classList.remove('active');
      this.classList.add('active');

      // 2. MENUA AUTOMATIKOKI ITXI (Mugikorrean bada eta irekita badago)
      if (menuKolapsagarria && menuKolapsagarria.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(menuKolapsagarria) 
                           || new bootstrap.Collapse(menuKolapsagarria);
        bsCollapse.hide();
      }
    });
  });
});
// Aldagaia globalago utziko dugu DOM kargatzearen barruan denek ikusi dezaten
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Aldagaia hemen goian definitzen dugu, funtzio guztien amaierara arte bizi dadin
  let azkenIrekitakoCard = null;

  // 2. Card-en logika eta pultsazioak
  const cards = document.querySelectorAll('.card[role="button"]');
  cards.forEach(card => {
    // Saguaren klik-a
    card.addEventListener('click', function() {
      azkenIrekitakoCard = this;
    });

    // Teklatuaren pultsazioa (Enter edo Espazioa)
    card.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault(); 
        azkenIrekitakoCard = this; 
        this.click(); 
      }
    });
  });

  // 3. Modalen logika (Ixteko prozesua eta errorearen konponbidea)
  const modalak = document.querySelectorAll('.modal');
  modalak.forEach(modalElement => {
    
    // Konponbidea "aria-hidden" errorerako: fokua barruan hautsi ixten hasten denean
    modalElement.addEventListener('hide.bs.modal', () => {
      if (document.activeElement && modalElement.contains(document.activeElement)) {
        document.activeElement.blur();
      }
    });

    // Fokua jatorrizko card-era bueltatu modala guztiz ezkutatu denean
    modalElement.addEventListener('hidden.bs.modal', () => {
      if (azkenIrekitakoCard) {
        azkenIrekitakoCard.focus();
        azkenIrekitakoCard = null; // Garbitu memoria hurrengo aldirako
      }
    });
    
  });
});

// NAV TO TOP LINK AND FOCUSES MENU ELEMENT

document.addEventListener("DOMContentLoaded", function() {
  // Zure klase zehatzak hautatzen ditugu (. puntuarekin)
  const botoia = document.querySelector(".up-to-top-link");
  const hasieraElementua = document.querySelector(".primary-nav");

  // Ziurtatzen dugu botoia orrialdean dagoela erroreak saihesteko
  if (botoia) {
    // 1. Scroll bidez botoia erakutsi edo ezkutatu
    window.onscroll = function() {
      if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        botoia.style.display = "block";
      } else {
        botoia.style.display = "none";
      }
    };

    // 2. Klik edo Teklatu bidez (Enter/Space) sakatzean exekutatu
    botoia.addEventListener("click", function() {
      // A. Gora igo modu leunean
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      // B. Menuko .active klaseak eguneratu
      const menuAktiboak = document.querySelectorAll('.navbar-nav .active');
      menuAktiboak.forEach(function(element) {
        element.classList.remove('active');
      });

      const lehenengoLotura = document.querySelector('.navbar-nav .nav-link');
      if (lehenengoLotura) {
        lehenengoLotura.classList.add('active');
      }

      // C. Teklatuaren fokoa goiko menuari eman (.primary-nav)
      if (hasieraElementua) {
        hasieraElementua.setAttribute("tabindex", "-1");
        hasieraElementua.focus({ preventScroll: true });
      }
    });
  }
});
