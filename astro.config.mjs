import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  // Renseigne l'URL de production : elle sert aux balises canoniques et
  // Open Graph. Tant qu'elle est fausse, le site fonctionne mais les
  // métadonnées de partage pointeront au mauvais endroit.
  site: "https://labo.local",
  integrations: [react()],
});
