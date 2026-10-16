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
      const modalId = this.getAttribute('data-target-modal');
      const modalElement = document.querySelector(modalId);
      
      // Bootstrap modal instantzia sortu eta erakutsi
      const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
      modal.show();
    }
  });
});
