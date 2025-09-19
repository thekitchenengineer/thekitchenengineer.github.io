document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("see-more-grid");
  const currentPage = window.location.pathname.split("/").pop();

  // Skip if manual cards exist
  if (grid.children.length > 0) {
    console.log("Manual See More cards found — skipping autopull.");
    return;
  }

  // Otherwise autopull from JSON
  fetch("articles.json")
    .then(response => response.json())
    .then(articles => {
      const others = articles.filter(article => article.url !== currentPage);
      const shuffled = others.sort(() => 0.5 - Math.random()).slice(0, 3);

      shuffled.forEach(article => {
        const card = document.createElement("a");
        card.href = article.url;
        card.className = "see-more-card";
        card.innerHTML = `
          <img src="${article.image}" alt="${article.title}">
          <h3>${article.title}</h3>
        `;
        grid.appendChild(card);
      });
    })
    .catch(err => console.error("Error loading articles:", err));
});
