let currentIndex = 0;
const batchSize = 6; // number of articles per load

fetch('articles.json')
  .then(response => response.json())
  .then(data => {
    const grid = document.getElementById('homepage-grid');
    const loadMoreBtn = document.getElementById('load-more');

    function loadArticles() {
      const nextBatch = data.slice(currentIndex, currentIndex + batchSize);
      nextBatch.forEach(article => {
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
      currentIndex += batchSize;

      // hide button when all articles are loaded
      if (currentIndex >= data.length) {
        loadMoreBtn.style.display = 'none';
      }
    }

    // load first batch on page load
    loadArticles();

    // load more on button click
    loadMoreBtn.addEventListener('click', loadArticles);
  })
  .catch(err => console.error('Error loading articles:', err));
