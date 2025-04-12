import fs from "fs";
import path from "path";

const toSnakeCase = (str: string): string =>
  str
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1_$2")
    .toLowerCase();

const schemaPath = path.join(__dirname, "../schema.prisma");
const schema = fs.readFileSync(schemaPath, "utf-8");

let output = "";
let insideModel = false;
let currentModel = "";
let modelLines: string[] = [];

schema.split("\n").forEach((line) => {
  const modelMatch = line.match(/^model (\w+) {/);
  if (modelMatch) {
    insideModel = true;
    currentModel = modelMatch[1];
    modelLines = [line];
    return;
  }

  if (insideModel) {
    modelLines.push(line);

    if (line.trim() === "}") {
      // Evita duplicar @@map mesmo com espaços
      const alreadyMapped = modelLines.some((l) => l.includes("@@map("));

      if (!alreadyMapped) {
        const tableName = toSnakeCase(currentModel);
        modelLines.splice(modelLines.length - 1, 0, `  @@map("${tableName}")`);
      }

      // Aplica @map para os campos
      modelLines = modelLines.map((l) => {
        const trimmed = l.trim();
        if (
          trimmed.startsWith("@@") || // ignora @@map, @@index etc
          trimmed.startsWith("//") || // ignora comentários
          trimmed === "}" || // ignora fechamento
          trimmed === "" // ignora linhas vazias
        ) {
          return l;
        }

        const fieldMatch = trimmed.match(/^(\w+)\s+[\w\[\]\?]+/);
        if (!fieldMatch) return l;

        const fieldName = fieldMatch[1];
        const snake = toSnakeCase(fieldName);

        // Só adiciona @map se necessário
        if (snake !== fieldName && !l.includes("@map(")) {
          const [beforeComment, comment] = l.split("//");
          const spacing = " ".repeat(40 - beforeComment.length);
          return `${beforeComment}${spacing}@map("${snake}") ${comment || ""}`;
        }

        return l;
      });

      output += modelLines.join("\n") + "\n";
      insideModel = false;
      currentModel = "";
      modelLines = [];
    }

    return;
  }

  output += line + "\n";
});

fs.writeFileSync(schemaPath, output, "utf-8");
console.log("schema.prisma atualizado com snake_case para tabelas e colunas.");
