import schemas from "../schema.js";

export async function getClients() {
    try {
        const [clients] = await schemas.Client.find();
        console.log(clients);
    }
    catch (err) {
        console.log(err);
    }
}