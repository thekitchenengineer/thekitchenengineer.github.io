// see-more.js — robust autopull for "See More"
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("see-more-grid");
  if (!grid) return console.warn("see-more: no container found (#see-more-grid).");

  // if you manually added cards in HTML, keep them (manual override)
  if (grid.children.length > 0) {
    console.log("see-more: manual cards detected — skipping autopull.");
    return;
  }

  // compute base absolute URL so fetch works from any page path
  const base = window.location.origin; // e.g. https://thekitchenengineer.github.io
  const jsonUrl = `${base}/articles.json`;

  fetch(jsonUrl)
    .then(resp => {
      if (!resp.ok) throw new Error(`see-more: failed to fetch ${jsonUrl} (${resp.status})`);
      return resp.json();
    })
    .then(articles => {
      const current = window.location.pathname.split("/").pop();
      const others = articles.filter(a => a.url !== current);

      // shuffle and pick up to 3
      const shuffled = others.sort(() => 0.5 - Math.random()).slice(0, 3);
      if (shuffled.length === 0) {
        console.warn("see-more: no other articles found in articles.json");
        return;
      }

      shuffled.forEach(a => {
        // make absolute image path safe if user gave relative
        const img = a.image && (a.image.startsWith("/") ? a.image : `${base}/${a.image}`);

        const card = document.createElement("a");
        card.className = "see-more-card";
        card.href = a.url;
        card.innerHTML = `
          <img src="${img || `${base}/assets/default-teaser.jpg`}" alt="${escapeHtml(a.title)}">
          <h3>${escapeHtml(a.title)}</h3>
        `;
        grid.appendChild(card);
      });
    })
    .catch(err => {
      console.error("see-more error:", err);
      // optional: show a subtle message to the user or leave the section empty
    });

  function escapeHtml(s){ return String(s).replace(/[&<>"']/g,c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[c]); }
});
