document.addEventListener("DOMContentLoaded", (e) => {
  /*
    Document's elements queries
    */
  const header = document.getElementsByTagName("header")[0];
  const otherInfo = document.querySelector("#home .other-info");
  const socialLinks = document.querySelector("#home .social-links");
  const skipBtn = document.getElementById("skipBtn");
  const menuToggleBtn = document.getElementById("toggle-menu-btn");
  const menuToggleBtnText = document.querySelector("#toggle-menu-btn span");
  const menuToggleBtnIcon = document.querySelector("#toggle-menu-btn i");
  const menu = document.getElementsByClassName("menu-wrapper")[0];
  const localTime = document.getElementById("localTime");
  let activeMenuItem = document.createElement("a");
  const menuItems = document.querySelectorAll("nav ul li a");
  const currentYearSpan = document.getElementById("currentYear");

  const skillItems = Array.from(document.getElementsByClassName("skill-item"));
  const skillFilters = document.querySelectorAll("#skills .button-tag input");
  const experienceDetails = document.querySelectorAll(".experience-details");
  const showMoreButtons = document.querySelectorAll(".show-more button");

  showMoreButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const target =
        e.target.parentElement.parentElement.querySelector(".description");

      if (target.classList.contains("show")) {
        target.classList.remove("show");
        e.target.innerText = "Show more";
      } else {
        target.classList.add("show");
        e.target.innerText = "Show less";
      }
    });
  });

  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.toggle("active");
      activeMenuItem.classList.toggle("active");
      activeMenuItem = item;
      if (menu.classList.contains("show")) {
        toggleMenu();
      }
    });
  });
  if (window.scrollY == 0) {
    setTimeout(() => finishAnimation(), 9500);
  } else {
    finishAnimation();
  }
  skipBtn.addEventListener("click", finishAnimation);
  currentYearSpan.innerText = new Date().getFullYear();

  window.onscroll = () => {
    var currentSection = "";
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 50) {
        currentSection = section.getAttribute("id");
      }
    });

    menuItems.forEach((a) => {
      a.classList.remove("active");
      if (a.getAttribute("id")) {
        if (a.getAttribute("id").split("-")[0] == currentSection) {
          a.classList.add("active");
        }
      }
    });
  };
  // Initialize the intersection observer for all fade-in sections
  function initFadeInSections() {
    const sections = document.querySelectorAll(".fade-in-section");
    const heroSection = document.querySelector("#home");
    const logo = document.querySelector("header img");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        } else {
          entry.target.classList.remove("is-visible");
        }
      });
    });
    const heroSectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          logo.classList.add("active");
        } else {
          logo.classList.remove("active");
        }
      });
    });
    heroSectionObserver.observe(heroSection);

    sections.forEach((section) => {
      observer.observe(section);
    });
  }

  function finishAnimation() {
    header.style.opacity = "1";
    document.getElementsByTagName("html")[0].style.overflowY = "scroll";
    skipBtn.style.opacity = "0";
    skipBtn.disabled = true;
    otherInfo.style.opacity = "1";
    socialLinks.style.opacity = "1";
  }
  function toggleMenu() {
    menu.classList.toggle("show");
    menuToggleBtnText.innerText = menu.classList.contains("show")
      ? "Open Menu"
      : "Close menu";
    menuToggleBtnIcon.classList.toggle("fa-bars");
    menuToggleBtnIcon.classList.toggle("fa-xmark");
  }
  menuToggleBtn.addEventListener("click", (e) => toggleMenu());

  experienceDetails.forEach((details) => {
    details.addEventListener("click", (e) => {
      details.classList.toggle("show");
    });
  });

  skillFilters.forEach((filter) => {
    filter.addEventListener("change", () => {
      let chosenFilter = filter.value;

      skillItems.forEach((item) => {
        if (chosenFilter == "all") {
          if (!item.classList.contains("active")) item.classList.add("active");
        } else {
          item.classList.remove("active");
          if (item.getAttribute("tags").split(",").includes(chosenFilter)) {
            item.classList.add("active");
          }
        }
      });
    });
  });
  fetch("https://worldtimeapi.org/api/timezone/America/Vancouver")
    .then((data) => {
      return data.json();
    })
    .then((json) => {
      const APIDateTime = json.datetime.split(".")[0];
      let dateTime = new Date(APIDateTime);
      dateTime.setMilliseconds(0);
      localTime.innerText = `${dateTime.toDateString()}  ${dateTime.toLocaleTimeString()}`;
      setInterval(async () => {
        dateTime.setMilliseconds(1001);
        localTime.innerText = `Local time: ${dateTime.toDateString()}  ${dateTime.toLocaleTimeString()}`;
      }, 1000);
    })
    .catch((e) => {
      console.log(e);
    });
  window.addEventListener("scroll", (e) => {
    if (window.scrollY != 0) {
      header.classList.add("opaque");
    } else {
      header.classList.remove("opaque");
    }
  });
  initFadeInSections();
});
