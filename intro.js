var currentLink = "";
window.addEventListener("load", () => {
  document.getElementById("floridaBtn").addEventListener("click",
    (e) => {
      console.log(e.target.tagName)
      if (e.target.tagName.toUpperCase() == "A") {
        e.preventDefault(); // cancel link
        currentLink = e.target.href;
        dale.play();
      }
    });
});

var dale = new Audio();
dale.addEventListener("ended", () => {
  location = currentLink;
});
dale.src = './assets/sounds/dale.mp3';