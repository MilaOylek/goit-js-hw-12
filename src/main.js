// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';
// import { getImagesByQuery } from './js/pixabay-api';
// import {
//   createGallery,
//   clearGallery,
//   showLoader,
//   hideLoader,
// } from './js/render-functions';

// const form = document.querySelector('.form');
// const input = form.querySelector('input');

// form.addEventListener('submit', event => {
//   event.preventDefault();
//   const query = input.value.trim();

//   if (!query) {
//     iziToast.error({
//       title: 'Error',
//       message: 'Please enter a search query.',
//     });
//     return;
//   }

//   showLoader();
//   clearGallery();

//   getImagesByQuery(query)
//     .then(data => {
//       hideLoader();

//       if (data.hits.length === 0) {
//         iziToast.info({
//           title: 'Info',
//           message:
//             'Sorry, there are no images matching your search query. Please try again!',
//         });
//         return;
//       }

//       createGallery(data.hits);
//     })
//     .catch(() => {
//       hideLoader();
//       iziToast.error({
//         title: 'Error',
//         message: 'Failed to fetch images. Please try again later.',
//       });
//     })
//     .finally(() => {
//       form.reset();
//     });
// });

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const input = form.querySelector('input');
const loadMoreButton = document.querySelector('.load-more');

let searchQuery = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();
  searchQuery = input.value.trim();
  page = 1;

  if (!searchQuery) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
    });
    return;
  }

  showLoader();
  clearGallery();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(searchQuery, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.info({
        title: 'Info',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    createGallery(data.hits);
    if (data.hits.length < totalHits) {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
    });
  } finally {
    hideLoader();
    form.reset();
  }
});

loadMoreButton.addEventListener('click', async () => {
  page += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(searchQuery, page);

    createGallery(data.hits);
    if (page * 15 >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton();
    }
    const { height: cardHeight } = document
      .querySelector('.gallery-item')
      .getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch more images. Please try again later.',
    });
  } finally {
    hideLoader();
  }
});