import{S as L,a as b,i as l}from"./assets/vendor-D8_O3--j.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const m=document.querySelector(".gallery"),S=new L(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});function p(t){const o=t.map(({webformatURL:s,largeImageURL:a,tags:e,likes:r,views:i,comments:f,downloads:y})=>`
        <a class="gallery-item" href="${a}">
          <img class="gallery-image" src="${s}" alt="${e}" />
          <ul class="photo-list">
            <li class="photo-item">
              <p class="text">Likes <span class="photo-item-span">${r}</span></p>
            </li>
            <li class="photo-item">
              <p class="text">Views <span class="photo-item-span">${i}</span></p>
            </li>
            <li class="photo-item">
              <p class="text">Comments <span class="photo-item-span">${f}</span></p>
            </li>
            <li class="photo-item">
              <p class="text">Downloads <span class="photo-item-span">${y}</span></p>
            </li>
          </ul>
        </a>
      `).join("");m.insertAdjacentHTML("beforeend",o),S.refresh()}function q(){m.innerHTML=""}function M(){document.querySelector(".loader").classList.add("is-visible")}function v(){document.querySelector(".loader").classList.remove("is-visible")}function d(){document.querySelector(".loadMore-btn").classList.remove("is-hidden")}function u(){document.querySelector(".loadMore-btn").classList.add("is-hidden")}function w(){document.querySelector("#btn-loader").classList.remove("is-hidden")}function P(){document.querySelector("#btn-loader").classList.add("is-hidden")}const x="51409693-2d1545100387263aa5c533cc2";let $=15;async function h(t,o=1){try{const s=await b("https://pixabay.com/api/",{params:{key:x,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:$,page:o}}),{hits:a,totalHits:e}=s.data;return!a||a.length===0?(l.error({message:"Sorry, no images match your search query. Please try again.",position:"topRight"}),{images:[],totalHits:0}):{images:a,totalHits:e}}catch(s){return l.error({title:"Error",message:s.message,position:"topRight"}),{images:[],totalHits:0}}}const E=document.querySelector(".form"),H=document.querySelector('input[name="search-text"]'),O=document.querySelector(".loadMore-btn");document.querySelector("#btn-loader");let n=1,c="",g=0;const B=15;E.addEventListener("submit",I);O.addEventListener("click",R);async function I(t){if(t.preventDefault(),n=1,c=H.value.trim(),!c){l.warning({title:"Warning",message:"Please enter a search query.",position:"topRight"});return}q(),u(),M();try{const{images:o,totalHits:s}=await h(c,n);if(o.length===0)return;g=s,p(o),n+=1,d()}catch(o){console.error("Error fetching images:",o)}finally{v()}}async function R(){u(),w();try{const{images:t}=await h(c,n);p(t);const o=document.querySelector(".gallery-item");if(o){const s=o.getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})}n+=1,n*B>=g?(u(),l.info({title:"Warning",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):d(),d()}catch(t){console.error("Error loading more images:",t)}finally{P()}}
//# sourceMappingURL=index.js.map
