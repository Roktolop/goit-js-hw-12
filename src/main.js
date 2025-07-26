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
import { getImagesByQuery } from './js/pixabay-api.js';

const form = document.querySelector('.form');
const input = document.querySelector('input[name="search-text"]');
const btnLoadMore = document.querySelector('.loadMore-btn');
const moreLoader = document.querySelector("#btn-loader")


let currentPage = 1;
let currentQuery = '';
let totalAvailableImages = 0;
const perPage = 15;

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

    if (images.length === 0) return;

    totalAvailableImages = totalHits;
    createGallery(images);
    currentPage += 1;
    showLoadMoreBtn();
  } catch (error) {
    console.error('Error fetching images:', error);
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  hideLoadMoreBtn();
  showMoreLoader();

  try {
    const { images } = await getImagesByQuery(currentQuery, currentPage);

    createGallery(images);

    const firstGalleryItem = document.querySelector('.gallery-item');
    if (firstGalleryItem) {
      const cardHeight = firstGalleryItem.getBoundingClientRect().height;

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    currentPage += 1;

    if (currentPage * perPage >= totalAvailableImages) {
      hideLoadMoreBtn();
      iziToast.info({
        title: 'Warning',
        message: `We're sorry, but you've reached the end of search results.`,
        position: 'topRight',
    });
      
    } else {
      showLoadMoreBtn();
    }

    showLoadMoreBtn();
  } catch (error) {
    console.error('Error loading more images:', error);
  } finally {
    hideMoreLoader();
   
  }
}




