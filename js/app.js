// Define global variables

const nav = document.querySelector(".main-nav");

const sections = document.querySelectorAll(".section");

const sectionMap = {
  section1: "About",
  section2: "How-to",
  section3: "Extras",
  section4: "Contact",
};

let clickedSection = "None";

const floatButton = document.querySelector(".jump");

const sideNav = document.querySelector(".side-nav");

const menu = document.querySelector(".hamburger-menu");

const closeMenu = document.querySelector(".close-menu");

const sideNavList = document.querySelectorAll(".sli-section");

// Define helper functions

function removeActive(listArray) {
  listArray.forEach((x) => {
    x.classList.remove("active-nav");
  });
}

/** creating nav items and append to ul element
 * call li values and append a element
 */

const sectionArray = Array.from(sections);
sectionArray.forEach((sec) => {
  const newList = document.createElement("li");
  let anchorTag = document.createElement("a");
  const sectionId = sec.getAttribute("id");
  anchorTag.setAttribute("href", "#" + sectionId);
  const anchorText = sectionMap[sectionId];
  anchorTag.append(anchorText);
  newList.setAttribute("class", "new-nav");
  newList.appendChild(anchorTag);
  newList.setAttribute("id", "li-" + sectionId);
  nav.appendChild(newList);
});

/**
 * adding a click event that will show section when the list is clicked in nav
 */

let attachListEvent = function (listArray) {
  listArray.forEach((x) => {
    x.addEventListener("click", function () {
      removeActive(listArray);
      const listId = x.getAttribute("id");
      const sectionId = listId.split("-")[1];
      clickedSection = sectionId;
      let sec = document.getElementById(sectionId);
      x.scrollTo({
        top: sec.offsetTop,
        behaviour: "smooth",
      });
      x.classList.add("active-nav");
    });
  });
};
const list = document.querySelectorAll(".new-nav");
let listNodesArray = Array.from(list);
attachListEvent(listNodesArray);
let sideNavListArray = Array.from(sideNavList);
attachListEvent(sideNavListArray);

/**
 * styling the list's active state to show what section is being viewed when scrolling
 */

document.addEventListener("scroll", function (evt) {
  const list = document.querySelectorAll(".new-nav");
  let sideNavListArray = Array.from(sideNavList);
  let listNodesArray = Array.from(list);
  let scrollY = window.pageYOffset;
  sectionArray.forEach((sec, index) => {
    let rectangle = sec.getBoundingClientRect();
    const sectionHeight = sec.offsetHeight;
    const sectionTop = sec.offsetTop - 150;
    const sectionId = sec.getAttribute("id");
    if (
      scrollY > sectionTop &&
      scrollY <= sectionTop + sectionHeight &&
      clickedSection != "section4"
    ) {
      const list = document.getElementById("li-" + sectionId);
      removeActive(listNodesArray);
      list.classList.add("active-nav");

      const slist = document.getElementById("sli-" + sectionId);
      removeActive(sideNavListArray);
      slist.classList.add("active-nav");
    }
  });

  const about = document.getElementById("section1");
  const rectangle = about.getBoundingClientRect();
  if (window.scrollY <= rectangle.top) {
    setTimeout(() => {
      floatButton.classList.add("jump-hide");
    }, 3000);
  } else {
    floatButton.classList.remove("jump-hide");
  }
});

/**
 * creating a floating icon to jump to the top of the page
 * icon disappears after 3seconds at the top
 */

floatButton.addEventListener("click", () => {
  const about = document.getElementById("section1");
  const rectangle = about.getBoundingClientRect();
  window.scrollTo({
    top: rectangle.top,
    behavior: "smooth",
  });
});

/**
 * styling the menu for mobile screens
 */

menu.addEventListener("click", () => {
  sideNav.classList.add("show-side-nav");
});

closeMenu.addEventListener("click", () => {
  sideNav.classList.remove("show-side-nav");
});
