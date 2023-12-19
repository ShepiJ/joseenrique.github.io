const timelineDiv = document.getElementsByClassName("timeline")[0];
const projectDiv = document.getElementById("projects");
const titles = document.getElementsByTagName("h1");
const skillsDiv = document.getElementById("skills");

document.getElementById("spainFlag").addEventListener("click", () => {
  changeLanguage("es");
});

document.getElementById("ukFlag").addEventListener("click", () => {
  changeLanguage("en");
});

const changeLanguage = async (language) => {
  timelineDiv.innerHTML = "";
  projectDiv.innerHTML = "";
  skillsDiv.innerHTML = "";
  let requestJson;
  if (language == "es") {
    requestJson = await fetch(`./languages/es.json`);
  } else {
    requestJson = await fetch(`./languages/en.json`);
  }
  const json = await requestJson.json();

  for (const key in json) {
    const section = json[key];

    switch (key) {
      case "timeline":
        generateTimeline(section);
        break;
      case "projects":
        generateProjects(section);
        break;
      case "titles":
        changeLanguageOfTitles(section)
        break;
      case "skills":
        generateSkills(section)
        break;
      default:
        break;
    }
  }
};

const changeLanguageOfTitles = (section) => {
  console.log(section.timeline)
  titles[1].textContent = section.timeline
  titles[2].textContent = section.projects
  titles[3].textContent = section.skills
}

const generateTimeline = (section) => {
  let index = 0;
  section.forEach((element) => {
    const containerDiv = document.createElement("div");
    containerDiv.classList.add("container");

    if (index % 2 == 0) {
      containerDiv.classList.add("left");
    } else {
      containerDiv.classList.add("right");
    }

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("content");

    const titleH2 = document.createElement("h2");
    titleH2.textContent = element.title;

    const subtitleP = document.createElement("p");
    subtitleP.classList.add("subtitle");
    subtitleP.textContent = element.date;

    const descriptionP = document.createElement("p");
    descriptionP.classList.add("description");
    descriptionP.textContent = element.description;

    const tags = element.tags;

    contentDiv.appendChild(titleH2);
    contentDiv.appendChild(subtitleP);
    contentDiv.appendChild(descriptionP);

    /*

    Code for generate the same tags as the cards projects.

    if (tags !== undefined) {
      for (let index = 0; index < tags.length; index++) {
        const span = document.createElement("span");
        span.textContent = tags[index];
        contentDiv.appendChild(span);
      }
    }
    
    */

    containerDiv.appendChild(contentDiv);
    timelineDiv.appendChild(containerDiv);

    index++;
  });
};

const generateProjects = (section) => {
  section.forEach((element) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    const link = document.createElement("a");
    link.href = element.link;
    link.target ="_blank"
    //Tamaño de imagen decente 851 x 603 o parecidos
    const img = document.createElement("img");
    img.src = element.img;

    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.classList.add("card-body");
    const titleH2 = document.createElement("h2");
    titleH2.textContent = element.title;
    const descriptionP = document.createElement("p");
    descriptionP.classList.add("subtitle");
    descriptionP.textContent = element.description;

    const tags = element.tags;

    cardBodyDiv.appendChild(titleH2);
    cardBodyDiv.appendChild(descriptionP);

    for (let index = 0; index < tags.length; index++) {
      const span = document.createElement("span");
      span.textContent = tags[index];
      cardBodyDiv.appendChild(span);
    }

    

    cardDiv.appendChild(img);
    cardDiv.appendChild(cardBodyDiv);

    link.appendChild(cardDiv);

    projectDiv.appendChild(link);
  });
};

const generateSkills = (section) => {
  section.forEach((element) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("skill-card");
    const img = document.createElement("img");
    img.src = element.img;

    const titleH2 = document.createElement("h2");
    titleH2.textContent = element.name;

    cardDiv.appendChild(img);
    cardDiv.appendChild(titleH2);
    skillsDiv.appendChild(cardDiv);
  });
};

changeLanguage();
document.addEventListener('DOMContentLoaded', function () {
  var ukFlag = document.querySelector('#ukFlag img');

  ukFlag.classList.add('clicked');

  var flags = document.querySelectorAll('#flags img');

  flags.forEach(function (flag) {
    flag.addEventListener('click', function () {
      this.classList.toggle('clicked');

      flags.forEach(function (otherFlag) {
        if (otherFlag !== flag) {
          otherFlag.classList.remove('clicked');
        }
      });
    });
  });
});
