// tabs-responsive.js
document.addEventListener('DOMContentLoaded', function () {
  const selectMobile = document.getElementById('tabSelectMobile');
  
  if (selectMobile) {
    // Mugikorrean dropdown-a aldatzen denean
    selectMobile.addEventListener('change', function (e) {
      const targetTarget = e.target.value;
      const tabTriggerButton = document.querySelector(`[data-bs-target="${targetTarget}"]`);
      
      if (tabTriggerButton) {
        const tab = new bootstrap.Tab(tabTriggerButton);
        tab.show();
      }
    });
  }

  // Ordenagailuan klik egitean, mugikorreko dropdown-a ere sinkronizatu
  const tabButtons = document.querySelectorAll('[data-bs-toggle="tab"]');
  tabButtons.forEach(button => {
    button.addEventListener('shown.bs.tab', function (e) {
      const targetId = e.target.getAttribute('data-bs-target');
      if (selectMobile) {
        selectMobile.value = targetId;
      }
    });
  });
});
