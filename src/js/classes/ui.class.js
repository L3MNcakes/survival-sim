/**
 * ui.class.js
 */
export class UI {
    constructor(app) {
        this.app = app;
    }

    renderApp() {
        document.body.appendChild(this.app.pixiApp.view);
    }
}
