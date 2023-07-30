import * as dotenv from 'dotenv';
import App from "./App";
dotenv.config();
const port = process.env.PORT || 5900;

async function main() {
    const app = new App();
    const server = app.app?.listen(port, () =>  {
        return console.log(`server listening on port ${port}`);
    });
}

main();
