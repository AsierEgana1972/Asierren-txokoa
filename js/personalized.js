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
