import { whatNode, unwantedCmdChars } from "./TerminalUtils";

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

    // Split into fragments
    var fragmentedCmd = cleanedCmd.split(" ");
    // Ask Network for response
    var response = this.network.processCommand(fragmentedCmd);

    return response;
  };
}

class Network {
  constructor() {
    this.nodes = [];
  }

  init = () => {
    let what = whatNode;
    this.nodes.push(what);
  };

  processCommand = cmdFragments => {
    let startNode = null;
    for (let i = 0; i < cmdFragments.length; i++) {
      startNode = this.findNode(cmdFragments[i]);
    }
  };

  findNode = node_id => {
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes.length[i].id === node_id) {
        return this.nodes.length[i];
      }
    }
  };
}

export class Node {
  constructor(id, titles, weight, isTerminal, fallbackMsg, message) {
    this.id = id;
    this.titles = titles;
    this.isTerminal = isTerminal;
    this.message = message;
    this.fallBackMessages = fallbackMsg;
    this.weight = weight;
    this.neighboor = [];
  }

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
}

/*actions = [
    "-help",
    "gossip",
    "hobby",
    "hobbies",
    "hobies",
    "tools",
    "tool",
    "tooling",
    "testemonials",
    "recomendations",
    "what are",
    "what is",
    "clear",
    "food",
    "favorite",
    "drink",
    "dream",
    "car",
    "how is ulrik",
    "ulrik",
    "how",
    "snack",
    "school",
    "family",
    "coding",
    "did",
    "countries"
  ];*/

export default CmdDispatcher;
