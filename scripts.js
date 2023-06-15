const toggleMobileDropdown = document.querySelector("#toggleMobileDropdown");
const toggleIcon = document.querySelector(".toggle-icon");
const mobileDropdown = document.querySelector(".mobile-dropdown");

const urlContainer = document.querySelector(".url-container");
const urlInput = document.querySelector("#urlInput");
const buttonShortener = document.querySelector("#buttonShortener");
const invalidFeedback = document.querySelector(".invalid-feedback");

//MOBILE DROPDOWN

let isDropdownVisible = false;

toggleMobileDropdown.addEventListener("click", () => {
  if (isDropdownVisible) {
    mobileDropdown.style.display = "none";
    toggleIcon.classList.add("fa-bars");
    toggleIcon.classList.remove("fa-xmark");
  } else {
    mobileDropdown.style.display = "block";
    toggleIcon.classList.add("fa-xmark");
    toggleIcon.classList.remove("fa-bars");
  }

  isDropdownVisible = !isDropdownVisible;
});

//URL SHORTENER

buttonShortener.addEventListener("click", () => {
  const url = urlInput.value;

  if (url == "") {
    invalidFeedback.style.display = "block";
  } else {
    urlShortener(url);
  }
});

async function urlShortener(url) {
  const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
  const data = await res.json();

  const urlCard = document.createElement("div");
  urlCard.className = "url-card";
  urlCard.innerHTML = `
    <p>${data.result.original_link}</p>
    <div class="url-card__short-wrapper">
      <a href="http://${data.result.short_link}" target="_blank" class="short-url">${data.result.short_link}</a>
      <button class="short-url-copy">Copy</button>
    </div>
  `;

  urlContainer.appendChild(urlCard);
  const copyLink = document.querySelector(".short-url-copy");
  const shortLink = document.querySelector(".short-url");

  copyLink.addEventListener("click", () => {
    navigator.clipboard.writeText(shortLink.textContent);
    copyLink.textContent = "Coppied!";
    copyLink.classList.add("coppied-button");
  });

  urlInput.value = "";
}
