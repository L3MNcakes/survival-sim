/**
 * agent_action.class.js
 */
const DEFAULT_NAME = "AgentAction";
const DEFAULT_INIT = () => null;
const DEFAULT_EXECTUTE = () => null;
const DEFAULT_ISDONE = () => true;

export class AgentAction {
    constructor(options) {
        this.name = options.name || DEFAULT_NAME;
        this.init = options.init || DEFAULT_INIT;
        this.execute = options.execute || DEFAULT_EXECTUTE;
        this.isDone = options.isDone || DEFAULT_ISDONE;
    }
}
