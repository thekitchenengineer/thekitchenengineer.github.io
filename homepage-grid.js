fetch('articles.json')
  .then(response => response.json())
  .then(data => {
    const grid = document.getElementById('homepage-grid');
    const latest = data.slice(0, 9); // show 9 latest articles
    latest.forEach(article => {
      const card = document.createElement('div');
      card.classList.add('article-card');
      card.innerHTML = `
        <a href="${article.url}">
          <img src="${article.image}" alt="${article.title}">
          <h3>${article.title}</h3>
          <p>${article.description}</p>
        </a>
      `;
      grid.appendChild(card);
    });
  })
  .catch(err => console.error('Error loading articles:', err));
