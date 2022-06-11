let sections = Array.from(document.querySelectorAll("section"));
let count = sections.length;
//button that can add section
const button = document.querySelector("#btn");
const main = document.querySelector("main");

//here i can add  new section and use addNav function to increse item in nav menu
const addSection = () => {
  let newSection = document.createElement("section");
  newSection.setAttribute("data-nav", `Section ${++count}`);
  newSection.setAttribute("id", `section${count}`);
  newSection.innerHTML = ` <div class="landing__container">
  <h2>Section ${count}</h2>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
    fermentum metus faucibus lectus pharetra dapibus. Suspendisse
    potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget
    lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed
    convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla
    eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam
    nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis
    lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a
    tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus
    vitae elit. Integer nec libero venenatis libero ultricies molestie
    semper in tellus. Sed congue et odio sed euismod.
  </p>

  <p>
    Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar
    gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam.
    Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum
    consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget
    elementum tortor mollis non.
  </p>
</div>`;
  main.appendChild(newSection);
  sections.push(newSection);
  addNav(newSection);
};

//using button to addsection
button.addEventListener("click", addSection);
//  i select navbar to add list to it (li(append))
const navBar = document.querySelector("#navbar__list");
//add navBar
const addNav = (section) => {
  list = document.createElement("li");
  // i get (Data-nav) to be content and (id) to be href to access section
  listText = section.getAttribute("data-nav");
  listId = section.getAttribute("id");

  list.innerHTML = `<a href=#${listId} class="menu__link">${listText}</a>`;
  navBar.appendChild(list);
};
//show nav bar in main website without adding
sections.forEach((sec) => {
  addNav(sec);
});
navBar.addEventListener("click", (e) => scrollToSection(e));
// scroll smooth to section when I clicl in a navbar and give the active to link and section
const scrollToSection = (e) => {
  if (e.target.classList.contains("menu__link")) {
    e.preventDefault();
    removeActiveClass();
    removeActiveLink();
    e.target.classList.add("activelink");
    const href = e.target.getAttribute("href");
    const sec = document.querySelector(href);
    sec.classList.add("active");
    sec.scrollIntoView({
      behavior: "smooth",
    });
  }
};

//remove active class from all sections
const removeActiveClass = () => {
  for (const section of sections) {
    section.classList.remove("active");
  }
};
//remove active class from all Links
const removeActiveLink = () => {
  const menuLinks = document.querySelectorAll(".menu__link");
  for (const menuLink of menuLinks) {
    menuLink.classList.remove("activelink");
  }
};

//using click in nav Bar to scroll
let changeLinkScroll = (sectionName) => {
  const links = document.querySelectorAll(".menu__link");
  for (const link of links) {
    if (link.getAttribute("href") === `#${sectionName}`) {
      link.classList.add("activeLink");
    } else {
      link.classList.remove("activeLink");
    }
  }
};
// when scrolling go to function changeLinkScroll
let changeActiveClass = () => {
  sections.forEach((section) => {
    if (inViewPort(section)) {
      let sectionName = section.getAttribute("id");
      changeLinkScroll(sectionName);
      section.classList.add("active");
    } else {
      section.classList.remove("active");
      removeActiveLink();
    }
  });
};
//cheak if the section in viewPort or not
let inViewPort = (section) => {
  let { top: topOfSection, bottom: bottomOfSection } =
    section.getBoundingClientRect();
  return topOfSection >= -200 && bottomOfSection <= window.innerHeight + 150;
};
//event when scrolling webpage change Active link and active class
document.addEventListener("scroll", changeActiveClass);
//this botton scroll to the top of the page using scroll to
let scrollToTopPageBtn = document.querySelector("#scroll");
scrollToTopPageBtn.addEventListener("click", () => {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
});
//hide And show button scrollToTopPage
document.addEventListener("scroll", () => {
  if (window.scrollY > 900) {
    scrollToTopPageBtn.style.display = "block";
  } else {
    scrollToTopPageBtn.style.display = "none";
  }
});
