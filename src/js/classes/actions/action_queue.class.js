/**
 * action_queue.class.js
 *
 * ActionQueue is a class that maintains a queue of actions to be
 * executed in the world.
 */
export class ActionQueue {
    constructor() {
        /**
         * A list of Action objects to be executed
         */
        this._actions = [];
    }

    /**
     * Public getter for actions
     * @returns {Action[]}
     */
    get actions() {
        return [ ...this._actions ];
    }

    /**
     * Adds an action the queue
     * @param {Action} action
     */
    addAction(action) {
        action.beforeExecute();
        this._actions.push(action);
    }

    /**
     * Executes the actions in the queue.
     * Completed actions will be removed from the queue.
     */
    execute() {
        this._actions = this._actions.map( (action) => {
            if (!action.isDone()) {
                action.execute();
                return action;
            }

            action.afterExecute();
            return action.nextAction();
        }).filter(Boolean);
    }
}
