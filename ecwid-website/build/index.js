(() => {
  // happyFramework/jsx.js
  var frag = Symbol();

  // src/index.jsx
  function goToFocused(hash) {
    const element = document.getElementById(hash.substring(1));
    console.log(element);
    if (!element)
      return;
    element.focus();
    element.scrollIntoView({ behavior: "smooth" });
    goToPopup(element);
  }
  function goToPopup(elem) {
    if (elem && elem.className && elem.className.includes("popup")) {
      elem.style.display = "flex";
    } else if (elem.parentNode) {
      goToPopup(elem.parentNode);
    }
  }
  window.onload = () => {
    const { hash, origin, pathname } = document.location;
    goToFocused(hash);
    document.querySelectorAll("a").forEach((a) => {
      const link = a.href;
      const url = new URL(link);
      if (url.origin !== origin || url.pathname !== pathname)
        return;
      const { hash: hash2 } = url;
      a.addEventListener("click", (e) => {
        e.preventDefault();
        goToFocused(hash2);
      });
      a.href = "";
    });
    document.querySelectorAll(".popup").forEach((popup) => {
      const tumbler = document.createElement("button");
      tumbler.className = "tumbler";
      popup.prepend(tumbler);
      tumbler.addEventListener("click", (e) => {
        const animation = popup.animate(
          [{ bottom: 0 }, { bottom: "-24rem" }],
          { duration: 500, iterations: 1 }
        );
        animation.finished.then(() => {
          popup.style.display = "none";
        });
      });
    });
  };
})();
