import{S as L,a as b,i as l}from"./assets/vendor-D8_O3--j.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const u=document.querySelector(".gallery"),M=new L(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});function p(t){const r=t.map(({webformatURL:s,largeImageURL:a,tags:e,likes:o,views:i,comments:y,downloads:h})=>`
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
              <p class="text">Comments <span class="photo-item-span">${y}</span></p>
            </li>
            <li class="photo-item">
              <p class="text">Downloads <span class="photo-item-span">${h}</span></p>
            </li>
          </ul>
        </a>
      `).join("");u.insertAdjacentHTML("beforeend",r),M.refresh()}function S(){u.innerHTML=""}function d(){document.querySelector(".loader").classList.add("is-visible")}function m(){document.querySelector(".loader").classList.remove("is-visible")}function f(){document.querySelector(".loadMore").classList.remove("is-hidden")}function q(){document.querySelector(".loadMore").classList.add("is-hidden")}const v="51409693-2d1545100387263aa5c533cc2";let w=15;async function g(t,r=1){try{const s=await b("https://pixabay.com/api/",{params:{key:v,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:w,page:r}}),{hits:a,totalHits:e}=s.data;return!a||a.length===0?(l.error({message:"Sorry, no images match your search query. Please try again.",position:"topRight"}),{images:[],totalHits:0}):{images:a,totalHits:e}}catch(s){return l.error({title:"Error",message:s.message,position:"topRight"}),{images:[],totalHits:0}}}const x=document.querySelector(".form"),P=document.querySelector('input[name="search-text"]'),E=document.querySelector(".loadMore");let n=1,c="",$=0;x.addEventListener("submit",H);E.addEventListener("click",O);async function H(t){if(t.preventDefault(),n=1,c=P.value.trim(),!c){l.warning({title:"Warning",message:"Please enter a search query.",position:"topRight"});return}S(),q(),d();try{const{images:r,totalHits:s}=await g(c,n);if(r.length===0)return;$=s,p(r),n+=1,f()}catch(r){console.error("Error fetching images:",r)}finally{m()}}async function O(){d();try{const{images:t}=await g(c,n);p(t),n+=1,f()}catch(t){console.error("Error loading more images:",t)}finally{m()}}
//# sourceMappingURL=index.js.map
