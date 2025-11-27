import simpPendDark from "./simulations/simplePendulum/images/simExampleSimplePend.png";
import simpPendLight from "./simulations/simplePendulum/images/simExampleSimplePendLight.png";
import doublePendDark from "./simulations/doublePendulum/images/doubleExampleDark.png";
import doublePendLight from "./simulations/doublePendulum/images/doubleExampleLight.png";
import bH2Dark from "./simulations/2dBlackHole/images/blackHole2dDark.png"
import bH2Light from "./simulations/2dBlackHole/images/blackHole2dLight.png"
import homeLogo from "./assets/images/homeLogo.png";

const logotext = "QE";

const introData = {
  title: "Quantum Exhibit",
  animated: {
    first: "I love physics",
    second: "I code physics simulations",
    third: "I make it simple",
  },
  description: `I made this website to work on what I love and showcase it to the world. I \
                  hope you enjoy my simple yet beautiful physics simulations!`,
  your_img_url: homeLogo,
};

const kunalData = {
  title: "About Me",
  aboutme: `I'm a physicist turned builder! I originally studied Physics & Astronomy at the University of Waterloo. During my time
  at Waterloo, I had the chance to work on a real physical quantum computer to help build state of the art technology! However, I now
  spend my time solving software engineering challenges, my passion for physics lives on through this site. It allows me to spend time 
  creating new simulations and sharing them with the world. These days I've gone from working with the Canadian military to the American Air Force
  and everything in between!`
};

const dataportfolio = [
  {
    title: "2D Black Hole",
    img: bH2Dark,
    imgLight: bH2Light,
    alt: "2D Black Hole",
    description:
      "A simple simulation of a 2D black hole. One can choose different initial conditions for the rays. This is merely a stepping stone to create a 3D black hole simulation!",
    link: "/simulation/2dblackhole",
  },
  {
    title: "Double Pendulum",
    img: doublePendDark,
    imgLight: doublePendLight,
    alt: "Double Pendulum",
    description:
      "An elegant simulation of the double pendulum. One can change various parameters to learn about the deeper physics behind a double pendulum.",
    link: "/simulation/doublePendulum",
  },
  {
    title: "Simple Pendulum",
    img: simpPendDark,
    imgLight: simpPendLight,
    alt: "Simple Pendulum",
    description:
      "A simple yet elegant pendulum simulation using elementary physics. My first simulation which was used to help learn the basics of Pixi.JS and the intricacies of creating online simulations.",
    link: "/simulation/simplePendulum",
  },
];

const contactConfig = {
  YOUR_EMAIL: "Hello@QuantumExhibit.com",
  description:
    "If you have any suggestions or questions about my simulations, please do not hesitate to reach out!",
  // EMailJS required data
  YOUR_SERVICE_ID: "service_y0vnoat",
  YOUR_TEMPLATE_ID: "template_ixlrs05",
  YOUR_USER_ID: "aUTBaz4QnCOahSt_U",
};

const socialProfile = {
  github: "https://github.com/kuki1029",
};

export {
  dataportfolio,
  kunalData,
  introData,
  contactConfig,
  socialProfile,
  logotext,
};
