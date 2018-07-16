/**
 * action.class.js
 *
 * Defines a generic interface for actions.
 */
export class Action {
    /**
     * Constructor
     * @param {Object} data - An object containing data needed to execute the action
     */
    constructor(data) {
        this.data = data;
    }

    /**
     * This method runs once when an action is added to the queue
     */
    beforeExecute() { }

    /**
     * This method defines the behavior for the action.
     * Implement on all child Actions.
     */
    execute() {
        throw 'Implement execute() for Action';
    }

    /**
     * This method should return true when the action has been completed.
     * Implement on all child Actions.
     * @returns {boolean}
     */
    isDone() {
        throw 'Implement isDone() for Action';
    }

    /**
     * This method defines the behavior to execute after the action has completed.
     */
    afterExecute() { }
}
