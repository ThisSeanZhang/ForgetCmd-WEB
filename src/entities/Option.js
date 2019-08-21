export default class Option {
  constructor(cmd) {
    this.cid = cmd.cid;
    this.commandName = cmd.commandName;
    this.briefDesc = cmd.briefDesc;
    this.description = cmd.description;
    this.version = cmd.version;
    this.platform = cmd.platform;
    this.argNum = cmd.argNum;
    this.whenDeprecated = cmd.whenDeprecated;
    this.whenEnable = cmd.whenEnable;
    this.frequency = cmd.frequency;
  }
}
