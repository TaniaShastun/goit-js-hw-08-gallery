import gallery from "./gallery-items.js";


const container = document.querySelector(".js-gallery");
const jsLightbox = document.querySelector(".js-lightbox");
const originalImage = document.querySelector(".lightbox__image");
const backGround = document.querySelector(".lightbox__content");
const button = document.querySelector(".lightbox__button");



function createGalery(images) {
  const galleryImage = images.reduce(
    (item, img) =>
      item +
      `<li class="gallery__item">
    <a class="gallery__link" href="#">
      <img class="gallery__image" 
      src = '${img.preview}'
      data-source = '${img.original}'
      alt = '${img.description}'/>
    </a>
    </li>`,
    ""
  );
  return container.insertAdjacentHTML("afterbegin", galleryImage);
}

createGalery(gallery);

container.addEventListener("click", onClick);

function onClick(event) {
  let checkClick = event.target;
  if (checkClick.classList.contains("gallery__image")) {
    jsLightbox.classList.add("is-open");
    originalImage.setAttribute("src", checkClick.dataset.source);
    button.addEventListener("click", onClickBtn);
    backGround.addEventListener("click", closeModalClickBackGround);
    window.addEventListener("keydown", funcPressEsc);
  }
}

function onClickBtn(event) {
  let checkBtn = event.target;
  if (!checkBtn.classList.contains("lightbox__image")) {
    jsLightbox.classList.remove("is-open");
    originalImage.removeAttribute("src");
    button.removeEventListener("click", onClickBtn);
    backGround.removeEventListener("click", closeModalClickBackGround);
    window.removeEventListener("keydown", funcPressEsc);
  }
}

function closeModalClickBackGround(event) {
  if (event.target === event.currentTarget) {
    jsLightbox.classList.remove("is-open");
    originalImage.removeAttribute("src");
  }
}

function funcPressEsc(event) {
  if (event.keyCode === 27) {
    jsLightbox.classList.remove("is-open");
    originalImage.removeAttribute("src");
  }
}

