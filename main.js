const refreshContainer = document.querySelector(".refresh-container");
const spinner = document.querySelector(".spinner");

let isLoading = false;
let pStartY = 0;
let pCurrentY = 0;

const loadInit = () => {
  refreshContainer.classList.add("load-init");
  isLoading = true;
};

const swipeStart = (e) => {
  if (!isLoading) {
    let touch = e.targetTouches[0];
    pStartY = touch.screenY;
  }
};

const swipe = (e) => {
  if (!isLoading) {
    let touch = e.changedTouches[0];
    pCurrentY = touch.screenY;

    let changeY = pStartY < pCurrentY ? Math.abs(pStartY - pCurrentY) : 0;

    if (changeY <= 80) {
      refreshContainer.style.marginTop = `${changeY + 50}px`;
      spinner.style.transform = `rotate(${changeY * 13.5}deg)`;
      if (changeY >= 80) return loadInit();
    }
  }
};

const swipeEnd = (e) => {
  let touch = e.changedTouches[0];
  pCurrentY = touch.screenY;

  if (isLoading) {
    refreshContainer.classList.add("load-start");

    setTimeout(() => {
      isLoading = false;
      refreshContainer.style.marginTop = "0px";
      refreshContainer.classList.remove("load-init");
      refreshContainer.classList.remove("load-start");
    }, 3000);
  }

  if (!isLoading) {
    refreshContainer.style.marginTop = "0px";
    spinner.style.transform = `rotate(0deg)`;
  }
};

document.addEventListener("touchstart", (e) => swipeStart(e));
document.addEventListener("touchmove", (e) => swipe(e));
document.addEventListener("touchend", (e) => swipeEnd(e));
