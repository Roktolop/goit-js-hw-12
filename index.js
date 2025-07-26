import{S as y,a as L,i as l}from"./assets/vendor-D8_O3--j.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const m=document.querySelector(".gallery"),b=new y(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});function p(t){const r=t.map(({webformatURL:s,largeImageURL:a,tags:e,likes:o,views:i,comments:h,downloads:g})=>`
        <a class="gallery-item" href="${a}">
          <img class="gallery-image" src="${s}" alt="${e}" />
          <ul class="photo-list">
            <li class="photo-item">
              <p class="text">Likes <span class="photo-item-span">${o}</span></p>
            </li>
            <li class="photo-item">
              <p class="text">Views <span class="photo-item-span">${i}</span></p>
            </li>
            <li class="photo-item">
              <p class="text">Comments <span class="photo-item-span">${h}</span></p>
            </li>
            <li class="photo-item">
              <p class="text">Downloads <span class="photo-item-span">${g}</span></p>
            </li>
          </ul>
        </a>
      `).join("");m.insertAdjacentHTML("beforeend",r),b.refresh()}function M(){m.innerHTML=""}function S(){document.querySelector(".loader").classList.add("is-visible")}function q(){document.querySelector(".loader").classList.remove("is-visible")}function d(){document.querySelector(".loadMore-btn").classList.remove("is-hidden")}function u(){document.querySelector(".loadMore-btn").classList.add("is-hidden")}function v(){document.querySelector("#btn-loader").classList.remove("is-hidden")}function w(){document.querySelector("#btn-loader").classList.add("is-hidden")}const P="51409693-2d1545100387263aa5c533cc2";let x=15;async function f(t,r=1){try{const s=await L("https://pixabay.com/api/",{params:{key:P,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:x,page:r}}),{hits:a,totalHits:e}=s.data;return!a||a.length===0?(l.error({message:"Sorry, no images match your search query. Please try again.",position:"topRight"}),{images:[],totalHits:0}):{images:a,totalHits:e}}catch(s){return l.error({title:"Error",message:s.message,position:"topRight"}),{images:[],totalHits:0}}}const $=document.querySelector(".form"),E=document.querySelector('input[name="search-text"]'),H=document.querySelector(".loadMore-btn");document.querySelector("#btn-loader");let n=1,c="",O=0;const A=15;$.addEventListener("submit",D);H.addEventListener("click",I);async function D(t){if(t.preventDefault(),n=1,c=E.value.trim(),!c){l.warning({title:"Warning",message:"Please enter a search query.",position:"topRight"});return}M(),u(),S();try{const{images:r,totalHits:s}=await f(c,n);if(r.length===0)return;O=s,p(r),n+=1,d()}catch(r){console.error("Error fetching images:",r)}finally{q()}}async function I(){u(),v();try{const{images:t}=await f(c,n);p(t),n+=1,n*A>=totalHits?(u(),l.info({title:"Warning",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):d(),d()}catch(t){console.error("Error loading more images:",t)}finally{w()}}
//# sourceMappingURL=index.js.map
