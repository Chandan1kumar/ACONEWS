// API key for GNews
const apikey = 'c6c1e0e417ab5fbe1bec291e48c53110';

// Base URL for GNews API
const baseUrl = 'https://gnews.io/api/v4/search';

// Function to fetch news based on search query
function fetchNews(query) {
  const lang = 'en';
  const country = 'us';
  const maxResults = 10;
  const url = `${baseUrl}?q=${query}&lang=${lang}&country=${country}&max=${maxResults}&apikey=${apikey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Clear previous news
      const newsContainer = document.getElementById('news-container');
      newsContainer.innerHTML = '';

      // Loop through the articles and display them
      data.articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('article');

        articleElement.innerHTML = `
          <h2>${article.title}</h2>
          <img src="${article.image}" alt="News Image">
          <p>${article.description}</p>
          <a href="${article.url}" target="_blank">Read more</a>
          <p><small>Published at: ${new Date(article.publishedAt).toLocaleDateString()}</small></p>
          <hr>
        `;

        newsContainer.appendChild(articleElement);
      });
    })
    .catch(error => {
      console.error('Error fetching news:', error);
      document.getElementById('news-container').innerHTML = '<p>Sorry, something went wrong while fetching the news.</p>';
    });
}

// Event listener for the desktop search form
document.getElementById('searchForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const query = document.getElementById('searchInput').value;
  fetchNews(query);
});

// Event listener for the mobile search form
document.getElementById('searchFormMobile').addEventListener('submit', function (e) {
  e.preventDefault();
  const query = document.getElementById('searchInputMobile').value;
  fetchNews(query);
});

// Function to fetch news based on category
function Search(category) {
  fetchNews(category);
}

// Load default news (technology) on page load
window.onload = function () {
  fetchNews('technology');
};
