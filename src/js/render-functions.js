import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const galleryList = document.querySelector('.list-gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more');

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <li class="gallery-item">
          <a href="${largeImageURL}">
            <img class="gallery-img" src="${webformatURL}" alt="${tags}" />
            <div class="gallery-info">
              <p>Likes<br> ${likes}</p>
              <p>Views<br> ${views}</p>
              <p>Comments<br> ${comments}</p>
              <p>Downloads<br> ${downloads}</p>
            </div>
          </a>
        </li>
      `
    )
    .join('');

  galleryList.innerHTML += markup;
  lightbox.refresh();
}

export function clearGallery() {
  galleryList.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}

export function showLoadMoreButton() {
  loadMoreButton.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  loadMoreButton.classList.add('hidden');
}
