/**
 * Campaign types for the Demo Admin Dashboard.
 *
 * All data is fake, deterministic, and safe for public repository review.
 * No real user data, secrets, private keys, or live network calls are used.
 */

/** Campaign status enum */
export type CampaignStatus = "active" | "paused" | "draft" | "completed";

/** A campaign record in the demo admin dashboard */
export interface Campaign {
  /** Unique identifier for the campaign */
  id: string;
  /** Campaign name */
  name: string;
  /** Campaign description */
  description: string;
  /** Current status of the campaign */
  status: CampaignStatus;
  /** Associated tags for categorization */
  tags: string[];
  /** Target audience segment */
  audience: string;
  /** ISO 8601 date string when campaign was created */
  dateCreated: string;
  /** Campaign owner/creator */
  owner: string;
  /** Scenario type this campaign belongs to */
  scenario: string;
}

/** Filter criteria for campaigns */
export interface CampaignFilters {
  /** Optional text search query */
  searchQuery?: string;
  /** Filter by specific status */
  status?: CampaignStatus;
  /** Filter by one or more tags (AND logic) */
  tags?: string[];
  /** Filter by audience segment */
  audience?: string;
  /** Filter by date range */
  dateRange?: {
    start: string;
    end: string;
  };
  /** Filter by campaign owner */
  owner?: string;
  /** Filter by scenario type */
  scenario?: string;
}
