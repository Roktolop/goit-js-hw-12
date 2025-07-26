import{S as g,a as L,i as l}from"./assets/vendor-D8_O3--j.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const d=document.querySelector(".gallery"),b=new g(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});function u(t){const r=t.map(({webformatURL:s,largeImageURL:a,tags:e,likes:o,views:n,comments:h,downloads:y})=>`
        <a class="gallery-item" href="${a}">
          <img class="gallery-image" src="${s}" alt="${e}" />
          <ul class="photo-list">
            <li class="photo-item">
              <p class="text">Likes <span class="photo-item-span">${o}</span></p>
            </li>
            <li class="photo-item">
              <p class="text">Views <span class="photo-item-span">${n}</span></p>
            </li>
            <li class="photo-item">
              <p class="text">Comments <span class="photo-item-span">${h}</span></p>
            </li>
            <li class="photo-item">
              <p class="text">Downloads <span class="photo-item-span">${y}</span></p>
            </li>
          </ul>
        </a>
      `).join("");d.insertAdjacentHTML("beforeend",r),b.refresh()}function M(){d.innerHTML=""}function S(){document.querySelector(".loader").classList.add("is-visible")}function q(){document.querySelector(".loader").classList.remove("is-visible")}function m(){document.querySelector(".loadMore-btn").classList.remove("is-hidden")}function p(){document.querySelector(".loadMore-btn").classList.add("is-hidden")}function v(){document.querySelector("#btn-loader").classList.remove("is-hidden")}function w(){document.querySelector("#btn-loader").classList.add("is-hidden")}const x="51409693-2d1545100387263aa5c533cc2";let P=15;async function f(t,r=1){try{const s=await L("https://pixabay.com/api/",{params:{key:x,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:P,page:r}}),{hits:a,totalHits:e}=s.data;return!a||a.length===0?(l.error({message:"Sorry, no images match your search query. Please try again.",position:"topRight"}),{images:[],totalHits:0}):{images:a,totalHits:e}}catch(s){return l.error({title:"Error",message:s.message,position:"topRight"}),{images:[],totalHits:0}}}const E=document.querySelector(".form"),$=document.querySelector('input[name="search-text"]'),H=document.querySelector(".loadMore-btn");document.querySelector("#btn-loader");let i=1,c="",O=0;E.addEventListener("submit",A);H.addEventListener("click",D);async function A(t){if(t.preventDefault(),i=1,c=$.value.trim(),!c){l.warning({title:"Warning",message:"Please enter a search query.",position:"topRight"});return}M(),p(),S();try{const{images:r,totalHits:s}=await f(c,i);if(r.length===0)return;O=s,u(r),i+=1,m()}catch(r){console.error("Error fetching images:",r)}finally{q()}}async function D(){p(),v();try{const{images:t}=await f(c,i);u(t),i+=1,m()}catch(t){console.error("Error loading more images:",t)}finally{w()}}
//# sourceMappingURL=index.js.map
