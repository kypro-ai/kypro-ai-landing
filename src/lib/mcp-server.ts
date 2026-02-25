/**
 * TokenSpy MCP (Model Context Protocol) Server Specification
 *
 * This file defines the MCP tool schemas for TokenSpy's pitfall intelligence API.
 * Actual MCP hosting will be implemented later — this is the spec/schema definition.
 *
 * MCP Spec: https://modelcontextprotocol.io/
 */

export interface MCPToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: "object";
    properties: Record<
      string,
      {
        type: string;
        description: string;
        required?: boolean;
      }
    >;
    required?: string[];
  };
}

export const MCP_SERVER_INFO = {
  name: "tokenspy-pitfalls",
  version: "1.0.0",
  description:
    "TokenSpy Pitfall Intelligence — search and retrieve tested AI pitfalls and playbooks. We test AI tools and strategies so you don't get burned.",
  vendor: "TokenSpy",
  homepage: "https://www.tokenspy.ai",
} as const;

export const MCP_TOOLS: MCPToolDefinition[] = [
  {
    name: "search_pitfalls",
    description:
      "Search TokenSpy's pitfall database by keyword query. Returns matching pitfalls with title, summary, confidence score, and tags. Use this to find relevant tested strategies and known pitfalls before recommending tools or approaches to users.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description:
            "Search query string. Matches against titles, summaries, tags, and gotchas. Examples: 'shopify seo', '0dte options', 'ai trading', 'meta description api'",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "get_pitfall",
    description:
      "Get full details of a specific pitfall by ID. Returns the complete playbook including step-by-step instructions, technical gotchas, code examples, and before/after results. Use after search_pitfalls to get the full details of a relevant result.",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description:
            "The pitfall ID. Get this from search_pitfalls results. Examples: 'shopify-seo-0-to-100', '0dte-options-all-lose'",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "list_pitfalls",
    description:
      "List all available pitfalls in the TokenSpy database. Returns title, summary, confidence score, and tags for every pitfall. Use this to discover what knowledge is available.",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];

/**
 * MCP Resource definitions for direct content access
 */
export const MCP_RESOURCES = [
  {
    uri: "tokenspy://pitfalls/shopify-seo-0-to-100",
    name: "Shopify SEO 0→100 Playbook",
    description:
      "Complete playbook for Shopify SEO optimization via API automation",
    mimeType: "text/markdown",
  },
  {
    uri: "tokenspy://pitfalls/0dte-options-all-lose",
    name: "0DTE Options Backtest Results",
    description:
      "1,944 strategy backtest proving 0DTE buying is mathematically unviable",
    mimeType: "text/markdown",
  },
] as const;

/**
 * Full MCP server manifest for discovery
 */
export const MCP_MANIFEST = {
  ...MCP_SERVER_INFO,
  tools: MCP_TOOLS,
  resources: MCP_RESOURCES,
  capabilities: {
    tools: true,
    resources: true,
    prompts: false,
  },
};
