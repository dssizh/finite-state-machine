class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this._history = [];
        this._pointer = 0;
        this._config = config;
        this._initialState = config.initial;
        this._currentState = config.initial;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this._currentState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {

        if (this._config.states[state] == undefined) {
            throw Error("");
        } else {
            this._pointer++;
            this._history.length = this._pointer;
            this._history[this._pointer - 1] = this._currentState;
            this._currentState = state;
            this._history[this._pointer] = this._currentState;
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {


        if (this._config.states[this.getState()].transitions[event] == undefined) {
            throw Error("");
        } else {
            this._pointer++;
            this._history.length = this._pointer;
            this._history[this._pointer - 1] = this._currentState;
            this._currentState = this._config.states[this.getState()].transitions[event];
            this._history[this._pointer] = this._currentState;
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this._currentState = this._initialState;
        this.clearHistory();
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let result = [];
        for (let prop in this._config.states) {
            if (this._config.states[prop].transitions[event] != undefined || event == undefined) {
                result.push(prop);
            }
        }
        return result;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this._pointer - 1 >= 0 && this._pointer - 1 <= this._history.length - 1) {
            this._pointer--;
            this._currentState = this._history[this._pointer];
            return true;
        } else {
            return false;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        console.log(this._history);

        if (this._pointer + 1 >= 0 && this._pointer + 1 <= this._history.length - 1) {
            this._pointer++;
            this._currentState = this._history[this._pointer];
            return true;
        } else {
            return false;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this._history.length = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
