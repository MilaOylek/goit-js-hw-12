/* empty css                      */import{a as q,S as E,i as n}from"./assets/vendor-BjRz3xa9.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const P="https://pixabay.com/api/",B="49372169-96077d899f4beec9c9139b15f";async function m(o,t){const s={key:B,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15};try{return(await q.get(P,{params:s})).data}catch(a){throw console.error("Error fetching images:",a),a}}const y=document.querySelector(".list-gallery"),h=document.querySelector(".loader"),g=document.querySelector(".load-more");let $=new E(".gallery a",{captionsData:"alt",captionDelay:250});function p(o){const t=o.map(({webformatURL:s,largeImageURL:a,tags:e,likes:r,views:i,comments:w,downloads:S})=>`
        <li class="gallery-item">
          <a href="${a}">
            <img class="gallery-img" src="${s}" alt="${e}" />
            <div class="gallery-info">
              <p>Likes<br> ${r}</p>
              <p>Views<br> ${i}</p>
              <p>Comments<br> ${w}</p>
              <p>Downloads<br> ${S}</p>
            </div>
          </a>
        </li>
      `).join("");y.innerHTML+=t,$.refresh()}function M(){y.innerHTML=""}function L(){h.classList.remove("hidden")}function b(){h.classList.add("hidden")}function v(){g.classList.remove("hidden")}function d(){g.classList.add("hidden")}const u=document.querySelector(".form"),O=u.querySelector("input"),H=document.querySelector(".load-more");let c="",l=1,f=0;u.addEventListener("submit",async o=>{if(o.preventDefault(),c=O.value.trim(),l=1,!c){n.error({title:"Error",message:"Please enter a search query."});return}L(),M(),d();try{const t=await m(c,l);if(f=t.totalHits,t.hits.length===0){n.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!"});return}p(t.hits),t.hits.length<f&&v()}catch{n.error({title:"Error",message:"Failed to fetch images. Please try again later."})}finally{b(),u.reset()}});H.addEventListener("click",async()=>{l+=1,L(),d();try{const o=await m(c,l);p(o.hits),l*15>=f?(d(),n.info({title:"Info",message:"We're sorry, but you've reached the end of search results."})):v();const{height:t}=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}catch{n.error({title:"Error",message:"Failed to fetch more images. Please try again later."})}finally{b()}});
//# sourceMappingURL=index.js.map
