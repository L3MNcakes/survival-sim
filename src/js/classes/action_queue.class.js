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
        this.actions = [];
    }

    /**
     * Adds an action the queue
     * @param {Action} action
     */
    addAction(action) {
        this.actions.push(action);
    }

    /**
     * Executes the actions in the queue.
     * Completed actions will be removed from the queue.
     */
    execute() {
        this.actions = this.actions.map( (action) => {
            if (action.isDone()) {
                // Returning false will remove the action from the queue
                return false;
            }

            action.execute();
            return action;
        }).filter(Boolean);
    }
}
