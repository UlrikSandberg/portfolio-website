import node from "./cmdDispatcher";

// We should feature conditional fallbacks!

// What section
const what_id = "what:id";
const what = "what";
let whatNode = () =>
  new Node(
    what_id,
    [what],
    1,
    false,
    { default: "What, what?", speed: 100 },
    null
  );

// Is section
const is_id = "is:id";
const is = "is";
//let isNode = new Node(is_id, [is], ["What, is what?"], 2);

// Ulrik section
const ulrik_id = "ulrik:id";
const ulrik = "ulrik";
const ulle = "ulle";
/*let ulrikNode = new Node(
  ulrik_id[(ulrik, ulle)]["What do you want to know about Ulrik?"],
  10
);*/

// Are section
const are_id = "are:id";
const are = "are";
const ar = "ar";
/*let areNode = new Node(
  are_id,
  [are, ar]["Did you mean to elaborate on that are?"],
  2
);*/

// Hobby section
const hobby_id = "hobby:id";
const hobby = "hobby";
const hobbies = "hobbies";
const hoobies = "hoobies";
const hobies = "hobies";
/*let hobbyNode = new Node(
  hobby_id,
  [hoobies, hobies, hobby, hobbies],
  [],
  "When Ulrik is not coding :) He very much enjoys spending time KiteSurfing, Playing the Piano and seeing Friends and Family!... Pssst, but he codes alot :P",
  20
);*/

// Gossip section
const gossip_id = "gossip:id";
const gossip = "gossip";
const gosip = "gosip";
/*let gossipNode = new Node(
  gossip_id,
  [gosip, gossip],
  [],
  30,
  "Super duber funktion der"
);*/

// Help section
const help_id = "help:id";
const help1 = "help";
const help2 = "-help";
const help3 = "-h";
const help4 = "--help";
/*let helpNode = new Node(
  help_id,
  [help1, help2, help3, help4],
  [],
  30,
  "Super duber help message"
);*/

//Initialize network nodes!

// Node constructor decleration for easy lookup.
/*constructor(id, titles, weight, isTerminal, fallbackMsg, message) {
    this.id = id;
    this.titles = titles;
    this.isTerminal = isTerminal;
    this.message = message;
    this.fallBackMessages = fallbackMsg;
    this.weight = weight;
  }*/

// Weights

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
  what,
  is,
  ulrik,
  are,
  ar,
  hobby,
  hobbies,
  hobies,
  hoobies,
  ulle,
  gosip,
  gossip,
  help1,
  help2,
  help3,
  help4,
  dotLoadingAnimation,
  loadingAnimation,
  whatNode,
  unwantedCmdChars
};
