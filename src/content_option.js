import simpPendDark from "./simulations/simplePendulum/images/simExampleSimplePend.png"
import simpPendLight from "./simulations/simplePendulum/images/simExampleSimplePendLight.png"
import homeLogo from "./assets/images/homeLogo.png"


const logotext = "QE";


const introData = {
    title: "Quantum Exhibit",
    animated: {
        first: "We love physics",
        second: "We code physics simulations",
        third: "We make it simple",
    },
    description: "This site is created by Kunal Varkekar & Chaitanya Luktuke. We made this website to work on what we love and showcase it to the world. We hope you enjoy our physics simulations!",
    your_img_url: homeLogo,
};

const aboutData = {
    title: "About Us",
    aboutme: "We are two passionate physics students at the University Of Waterloo. As a way of working on something we both love,\
    we decided to work on Quantum Exhibit. We wanted to display interesting physics simulations while also explaining the math and concepts behind\
    such topics. We hope to inspire the next generation of students to learn and create their own simulations.",
};


const kunalData = {
    title: "Kunal",
    aboutme: "I am a Physics and Astronomy student at the University Of Waterloo. Although astronomy is my speciality, I've \
    been dipping my feet into the world of full stack development. Building creative and unique websites has allowed my \
    artistic side to flow out. Being able to create these physics simulations has allowed me to understand the physics \
    at a deeper level while also having fun and spreading the knowledge of physics. It has also allowed me to hone my \
    full stack development skills. I have worked with multiple technologies including MERN, VueJS, NodeJS, Golang, \
    Typescript, and many other that I've picked up while working at the Department of National Defence as a Full Stack developer.",
};

const chatData = {
    title: "Chaitanya",
    aboutme: "I am an Honours Physics student at the University of Waterloo and an aspiring research scientist.\
    Developing physics simulations and this site has let me explore my interest in physics in non-traditional ways\
    enabling me to pursue and merge my passion for writing, coding and physics on my own terms. I have experience working in a number of scientific\
    research institutes such as TRIUMF and SNOLAB and have developed experience working with Monte Carlo simulations and Statistical Data Analysis\
    techniques in ROOT, Python, C++ and even Fortran. Working on experiments ranging from Dark Matter (Deap-3600 and DarkSide-20K) to\
    Nuclear Physics and Magneto-Optical Atom Traps (TRINAT) has allowed me to learn about a wide range of physics sub-fields, a list I hope to\
    keep growing",
};

const dataportfolio = [{
        title: "Simple Pendulum",
        img: simpPendDark,
        imgLight: simpPendLight,
        alt: "Simple Pendulum",
        description: "A simple yet elegant pendulum simluation using elementary physics. Our first simulation \
        which was used to help learn the basics of Pixi.JS and the intricacies of creating online simulations.",
        By: "Kunal",
        link: "/simulation/simplePendulum"
    },
];

const contactConfig = {
    YOUR_EMAIL: "Hello@QuantumExhibit.com",
    description: "If you have any suggestions or questions about our simulations, please do not hesitate to reach out!",
    // EMailJS required data
    YOUR_SERVICE_ID: "service_y0vnoat",
    YOUR_TEMPLATE_ID: "template_ixlrs05",
    YOUR_USER_ID: "aUTBaz4QnCOahSt_U",
};

const socialProfile = {
    github: "https://github.com/kuki1029",
};

export {
    aboutData,
    dataportfolio,
    kunalData,
    chatData,
    introData,
    contactConfig,
    socialProfile,
    logotext,
};