import { academicRulesText } from "../shared/context.js";

export function registerYonetmelikResource(mcpServer) {
  mcpServer.registerResource(
    "universite-yonetmeligi",
    "http://localhost:3000/api/universite-yonetmeligi.txt",
    { title: "Universite Yonetmeligi", description: "Salt-okunur yonetmelik ozeti.", mimeType: "text/plain" },
    async () => ({ contents: [{ uri: "http://localhost:3000/api/universite-yonetmeligi.txt", mimeType: "text/plain", text: academicRulesText }] })
  );
}
