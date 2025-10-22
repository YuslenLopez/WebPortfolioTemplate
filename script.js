//for projects page 

 // Minimal JS to make search + filter behave (optional).
    // Drop into page if you want interactive filtering/searching.
    (function () {
      const grid = document.getElementById('projects-grid');
      const cards = Array.from(grid.querySelectorAll('.card'));
      const search = document.getElementById('search');
      const filterButtons = document.querySelectorAll('.filter');

      function showCard(card) { card.style.display = ''; }
      function hideCard(card) { card.style.display = 'none'; }

      function applyFilter(filter) {
        filterButtons.forEach(b => b.classList.toggle('active', b.dataset.filter === filter));
        cards.forEach(card => {
          const tags = card.dataset.tags.split(' ');
          if (filter === '*' || tags.includes(filter)) showCard(card); else hideCard(card);
        });
      }

      function applySearch(q) {
        const txt = q.trim().toLowerCase();
        cards.forEach(card => {
          const title = card.querySelector('.card-title').textContent.toLowerCase();
          const desc = card.querySelector('.card-desc').textContent.toLowerCase();
          const tags = card.dataset.tags.toLowerCase();
          const match = !txt || title.includes(txt) || desc.includes(txt) || tags.includes(txt);
          card.style.display = match ? '' : 'none';
        });
      }

      // Wire filter buttons
      filterButtons.forEach(btn => btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        applyFilter(filter);
      }));

      // Search input (debounced)
      let timeout;
      search.addEventListener('input', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => applySearch(search.value), 200);
      });

      // Default show all
      applyFilter('*');
    })();