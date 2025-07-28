'use strict';

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
let loadedImagesCount = 0;

form.addEventListener('submit', onFormSubmit);
btnLoadMore.addEventListener('click', onLoadMore);

async function onFormSubmit(event) {
  event.preventDefault();

  currentQuery = input.value.trim();
  currentPage = 1;
  loadedImagesCount = 0;
  totalAvailableImages = 0;

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
  showLoader(); // тільки головний лоадер

  try {
    const { images, totalHits } = await getImagesByQuery(currentQuery, currentPage);

    if (!images || images.length === 0) return;

    totalAvailableImages = totalHits;
    loadedImagesCount += images.length;
    createGallery(images);

    // Перевірка чи ще є що завантажити
    if (loadedImagesCount < totalAvailableImages) {
      showLoadMoreBtn();
    } else {
      hideLoadMoreBtn();
    }

    currentPage += 1;
  } catch (error) {
    console.error('Error fetching images:', error);
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  hideLoadMoreBtn();
  showMoreLoader(); // тільки "ще" лоадер

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

    loadedImagesCount += images.length;
    createGallery(images);

    // Плавне прокручування на 2 висоти
    const firstGalleryItem = document.querySelector('.gallery-item');
    if (firstGalleryItem) {
      const cardHeight = firstGalleryItem.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    if (loadedImagesCount < totalAvailableImages) {
      showLoadMoreBtn();
    } else {
      hideLoadMoreBtn();
      iziToast.info({
        title: 'End of Results',
        message: `You've reached the end of search results.`,
        position: 'topRight',
      });
    }

    currentPage += 1;
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
