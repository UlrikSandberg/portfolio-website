import { Node } from "./cmdDispatcher";

const gossip_id = "gossip:id";
const gossip_keys = ["gossip", "gosip"];
const gossipNode = () => {
  return new Node(
    gossip_id,
    gossip_keys,
    100,
    true,
    {
      default: () => randomKnowledgeFunction()
    },
    null,
    75
  );
};

// Help section
const help_id = "help:id";
const help_keys = ["help", "-help", "-h", "--help"];
const helpNode = () => {
  return new Node(
    help_id,
    help_keys,
    100,
    true,
    {
      default: () => helpMsg()
    },
    null,
    0
  );
};

// What section
const what_id = "what:id";
const what_keys = ["what", "wat", "whatt", "wha"];
const whatNode = () => {
  return new Node(
    what_id,
    what_keys,
    1,
    false,
    {
      default: () => "What's up?",
      fragments: fragments => `I don't know, what: ${fragments}, means :(`
    },
    null,
    75
  );
};

// Is section
const is_id = "is:id";
const is_keys = ["is", "iis", "iss", "whatis"];
const isNode = () => {
  return new Node(
    is_id,
    is_keys,
    1,
    false,
    {
      default: () => "Just is...?",
      fragments: fragments => `"is ${fragments}", makes no sense to me...`,
      context: nodes => {
        if (nodes.includes(what_id)) {
          return `What is what?`;
        }
        if (nodes.includes(who_id)) {
          return "Who are you talking about?";
        }
        if (nodes.includes(how_id)) {
          return "Are you reffering to Ulrik?";
        }
      }
    },
    null,
    75
  );
};

// How section
const how_id = "how:id";
const how_keys = ["how", "hoow", "howw", "hhow"];
const howNode = () => {
  return new Node(
    how_id,
    how_keys,
    1,
    false,
    {
      default: () => "How, what?",
      fragmens: fragments => `How ${fragments}, makes no sense?`
    },
    null,
    75
  );
};

// Who section
const who_id = "who:id";
const who_keys = ["who", "whom", "whoo", "whho", "wwho"];
const whoNode = () => {
  return new Node(
    who_id,
    who_keys,
    1,
    false,
    {
      default: () => "Who are you reffering to?",
      fragments: fragments => `Who ${fragments}, makes no sense?`
    },
    null,
    75
  );
};

// Are section
const are_id = "are:id";
const are_keys = ["are", "ar", "re"];
const areNode = () => {
  return new Node(
    are_id,
    are_keys,
    1,
    false,
    {
      default: () => "Hmmm... Are what?",
      fragments: fragments => `What do you mean by: Are ${fragments}?`
    },
    null,
    75
  );
};

// Ulrik section
const ulrik_id = "ulrik:id";
const ulrik_keys = ["ulrik", "ulle", "ullebjørn", "ulriks", "ulrik's"];
const ulrikMsg =
  "What do you want to know about Ulrik? Maybe be more specific with: (how, what, who) is ulrik?";
const ulrikNode = () => {
  return new Node(
    ulrik_id,
    ulrik_keys,
    3,
    false,
    {
      default: () => ulrikMsg,
      context: nodes => {
        if (
          nodes.includes(what_id) &&
          (nodes.includes(is_id) || nodes.includes(are_id))
        ) {
          return "Ulrik is a person, obviously...";
        }
        if (
          nodes.includes(how_id) &&
          (nodes.includes(is_id) || nodes.includes(are_id))
        ) {
          return "Ulrik is energetic and never afraid to ask questions about topics he do not yet comprehend";
        }
        if (
          nodes.includes(who_id) &&
          (nodes.includes(is_id) || nodes.includes(are_id))
        ) {
          return "Glad you ask! Explore the website and you will know before long :D";
        }
        return ulrikMsg;
      }
    },
    ulrikMsg,
    75
  );
};

// Hobby section
const hobby_id = "hobby:id";
const hobby_keys = ["hobby", "hoby", "hobbies", "hobie", "hobies"];
const hobby_message =
  "When Ulrik is not coding :) He very much enjoys spending time KiteSurfing, Playing the Piano and seeing Friends and Family!... Pssst, he codes alot though :P";
const hobbyNode = () => {
  return new Node(hobby_id, hobby_keys, 5, false, {}, hobby_message, 75);
};

// Education section
const education_id = "school:id";
const education_keys = ["school", "education"];
const education_message = `\nUlrik has the following educations: 
Primary School 2002-2011
High School - Science 2012-2015
Bachelor Medicine 2016-2016
Bachelor in Software Engineering 2017-2020
\nAnd yes, Ulrik did go to Medicin. However, he found his right calling in software.
After his bachelor in software engineering he wants to continue with a Master in Software Engineering also at SDU.\n`;
const educationNode = () => {
  return new Node(
    education_id,
    education_keys,
    5,
    false,
    {},
    education_message,
    45
  );
};

// Family section
const family_id = "family:id";
const family_keys = ["family", "familly", "familie"];
const family_message = "Ulrik's family is none of your business... :)";
const familyNode = () => {
  return new Node(family_id, family_keys, 5, false, {}, family_message, 75);
};

// Ulsan section
const ulsan_id = "ulsan:id";
const ulsan_keys = ["ulsan"];
const ulsan_message = `You might have noticed similarities between Ulrik and Ulsan, and wondered why is the chatbots name Ulsan? It is very simple... Ulrik got the nickname Ulsan at SDU and named me thereafter.`;
const ulsanNode = () => {
  return new Node(
    ulsan_id,
    ulsan_keys,
    5,
    false,
    {
      context: nodes => {
        if (
          nodes.includes(what_id) &&
          (nodes.includes(is_id) || nodes.includes(are_id))
        ) {
          return "I am a personal FAQ bot";
        }
        if (
          nodes.includes(how_id) &&
          (nodes.includes(is_id) || nodes.includes(are_id))
        ) {
          return "I dont like to talk about myself, however i do consider myself a friendly chatbot";
        }
        if (
          nodes.includes(who_id) &&
          (nodes.includes(is_id) || nodes.includes(are_id))
        ) {
          return "The chatbot creation of Ulrik Sandberg";
        }
        return ulsan_message;
      }
    },
    ulsan_message,
    75
  );
};

// Languages
const language_id = "language:id";
const language_keys = ["languages", "lang", "language"];
const language_message =
  "Ulrik speaks two languages. Danish as his native languages and is also fluent in english.";
const languageNode = () => {
  return new Node(
    language_id,
    language_keys,
    5,
    false,
    {},
    language_message,
    75
  );
};

// Website
const website_id = "website:id";
const website_keys = ["website", "web"];
const website_message = `You might be thinking, how is this awesome website made? Well you are in luck...
It is made with ReactJS and Redux. The different animations are created with P5.js, Three.js and css while this terminal is pure JS.`;
const websiteNode = () => {
  return new Node(website_id, website_keys, 5, false, {}, website_message, 75);
};

// coding origin
const cm_id = "coding:id";
const cm_keys = ["cm", "champagnemoments", "champagne_moments"];
const cm_message = `In 2014 my brother @Jesper Sandberg, founded Champagne Moments on Instagram. Since 2014 the profile grew in size and he eventually approached me as i've just began my software career, and thus i got involved as co-founder in the beginning of 2016. The profile has since grown and become one of the biggest champagne profiles in the world. Read alot more on the projects page.\n`;
const cmNode = () => {
  return new Node(cm_id, cm_keys, 5, false, {}, cm_message, 45);
};

// favorite
const favorite_id = "favorite:id";
const favorite_keys = ["favorite", "favourite"];
const favorite_message =
  "If you are looking for one of Ulrik's favorites try to type -help to get an overview of favorite usage";
const favoriteNode = () => {
  return new Node(
    favorite_id,
    favorite_keys,
    5,
    false,
    {},
    favorite_message,
    75
  );
};

// Beer section
const beer_id = "beer:id";
const beer_keys = ["beer"];
const beer_message = "Ulrik's favorite beer is an - Odense Albani Classic";
const beerNode = () => {
  return new Node(beer_id, beer_keys, 5, false, {}, beer_message, 75);
};

// Car section
const car_id = "car:id";
const car_keys = ["car"];
const car_message = "Ulrik's favorie car is an - Lambhorghini Urus";
const carNode = () => {
  return new Node(car_id, car_keys, 5, false, {}, car_message, 75);
};

// beverage section
const beverage_id = "beverage:id";
const beverage_keys = ["beverage"];
const beverage_message =
  "Ulrik's very favorite beverage is of course Champagne! His favorite is Louis Roederer Brut Premiier Champagne";
const beverageNode = () => {
  return new Node(
    beverage_id,
    beverage_keys,
    5,
    false,
    {},
    beverage_message,
    75
  );
};

// Movie section
const movie_id = "movie:id";
const movie_keys = ["movies", "movie"];
const movie_message = "Ulrik's favorite movie of all time is: Interstellar!!!";
const movieNode = () => {
  return new Node(movie_id, movie_keys, 5, false, {}, movie_message, 75);
};

// Hello secton
const hello_id = "hello:id";
const hello_keys = ["hello", "hi", "hey"];
const hello_message = "Hi there! How are you today?";
const helloNode = () => {
  return new Node(hello_id, hello_keys, 5, false, {}, hello_message, 75);
};

// Tools section
const tools_id = "tools:id";
const tools_keys = ["tools", "tool"];
const tools_message =
  "Ulrik has experience with alot of different technologies, amongst others are: \n Docker, Git, React, React-Redux, Xamarin Forms, Asp.Net Core 2.+^, MongoDB, SQL, Azure DevOps, Azure, Elastic Search, Postman, CircleCI, pygame, SendGrid";
const toolsNode = () => {
  return new Node(tools_id, tools_keys, 5, false, {}, tools_message, 50);
};

const randomKnowledgeFunction = () => {
  let randomList = [
    hobby_message,
    education_message,
    family_message,
    ulrikMsg,
    ulsan_message,
    language_message,
    website_message,
    cm_message,
    beer_message,
    beverage_message,
    movie_message,
    tools_message
  ];
  return randomList[Math.floor(Math.random() * randomList.length)];
};

const helpMsg = () => {
  return `\n\n ***I, Ulsan understand the following commands!*** \n
  -help  \t \t gossip\n
  hobbies\t \t education\n
  family \t \t ulsan\n
  ulrik  \t \t languages\n
  website\t \t champagne_moments or cm \n
  tools \t \t \n
  favorite beer, car, beverage, movie \n`;
};

const loadingAnimation = [
  "\n/",
  "\n/",
  "\n/",
  "\n/",
  "\n―",
  "\n―",
  "\n―",
  "\n―",
  "\n\\",
  "\n\\",
  "\n\\",
  "\n\\",
  "\n|",
  "\n|",
  "\n|",
  "\n|"
];

const dotLoadingAnimation = ["", ".", "..", "..."];

const unwantedCmdChars = [
  "*",
  ",",
  ".",
  "!",
  "@",
  "'",
  "¨",
  "`",
  "´",
  "#",
  "%",
  "&",
  "/",
  "\\",
  "(",
  ")",
  "=",
  "?",
  "$"
];

export {
  dotLoadingAnimation,
  loadingAnimation,
  whatNode,
  unwantedCmdChars,
  isNode,
  ulrikNode,
  whoNode,
  gossipNode,
  helpNode,
  areNode,
  howNode,
  hobbyNode,
  educationNode,
  familyNode,
  ulsanNode,
  languageNode,
  cmNode,
  favoriteNode,
  websiteNode,
  beerNode,
  beverageNode,
  carNode,
  movieNode,
  helloNode,
  toolsNode
};
