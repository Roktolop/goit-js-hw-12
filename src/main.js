'use strict';

import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import {
  createGallery,
  clearGallery,
  hideLoader,
  showLoader,
  hideLoadMoreBtn,
  showLoadMoreBtn,
  hideMoreLoader,
  showMoreLoader,
} from './js/render-functions.js';

import { getImagesByQuery, perPage } from './js/pixabay-api.js';

const form = document.querySelector('.form');
const input = document.querySelector('input[name="search-text"]');
const btnLoadMore = document.querySelector('.loadMore-btn');

let currentPage = 1;
let currentQuery = '';
let totalAvailableImages = 0;

form.addEventListener('submit', onFormSubmit);
btnLoadMore.addEventListener('click', onLoadMore);

async function onFormSubmit(event) {
  event.preventDefault();

  currentPage = 1;
  currentQuery = input.value.trim();

  if (!currentQuery) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  hideLoadMoreBtn();
  showLoader();

  try {
    const { images, totalHits } = await getImagesByQuery(currentQuery, currentPage);

    if (images.length === 0) {
      iziToast.info({
        title: 'No results',
        message: 'No images found. Please try another query.',
        position: 'topRight',
      });
      return;
    }

    totalAvailableImages = totalHits;

    createGallery(images);

    currentPage += 1;

    if (currentPage * perPage >= totalAvailableImages) {
      iziToast.info({
        title: 'End of results',
        message: `You've reached the end of search results.`,
        position: 'topRight',
      });
    } else {
      showLoadMoreBtn();
    }

  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong while fetching images.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  hideLoadMoreBtn();
  showMoreLoader();

  try {
    const { images } = await getImagesByQuery(currentQuery, currentPage);

    if (!images || images.length === 0) {
      iziToast.info({
        title: 'Info',
        message: 'No more images found.',
        position: 'topRight',
      });
      hideLoadMoreBtn();
      return;
    }

    createGallery(images);

    // Плавне прокручування
    const firstGalleryItem = document.querySelector('.gallery-item');
    if (firstGalleryItem) {
      const cardHeight = firstGalleryItem.getBoundingClientRect().height;

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    currentPage += 1;

    // Перевірка фактичної кількості зображень у галереї
    const totalLoadedImages = document.querySelectorAll('.gallery-item').length;

    if (totalLoadedImages >= totalAvailableImages) {
      hideLoadMoreBtn();
      iziToast.info({
        title: 'End of Results',
        message: `You've reached the end of search results.`,
        position: 'topRight',
      });
    } else {
      showLoadMoreBtn();
    }
  } catch (error) {
    console.error('Error loading more images:', error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideMoreLoader();
  }
}

