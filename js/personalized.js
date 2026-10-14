document.addEventListener("DOMContentLoaded", () => {
  // Menuko esteka guztiak hautatu (egokitu hautatzailea zure HTMLaren arabera)
  const navLinks = document.querySelectorAll('nav .nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      // 1. Kendu .active klasea une horretan aktibo dagoenari
      document.querySelector('nav .nav-link.active')?.classList.remove('active');
      
      // 2. Gehitu .active klasea klikatu berri duzun elementuari
      this.classList.add('active');
    });
  });
});
