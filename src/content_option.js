import simpPendDark from "./simulations/simplePendulum/images/simExampleSimplePend.png"
import simpPendLight from "./simulations/simplePendulum/images/simExampleSimplePendLight.png"
import doublePendDark from './simulations/doublePendulum/images/doubleExampleDark.png'
import doublePendLight from './simulations/doublePendulum/images/doubleExampleLight.png'
import homeLogo from "./assets/images/homeLogo.png"


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
    aboutme: `I am a Physics and Astronomy student at the University Of Waterloo. Although astronomy is my speciality, I've \
    been dipping my feet into the world of full stack development. Building creative and unique websites has allowed my \
    artistic side to flow out. Being able to create these physics simulations has allowed me to understand the physics \
    at a deeper level while also having fun and spreading the knowledge of physics. It has also allowed me to hone my \
    full stack development skills. I have worked with multiple technologies including MERN, VueJS, NodeJS, Golang, \
    Typescript, and many other that I've picked up while working at the Department of National Defence as a Full Stack developer.`,
};

const dataportfolio = [
    {
        title: "Simple Pendulum",
        img: simpPendDark,
        imgLight: simpPendLight,
        alt: "Simple Pendulum",
        description: "A simple yet elegant pendulum simluation using elementary physics. Our first simulation which was used to help learn the basics of Pixi.JS and the intricacies of creating online simulations.",
        link: "/simulation/simplePendulum"
    },
    {
        title: "Double Pendulum",
        img: doublePendDark,
        imgLight: doublePendLight,
        alt: "Double Pendulum",
        description: "An elegant simulation of the double pendulum. One can change various parameters to learn about the deeper physics behind a double pendulum.",
        link: "/simulation/doublePendulum"
    },
];

const contactConfig = {
    YOUR_EMAIL: "Hello@QuantumExhibit.com",
    description: "If you have any suggestions or questions about my simulations, please do not hesitate to reach out!",
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