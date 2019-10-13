import {
  whatNode,
  unwantedCmdChars,
  isNode,
  ulrikNode,
  whoNode,
  gossipNode,
  helpNode,
  howNode,
  areNode,
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
  helloNode
} from "./TerminalUtils";
import { Favorite } from "@material-ui/icons";

class CmdDispatcher {
  constructor() {
    this.network = new Network();
    this.network.init();
  }

  handleCommand = cmd => {
    let preparedCmd = cmd.toLowerCase();
    let response = this.findCandidateResponses(preparedCmd);
    return response;
  };

  findCandidateResponses = cmd => {
    // Remove all wierd characters!
    var cleanedCmd = "";
    for (let i = 0; i < cmd.length; i++) {
      if (!unwantedCmdChars.includes(cmd[i])) {
        cleanedCmd += cmd[i];
      }
    }
    // Split into fragments and removoe any white space other than the original
    var fragmentedCmd = cleanedCmd.split(" ").filter(v => v !== "");
    // Ask Network for response
    var response = this.network.processCommand(fragmentedCmd);
    response.proccessData();

    // If there is a terminal node this should be handle with priority above everything else...!
    if (response.terminalNode !== null) {
      return response.terminalNode.getAnswer([]);
    }
    // No familiar cmds
    if (response.accumulatedNodes.length === 0) {
      return {
        message: "I'm sorry I dont know this...",
        speed: 50
      };
    }
    // The response is singleton - Let the particular node handle response
    if (response.accumulatedNodes.length === 1) {
      return response.strongestPath.root.node.getAnswer(
        response.unknownCmdFragments
      );
    } else {
      // Determine which node should get to deside the context, traverse the strongestPath for the most important node
      let strongestNode = response.strongestPath.getStrongestNode();
      // Next Get all naturally according nodes before the most important to give it some context about the text to show
      let preNodes = response.getPreNodes(strongestNode);
      if (preNodes.length > 0) {
        return strongestNode.getContextAnswer(preNodes);
      } else {
        return strongestNode.getAnswer([]);
      }
    }
  };
}

class PathNode {
  constructor(cmdFragment, node) {
    this.node = node;
    this.cmdFragment = cmdFragment;
    this.child = null;
  }
}

class Path {
  constructor(rootNode) {
    this.root = rootNode;
    this.end = rootNode;
  }

  appendNodeToPath = node => {
    this.addLeafNode(this.root, node);
  };

  addLeafNode = (parent, node) => {
    if (parent.child !== null) {
      this.addLeafNode(parent.child, node);
    } else {
      parent.child = node;
      this.end = node;
    }
  };

  getStrongestNode = () => {
    let arr = this.toArray();
    let strongestNode = null;
    let strength = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].weight >= strength) {
        strongestNode = arr[i];
        strength = arr[i].weight;
      }
    }
    return strongestNode;
  };

  isSingleton = () => {
    return this.root.child === null ? true : false;
  };

  toArray = () => {
    var arr = this.iterate([], this.root);
    return arr;
  };

  iterate = (arr, root) => {
    arr.push(root.node);
    if (root.child !== null) {
      return this.iterate(arr, root.child);
    } else {
      return arr;
    }
  };
}

class CommandSummary {
  constructor() {
    this.paths = [];
    this.unknownCmdFragments = [];
    this.originalNodeOrder = [];
    this.accumulatedNodes = [];
    this.terminalNode = null;
    this.strongestPath = null;
  }

  addPath = path => {
    this.paths.push(path);
    path.toArray().forEach(v => this.originalNodeOrder.push(v));
  };

  getPreNodes = node => {
    var arr = [];
    for (let i = 0; i < this.originalNodeOrder.length; i++) {
      if (this.originalNodeOrder[i].id !== node.id) {
        arr.push(this.originalNodeOrder[i]);
      } else {
        return arr;
      }
    }
  };

  proccessData = () => {
    let maxWeight = 0;
    for (let i = 0; i < this.paths.length; i++) {
      let totalWeight = 0;
      var arr = this.paths[i].toArray();
      arr.forEach(element => {
        if (element.isTerminal) {
          this.terminalNode = element;
        }
        totalWeight += element.weight;
        this.accumulatedNodes.push(element);
      });
      if (totalWeight > maxWeight) {
        this.strongestPath = this.paths[i];
        maxWeight = totalWeight;
      }
    }
  };
}

class Network {
  constructor() {
    this.nodes = [];
  }

  init = () => {
    // Node initialization
    let what = whatNode();
    let is = isNode();
    let ulrik = ulrikNode();
    let who = whoNode();
    let gossip = gossipNode();
    let help = helpNode();
    let how = howNode();
    let are = areNode();
    let hobby = hobbyNode();
    let education = educationNode();
    let family = familyNode();
    let ulsan = ulsanNode();
    let language = languageNode();
    let cm = cmNode();
    let favorite = favoriteNode();
    let website = websiteNode();
    let beer = beerNode();
    let beverage = beverageNode();
    let car = carNode();
    let movie = movieNode();
    let hello = helloNode();

    // Node association
    what.addNeighboor(is);
    what.addNeighboor(are);
    who.addNeighboor(is);
    who.addNeighboor(are);
    how.addNeighboor(is);
    how.addNeighboor(are);
    is.addNeighboor(ulrik);
    is.addNeighboor(ulsan);
    are.addNeighboor(ulrik);
    are.addNeighboor(ulsan);
    ulrik.addNeighboor(hobby);
    ulrik.addNeighboor(education);
    ulrik.addNeighboor(family);
    ulrik.addNeighboor(favorite);
    favorite.addNeighboor(beer);
    favorite.addNeighboor(beverage);
    favorite.addNeighboor(car);
    favorite.addNeighboor(movie);

    // Node network introduction
    this.nodes.push(
      what,
      is,
      ulrik,
      who,
      gossip,
      help,
      how,
      are,
      hobby,
      education,
      family,
      ulsan,
      language,
      cm,
      favorite,
      website,
      beer,
      beverage,
      car,
      movie,
      hello
    );
  };

  processCommand = cmdFragments => {
    let commandSummary = new CommandSummary();
    let currentPath = null;

    for (let i = 0; i < cmdFragments.length; i++) {
      // Check if currentNode is null, check if network contains cmd
      if (currentPath === null) {
        let node = this.findNode(cmdFragments[i]);
        if (node !== null) {
          currentPath = new Path(new PathNode(cmdFragments[i], node));
        } else {
          commandSummary.unknownCmdFragments.push(cmdFragments[i]);
        }
      } else {
        let neighboor = currentPath.end.node.locateNeighboor(cmdFragments[i]);
        // If neighboor is not null append this to the path
        if (neighboor !== null) {
          currentPath.appendNodeToPath(
            new PathNode(cmdFragments[i], neighboor)
          );
        } else {
          // Just because neighboor is null the cmdFragment could still be in the network - Clean up!
          // add the currentPath to commandSummary and begin new path seeing as we could not find a neighboor
          commandSummary.addPath(currentPath);
          currentPath = null;
          let node = this.findNode(cmdFragments[i]);
          if (node !== null) {
            currentPath = new Path(new PathNode(cmdFragments[i], node));
          } else {
            commandSummary.unknownCmdFragments.push(cmdFragments[i]);
          }
        }
      }
    }
    if (currentPath !== null) {
      commandSummary.addPath(currentPath);
    }
    return commandSummary;
  };

  findNode = cmdFragment => {
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].matchCmdFragment(cmdFragment)) {
        return this.nodes[i];
      }
    }
    return null;
  };
}

export class Node {
  constructor(id, titles, weight, isTerminal, fallbackMsg, message, speed) {
    this.id = id;
    this.titles = titles;
    this.isTerminal = isTerminal;
    this.message = message;
    this.fallBackMessages = fallbackMsg;
    this.weight = weight;
    this.neighboor = [];
    this.speed = speed;
  }

  matchCmdFragment = cmdFragment => {
    for (let i = 0; i < this.titles.length; i++) {
      if (cmdFragment === this.titles[i]) {
        return true;
      }
    }
    return false;
  };

  // Use this everytime that there is a single known cmd and unkownCmdFragment
  getAnswer = unknownCmdFragments => {
    // If there is a message - Prioritize that
    if (this.message !== null) {
      return { message: this.message, speed: this.speed };
    }
    // Check if there are any fragments next - And play fragment message
    if (
      unknownCmdFragments.length > 0 &&
      this.fallBackMessages.fragments["fragments"] !== null
    ) {
      return {
        message: this.fallBackMessages.fragments(unknownCmdFragments.join(" ")),
        speed: this.speed
      };
    }
    // fallback to default message
    return { message: this.fallBackMessages.default(), speed: this.speed };
  };

  isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  getContextAnswer = otherNodes => {
    // Only call the context handler if it is not nul
    if (
      this.fallBackMessages["context"] !== null &&
      !this.isEmpty(this.fallBackMessages)
    ) {
      return {
        message: this.fallBackMessages.context(otherNodes.map(v => v.id)),
        speed: this.speed
      };
    }
    if (this.message != null) {
      return {
        message: this.message,
        speed: this.speed
      };
    }

    return { message: this.fallBackMessages.default(), speed: this.speed };
  };

  addNeighboor = (node, twoWay) => {
    let shouldAdd = true;
    //Check if a node with node.id has already been added.
    for (let i = 0; i < this.neighboor.length; i++) {
      if (this.neighboor[i].id === node.id) {
        shouldAdd = false;
      }
    }
    if (shouldAdd) {
      this.neighboor.push(node);
    }

    if (twoWay) {
      node.addNeighboor(this);
    }
  };

  locateNeighboor = cmdFragment => {
    for (let i = 0; i < this.neighboor.length; i++) {
      if (this.neighboor[i].matchCmdFragment(cmdFragment) === true) {
        return this.neighboor[i];
      }
    }
    return null;
  };
}

export default CmdDispatcher;
