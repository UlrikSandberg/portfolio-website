import React from "react";

import style from "./terminal.css";
import CmdDispatcher from "./cmdDispatcher";
import { delay } from "q";
import { loadingAnimation, dotLoadingAnimation } from "./TerminalUtils";
import { thisExpression } from "@babel/types";
import VizSensor from "react-visibility-sensor";

class Terminal extends React.Component {
  constructor(props) {
    super(props);
    this.textAreaRef = React.createRef();
    this.state = {
      terminalMsg: "",
      history: "",
      currentCmd: "",
      isWriting: true,
      initAnimation: false,
      ready: false
    };
    this.cmdDispatcher = new CmdDispatcher();
  }

  componentDidMount() {
    this.setState({ ready: true });
  }

  startAnimation = () => {
    if (!this.state.initAnimation && this.state.ready) {
      this.setState({ initAnimation: true });
      this.initTerminalText();
    }
  };

  ani100 = 100;
  ani500 = 500;
  ani750 = 750;

  initTerminalText = async () => {
    // Initial initialize text
    await this.animateText("Initializing...", 75);
    await delay(300);

    // method essentials
    var animationTicks = 0;
    var currentText = this.state.terminalMsg;
    // Run first loading animation without percentage

    for (let i = 0; i < 22; i++) {
      this.setText(`${currentText} ${loadingAnimation[animationTicks]}`);
      await delay(25);
      animationTicks += animationTicks > 14 ? -15 : 1;
    }
    // Run looading animation with percentage
    animationTicks = 0;

    for (let i = 0; i < 100; i++) {
      this.setText(
        `${currentText} ${loadingAnimation[animationTicks]} ${i + 1}%`
      );
      await delay(25);
      animationTicks += animationTicks > 14 ? -15 : 1;
    }
    this.appendText("\nroot@UlsanFAQBot:/#");
    await delay(this.ani500);
    await this.animateText(" cd bin", this.ani100);
    this.appendText("\nroot@UlsanFAQBot:/bin#");
    await delay(this.ani500);
    await this.animateText(" sh setup.sh", this.ani100);

    //Animate loading of setup
    currentText = this.state.terminalMsg;
    for (let i = 0; i < 100; i++) {
      this.setText(`${currentText} ${loadingAnimation[animationTicks]}`);
      await delay(25);
      animationTicks += animationTicks > 14 ? -15 : 1;
    }
    await delay(this.ani750);
    this.appendText("\nroot@UlsanFAQBot:/bin#");
    await delay(this.ani500);
    await this.animateText(" cd .. && cd usr", this.ani100);
    this.appendText("\nroot@UlsanFAQBot:/usr#");
    await delay(this.ani500);
    await this.animateText(
      " sudo python -verbose -benign -humor=75% -instantKill=true -brain=NEAT UlsanBot.py",
      this.ani100
    );
    this.appendText("\n\npassword: ");
    await delay(this.ani750);
    await this.animateText("**********", this.ani100);
    await delay(this.ani500);
    currentText = this.state.terminalMsg;
    for (let i = 0; i < 24; i++) {
      this.setText(`${currentText} ${loadingAnimation[animationTicks]}`);
      await delay(25);
      animationTicks += animationTicks > 14 ? -15 : 1;
    }
    await this.dotLoader("# Setting Configurations", 3);
    await this.dotLoader("# Unzipping Dark Secrets", 5);
    await this.dotLoader("# Planning for world domination", 1);
    await this.dotLoader("# Training Neural Network Model", 9);
    await this.dotLoader("# Preparing QuestionHandler", 8);
    await this.dotLoader("# Cleaning Up", 2);

    this.appendText("\n\n");

    await this.animateText(
      "> Hello I'm Ulsan your personal FAQ Bot. Type gossip to get random information or -help to get an overview.",
      this.ani100
    );

    this.prepareUserInput();
  };

  prepareUserInput = () => {
    this.appendText("\n\n@UlsanFAQBot:cmd$ ");
    this.updateHistory(this.state.terminalMsg);
    this.setState({ isWriting: false });
  };

  dotLoader = async (text, time) => {
    this.appendText(`\n${text}`);
    await delay(this.ani100);
    let currentText = this.state.terminalMsg;
    let animationTicks = 0;
    for (let i = 0; i < time; i++) {
      this.setText(`${currentText}${dotLoadingAnimation[animationTicks]}`);
      await delay(this.ani500);
      animationTicks += animationTicks > 2 ? -3 : 1;
    }
    this.setText(currentText);
  };

  animateText = async (text, speed, nextLine, bashTrue) => {
    if (nextLine) {
      this.appendText("\n");
    }
    for (let i = 0; i < text.length; i++) {
      this.appendText(text[i]);
      await delay(speed);
    }
  };

  animateTextWithBottomPadding = async (text, speed) => {
    let msg = this.state.terminalMsg + "\n\n\n";

    for (let i = 0; i < text.length; i++) {
      this.setText(msg);
      await delay(speed);
    }
  };

  setText = text => {
    this.alterState(text);
  };

  appendText = text => {
    this.alterState(this.state.terminalMsg + text);
  };

  alterState = text => {
    this.setState({ terminalMsg: text });
    this.inputChange();
  };

  inputChange = () => {
    let ele = this.textAreaRef.current;

    if (ele.clientHeight < ele.scrollHeight) {
      ele.scrollTop = ele.scrollHeight;
    }
  };

  onKeyPress = event => {
    this.textAreaRef.current.selectionStart = this.textAreaRef.current.selectionEnd;
    let key = event.key;
    let cmd = this.state.currentCmd;

    if (key === "Enter") {
      if (!this.state.isWriting) {
        this.handleCommand();
      }
      this.ani100 = 1;
      this.ani500 = 5;
      this.ani750 = 7;
    } else {
      cmd += key;
      this.updateCommand(cmd);
    }
  };

  handleCommand = async () => {
    let cmd = this.state.currentCmd;
    let answer = await this.cmdDispatcher.handleCommand(cmd);
    if (answer.speed === 0) {
      this.appendText(answer.message);
    } else {
      this.appendText("\n");
      this.setState({ isWriting: true });
      await this.animateText(`> ${answer.message}`, answer.speed);
      this.setState({ isWriting: false });
    }

    this.appendText("\n@UlsanFAQBot:cmd$ ");
    this.updateHistory(this.state.terminalMsg);
    this.updateCommand("");
  };

  onBackspace = event => {
    this.textAreaRef.current.selectionStart = this.textAreaRef.current.selectionEnd;
    let key = event.key;
    let cmd = this.state.currentCmd;
    if (key === "Backspace") {
      if (cmd.length > 0) {
        let newString = cmd.substring(0, cmd.length - 1);
        this.updateCommand(newString);
      }
    }
  };

  updateHistory = text => {
    this.setState({ history: text });
  };

  updateCommand = text => {
    this.setState({
      currentCmd: text,
      terminalMsg: `${this.state.history}${text}`
    });
  };

  render() {
    return (
      <VizSensor onChange={this.startAnimation}>
        <div className="terminalContainer">
          <div className="terminalTitle">Learn more about Ulrik</div>
          <div className="terminalWindow">
            <div className="terminalWindowTopBar">
              <div className="terminalWindowMenuPoints">
                <div className="redQuit"></div>
                <div className="yellowMinimize"></div>
                <div className="greenEnhance"></div>
              </div>
            </div>
            <div className="terminalWindowTopBarTitle">
              <img
                className="terminalWindowTopBarIcon"
                src="macHomeIcon.png"
                alt="macHomeIcon"
              ></img>
              <div>Ulrik Sandberg --bash - 80x24</div>
            </div>
            <div className="terminalWindowContent">
              <textarea
                ref={this.textAreaRef}
                className="terminalWindowTextArea"
                value={this.state.terminalMsg}
                onKeyUp={this.onBackspace}
                onKeyPress={this.onKeyPress}
                onChange={() => console.log()}
                spellCheck="false"
              ></textarea>
            </div>
          </div>
        </div>
      </VizSensor>
    );
  }
}

export default Terminal;
