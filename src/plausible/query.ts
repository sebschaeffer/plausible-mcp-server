import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const queryTool: Tool = {
  name: "plausible_query",
  description:
    "Query Plausible Stats API. Provide site_id, metrics, and either date_range or date. Optional: dimensions, filters, order_by, include, pagination. date maps to date_range [date, date].",
  inputSchema: {
    type: "object",
    required: ["site_id", "metrics"],
    anyOf: [{ required: ["date_range"] }, { required: ["date"] }],
    examples: [
      {
        site_id: "example.com",
        metrics: ["visitors", "pageviews"],
        date: "2024-07-01",
      },
      {
        site_id: "example.com",
        metrics: ["visitors"],
        date_range: ["2024-07-01", "2024-07-07"],
        dimensions: ["visit:country_name"],
        filters: [["is", "visit:country_name", ["Germany"]]],
        order_by: [["visitors", "desc"]],
        include: { total_rows: true },
        pagination: { limit: 100, offset: 0 },
      },
    ],
    definitions: {
      filterExpression: {
        oneOf: [
          { $ref: "#/definitions/simpleFilter" },
          { $ref: "#/definitions/logicalFilter" },
        ],
      },
      simpleFilter: {
        type: "array",
        minItems: 3,
        maxItems: 4,
        items: [
          {
            type: "string",
            enum: [
              "is",
              "is_not",
              "contains",
              "not_contains",
              "has_done",
              "has_not_done",
            ],
          },
          { type: "string" },
          { type: "array", items: {} },
          { type: "object" },
        ],
        additionalItems: false,
      },
      logicalFilter: {
        oneOf: [
          {
            type: "array",
            minItems: 2,
            maxItems: 2,
            items: [
              { type: "string", enum: ["and", "or"] },
              {
                type: "array",
                minItems: 1,
                items: { $ref: "#/definitions/filterExpression" },
              },
            ],
            additionalItems: false,
          },
          {
            type: "array",
            minItems: 2,
            maxItems: 2,
            items: [
              { type: "string", enum: ["not"] },
              { $ref: "#/definitions/filterExpression" },
            ],
            additionalItems: false,
          },
        ],
      },
    },
    properties: {
      site_id: {
        type: "string",
        description: "The domain of the site to query data for",
      },
      metrics: {
        type: "array",
        items: {
          type: "string",
        },
        description:
          "String list of metrics to query with the following options: 'visitors' 'int' The number of unique visitors | 'visits' 'int' The number of visits/sessions | 'pageviews'	'int' The number of pageview events	 | 'views_per_visit'	'float' The number of pageviews divided by the number of visits.	 | 'bounce_rate'	'float' Bounce rate percentage	 | 'visit_duration'	'int' Visit duration in seconds	 | 'events'	'int' The number of events (pageviews + custom events). When filtering by a goal, this metric corresponds to 'Total Conversions' in the dashboard.	 | 'scroll_depth'	'int' Page scroll depth averaged per session	Requires event:page filter or dimension being set | 'time_on_page'	'int' Average time in seconds spent on a page per visit	Requires event:page filter or dimension being set | 'percentage'	'float' The percentage of visitors of total who fall into this category	Requires non-empty dimensions | 'conversion_rate'	'float' The percentage of visitors who completed the goal.	Requires non-empty dimensions, event:goal filter or dimension being set | 'group_conversion_rate'	'float' The percentage of visitors who completed the goal with the same dimension. Requires: dimension list passed, an event:goal filter or event:goal dimension	Requires non-empty dimensions, event:goal filter or dimension being set | 'average_revenue'	'Revenue' or null	Average revenue per revenue goal conversion	Requires revenue goals, event:goal filter or dimension for a relevant revenue goal. | 'total_revenue'	'Revenue' or null	Total revenue from revenue goal conversions	Requires revenue goals, event:goal filter or dimension for a relevant revenue goal.",
      },
      date_range: {
        description:
          'Date range for the query, with the following options: ["2024-01-01", "2024-07-01"] Custom date range (ISO8601) | ["2024-01-01T12:00:00+02:00", "2024-01-01T15:59:59+02:00"] Custom date-time range (ISO8601) | "day"	Current day (e.g. 2024-07-01) | "7d"	Last 7 days relative to today | "28d" Last 28 days relative to today | "30d"	Last 30 days relative to today | "91d" Last 91 days relative to today | "month" Since the start of the current month | "6mo" Last 6 months relative to start of this month | "12mo" Last 12 months relative to start of this month | "year" Since the start of this year | "all"',
        oneOf: [
          { type: "string" },
          {
            type: "array",
            items: { type: "string" },
            minItems: 2,
            maxItems: 2,
          },
        ],
      },
      date: {
        type: "string",
        description:
          "Convenience single date (YYYY-MM-DD). Mapped to date_range [date, date]. If both date and date_range are set, date_range wins.",
      },
      dimensions: {
        type: "array",
        items: { type: "string" },
        description: "List of dimensions to group by (e.g., 'visit:country')",
      },
      filters: {
        type: "array",
        items: { $ref: "#/definitions/filterExpression" },
        description:
          "Filter structure as documented by Plausible Stats API. Operators: is, is_not, contains, not_contains, has_done, has_not_done, and, or, not. Example: [\"is\", \"visit:country_name\", [\"Germany\"]] or [\"and\", [[...], [...]]].",
      },
      order_by: {
        type: "array",
        items: {
          type: "array",
          items: [
            { type: "string" },
            { type: "string", enum: ["asc", "desc"] },
          ],
          minItems: 2,
          maxItems: 2,
          additionalItems: false,
        },
        description:
          'Ordering for results, e.g. [["visitors", "desc"], ["visit:country_name", "asc"]]',
      },
      include: {
        type: "object",
        properties: {
          imports: { type: "boolean" },
          time_labels: { type: "boolean" },
          total_rows: { type: "boolean" },
        },
        additionalProperties: false,
        description:
          "Include options (imports, time_labels, total_rows) for additional response metadata.",
      },
      pagination: {
        type: "object",
        properties: {
          limit: { type: "integer" },
          offset: { type: "integer" },
        },
        additionalProperties: false,
        description: "Pagination options (limit and offset).",
      },
    },
  },
};
