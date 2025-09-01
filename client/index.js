import { config } from "dotenv";
import readline from "readline/promises";
import { GoogleGenAI } from "@google/genai"

config();

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API_KEY });

async function main() {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: "Explain how AI works in a few words",
    });
    console.log(response.text);
}
await main();

const chatHistory = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

async function chatLoop(params) {
    const question = await rl.question("You: ")

    chatHistory.push({
        role: "user",
        parts: [
            {
                text: question,
                type: "text",
            }
        ]
    });
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: chatHistory,
    });

    chatHistory.push({
        role: "model",
        parts: [
            {
                text: response.candidates[0].content.parts[0].text,
                type: "text",
            }
        ]
    })
    console.log(`AI : ${response.candidates[0].content.parts[0].text}`)
    chatLoop();

}
chatLoop();