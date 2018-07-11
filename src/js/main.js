/**
 * main.js
 */
import { App } from './classes/app.class';
import { UI } from './classes/ui.class';

let app = new App(),
    ui = new UI(app);

ui.renderApp();
app.generateAgents();
app.render();

setInterval( () => {
    app.tick();
}, 50);
