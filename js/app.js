// Define global variables

const nav = document.querySelector(".main-nav");

const sections = document.querySelectorAll(".section");

const sectionMap = {
  section1: "About",
  section2: "How-to",
  section3: "Extras",
  section4: "Contact",
};

const floatButton = document.querySelector(".jump");

const sideNav = document.querySelector(".side-nav");

const menu = document.querySelector(".hamburger-menu");

const closeMenu = document.querySelector(".close-menu");

// Define helper functions

function removeActive(listArray) {
  listArray.forEach((x) => {
    x.classList.remove("active-nav");
  });
}

/** create nav items and append to ul element
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

let attachListEvent = function () {
  const list = document.querySelectorAll(".new-nav");
  let listNodesArray = Array.from(list);
  listNodesArray.forEach((x) => {
    x.addEventListener("click", function () {
      removeActive(listNodesArray);
      x.classList.add("active-nav");
    });
  });
};
attachListEvent();

/**
 * styling the list's active state to show what section is being viewed when scrolling
 */
document.addEventListener("scroll", function (evt) {
  const list = document.querySelectorAll(".new-nav");
  let listNodesArray = Array.from(list);
  sectionArray.forEach((sec, index) => {
    let rectangle = sec.getBoundingClientRect();
    console.log(window.scrollY, rectangle.top, rectangle.bottom);
    if (window.scrollY >= rectangle.top) {
      const sectionId = sec.getAttribute("id");
      const list = document.getElementById("li-" + sectionId);
      removeActive(listNodesArray);
      list.classList.add("active-nav");
    }
  });
  /**
   * create a floating icon to jump to the top of the page
   * icon disappears after 3seconds at the top
   */
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

floatButton.addEventListener("click", () => {
  const about = document.getElementById("section1");
  const rectangle = about.getBoundingClientRect();
  window.scrollTo({
    top: rectangle.top,
    behavior: "smooth",
  });
});

/**
 * style the menu for mobile screens
 */

menu.addEventListener("click", () => {
  sideNav.classList.add("show-side-nav");
});

closeMenu.addEventListener("click", () => {
  sideNav.classList.remove("show-side-nav");
});
