const readline = require("readline/promises");
const { GoogleGenAI } = require("@google/genai");

const history = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdin,
})

const ai = new GoogleGenAI({ apiKey: "YOUR_API_KEY" });
async function main() {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: "Explain how AI works in a few words",
    });
    console.log(response.text);
}

main();

async function chatLoop(params) {
    const question = await rl.question("You: ")
}