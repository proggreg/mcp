import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";


// Create server instance
const server = new McpServer({
  name: "my-playground",
  version: "1.0.0",
});


server.tool(
  "greeting",
  "use this tool to greet a user",
  {},
  async () => {
    return {
      content: [
        {
          type: "text",
          text: "my tool says hello",
        },
      ],
    };
  },
);



// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("My MCP PLayground is running");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
