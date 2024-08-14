'use strict';

// modal variables
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');

// modal function
const modalCloseFunc = function () { modal.classList.add('closed') }

// modal eventListener
modalCloseOverlay.addEventListener('click', modalCloseFunc);
modalCloseBtn.addEventListener('click', modalCloseFunc);

// search function
function search() {
  var searchTerm = document.getElementById('searchField').value.trim();

  if (searchTerm !== '') {
    addToSearchHistory(searchTerm);
    // Redirect to search results page with the search term as a query parameter
    window.location.href = 'search-results.html?q=' + encodeURIComponent(searchTerm);
  }
}

function addToSearchHistory(term) {
  var searchHistory = localStorage.getItem('searchHistory');
  searchHistory = searchHistory ? JSON.parse(searchHistory) : [];

  searchHistory.unshift(term);

  if (searchHistory.length > 5) {
    searchHistory.pop();
  }

  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

function updateSearchHistoryUI(history) {
  var searchHistoryContainer = document.getElementById('searchHistory');
  searchHistoryContainer.innerHTML = ''; // Clear previous search history

  history.forEach(function(term) {
    var searchItem = document.createElement('div');
    searchItem.textContent = term;
    searchItem.classList.add('search-history-item');
    searchItem.addEventListener('click', function() {
      document.getElementById('searchField').value = term;
      search();
    });
    searchHistoryContainer.appendChild(searchItem);
  });
}

function showSearchHistory() {
  var searchTerm = document.getElementById('searchField').value.trim();
  var searchHistoryContainer = document.getElementById('searchHistory');

  if (searchTerm !== '') {
    var searchHistory = localStorage.getItem('searchHistory');
    if (searchHistory) {
      updateSearchHistoryUI(JSON.parse(searchHistory));
      searchHistoryContainer.style.display = 'block'; // Show search history
    }
  } else {
    searchHistoryContainer.style.display = 'none'; // Hide search history
  }
}

window.onload = function() {
  showSearchHistory(); // Show search history initially if there's any stored
};




// notification toast variables
const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');

// notification toast eventListener
toastCloseBtn.addEventListener('click', function () {
  notificationToast.classList.add('closed');
});





// mobile menu variables
const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

for (let i = 0; i < mobileMenuOpenBtn.length; i++) {

  // mobile menu function
  const mobileMenuCloseFunc = function () {
    mobileMenu[i].classList.remove('active');
    overlay.classList.remove('active');
  }

  mobileMenuOpenBtn[i].addEventListener('click', function () {
    mobileMenu[i].classList.add('active');
    overlay.classList.add('active');
  });

  mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
  overlay.addEventListener('click', mobileMenuCloseFunc);

}







// accordion variables
const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');

for (let i = 0; i < accordionBtn.length; i++) {

  accordionBtn[i].addEventListener('click', function () {

    const clickedBtn = this.nextElementSibling.classList.contains('active');

    for (let i = 0; i < accordion.length; i++) {

      if (clickedBtn) break;

      if (accordion[i].classList.contains('active')) {

        accordion[i].classList.remove('active');
        accordionBtn[i].classList.remove('active');

      }

    }

    this.nextElementSibling.classList.toggle('active');
    this.classList.toggle('active');

  });

}