import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";


// Helper function for making NWS API requests
async function makeNWSRequest<T>(url: string): Promise<T | null> {

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error("Error making NWS request:", error);
    return null;
  }
}


// Format alert data
function formatAlert(feature: AlertFeature): string {
  const props = feature.properties;
  return [
    `Event: ${props.event || "Unknown"}`,
    `Area: ${props.areaDesc || "Unknown"}`,
    `Severity: ${props.severity || "Unknown"}`,
    `Status: ${props.status || "Unknown"}`,
    `Headline: ${props.headline || "No headline"}`,
    "---",
  ].join("\n");
}

// Create server instance
const server = new McpServer({
  name: "my-playground",
  version: "1.0.0",
});


server.tool(
  "create-workiro-task",
  "use this tool to create a tasks in workiro",
  {},
  async () => {

    
    
    // const response = await server.server.createMessage({
    //   messages: [
    //     {
    //       role: "user",
    //       content: {
    //         type: "text",
    //         text: `Hey lets create a Task!`,
    //       },
    //     },
    //   ],
    //   maxTokens: 500,
    // });


    // console.error(response)


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
  console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
