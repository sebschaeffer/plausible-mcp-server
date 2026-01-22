export type DateRange = string | [string, string];

export interface QueryArgs {
  site_id: string;
  metrics: string[];
  date_range?: DateRange;
  date?: string;
  dimensions?: string[];
  filters?: unknown[];
  order_by?: Array<[string, "asc" | "desc"]>;
  include?: {
    imports?: boolean;
    time_labels?: boolean;
    total_rows?: boolean;
  };
  pagination?: {
    limit?: number;
    offset?: number;
  };
}

export type QueryPayload = Omit<QueryArgs, "date" | "date_range"> & {
  date_range: DateRange;
};
