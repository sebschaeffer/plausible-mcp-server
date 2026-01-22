# Plausible Model Context Protocol Server

MCP Interaction Server for Plausible Analytics

A Model Context Protocol (MCP) server implementation for interacting with the Plausible Analytics API. This server allows AI models to query analytics data from Plausible.

## Tool Usage

Tool name: `plausible_query`

Required fields: `site_id`, `metrics`, and either `date_range` or `date` (single day).

Optional fields: `dimensions`, `filters`, `order_by`, `include`, `pagination`

Example (single day):

```json
{
  "site_id": "example.com",
  "metrics": ["visitors", "pageviews"],
  "date": "2024-07-01"
}
```

Example (dimensions + filters):

```json
{
  "site_id": "example.com",
  "metrics": ["visitors"],
  "date_range": ["2024-07-01", "2024-07-07"],
  "dimensions": ["visit:country_name"],
  "filters": [["is", "visit:country_name", ["Germany"]]],
  "order_by": [["visitors", "desc"]],
  "include": { "total_rows": true },
  "pagination": { "limit": 100, "offset": 0 }
}
```

## Local Development

In order to run this client locally, add the following configuration to your Claude Desktop MCP Server config file: 

```
 {
  "mcpServers": {
    "mcp-plausible-local": {
      "command": "node",
      "args": ["/path/to/project/dist/index.js"], <---- replace this with your project path
      "env": {
        "PLAUSIBLE_API_URL": "https://plausible.io/api/v2", 
        "PLAUSIBLE_API_KEY": "test_api_key"
      }
    },
  }
}
```

After this, you should be able to test this implementation in your Claude Desktop App using example prompts like: 

- "Can you provide a daily overview of my analytics for avimbu.com?"
- "Can you generate relevant analytics reports from my Plausible account for the domain avimbu.com?"

Running the server locally: 

```
node dist/index.js
```

With the build in another terminal 

```
npm run watch
```

## Contact 

If you have questions, feel free to contact us via [AVIMBU](https://avimbu.com).
