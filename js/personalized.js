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
// Card guztiak hautatu
const cards = document.querySelectorAll('.card[role="button"]');

cards.forEach(card => {
  // Teklatuaren pultsazioak entzun
  card.addEventListener('keydown', function(event) {
    // 13 = Enter / Intro, 32 = Espazioa
    if (event.key === 'Enter' || event.key === ' ') {
      // Espazioa sakatzean orrialdeak behera scrollik ez egiteko
      event.preventDefault(); 
      
      // Lortu ireki nahi den modalaren IDa
      const modalId = this.getAttribute('data-bs-target');
      const modalElement = document.querySelector(modalId);
      
      // Bootstrap modal instantzia sortu eta erakutsi
      const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
      modal.show();
    }
  });
});

//Modala ixtean, fokua berriz klikatutako azken elementura bueltatu
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card[role="button"]');
  
  // Azkenengo irekitako card-a memorian gordetzeko aldagaia
  let azkenIrekitakoCard = null;

  cards.forEach(card => {
    // 1. Saguaren klik-a entzun, card-a gordetzeko
    card.addEventListener('click', function() {
      azkenIrekitakoCard = this;
    });

    // 2. Teklatuaren pultsazioa entzun (lehengo bera)
    card.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault(); 
        azkenIrekitakoCard = this; // Gordetzailea hemen ere bai
        this.click(); 
      }
    });
  });

  // 3. Modala ixteko gertaera entzun globaletatik (Bootstrap 5 modal guztientzat)
  const modalak = document.querySelectorAll('.modal');
  modalak.forEach(modalElement => {
    // Bootstrap-ek modala guztiz ezkutatu duenean exekutatzen da gertaera hau
    modalElement.addEventListener('hidden.bs.modal', () => {
      // Azken card-a gordeta badago, fokua itzuli
      if (azkenIrekitakoCard) {
        azkenIrekitakoCard.focus();
        azkenIrekitakoCard = null; // Garbitu memoria hurrengo aldirako
      }
    });
  });
});

//nabigatzaile batzuek antzematen duten modaletako aria-hidden eta focus arteko arazoa konpontzeko
document.addEventListener('DOMContentLoaded', () => {
  // ... Lehengo zure kodea (cards, azkenIrekitakoCard, etab.) ...

  const modalak = document.querySelectorAll('.modal');
  modalak.forEach(modalElement => {
    
    // BERRIA: Konponbidea errorearentzat. Animazioa hasi bezain laster exekutatzen da.
    modalElement.addEventListener('hide.bs.modal', () => {
      // Modala ixten hasi denez, kendu fokua barruan dagoen edozein elementuri (blur)
      if (document.activeElement && modalElement.contains(document.activeElement)) {
        document.activeElement.blur();
      }
    });

    // Lehengo gertaera (GARRANTZITSUA: honek fokua card-era bueltatzen jarraitzen du)
    modalElement.addEventListener('hidden.bs.modal', () => {
      if (azkenIrekitakoCard) {
        azkenIrekitakoCard.focus();
        azkenIrekitakoCard = null; 
      }
    });
    
  });
});
