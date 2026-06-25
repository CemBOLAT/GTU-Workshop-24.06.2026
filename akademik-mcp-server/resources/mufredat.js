import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { courseCatalog } from "../shared/context.js";

export function registerMufredatResource(mcpServer) {
  mcpServer.registerResource(
    "ders-mufredatlari",
    new ResourceTemplate("http://localhost:3000/dersler/{ders_kodu}/mufredat", {
      list: async () => ({ resources: Object.values(courseCatalog).map((course) => ({ uri: `http://localhost:3000/dersler/${course.dersKodu}/mufredat`, name: `${course.dersAdi} mufredati`, description: `${course.dersAdi} dersinin haftalik planı`, mimeType: "application/json" })) })
    }),
    { title: "Ders Müfredati Sablonu", description: "dersler/{ders_kodu}/mufredat kalibi ile veri üretir.", mimeType: "application/json" },
    async (uri, variables) => {
      const dersKodu = String(variables.ders_kodu || "").toUpperCase();
      const normalizedKey = dersKodu.replace(/-/g, "_");
      const course = courseCatalog[normalizedKey];

      if (!course) {
        return { contents: [{ uri: uri.toString(), mimeType: "application/json", text: JSON.stringify({ hata: `${dersKodu} icin müfredat bulunamadi.` }, null, 2) }] };
      }

      return { contents: [{ uri: uri.toString(), mimeType: "application/json", text: JSON.stringify(course, null, 2) }] };
    }
  );
}
