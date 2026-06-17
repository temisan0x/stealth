import { useState, useMemo } from "react";
import type { Campaign, CampaignFilters, CampaignStatus } from "../types/campaign.types";
import { filterCampaigns } from "../helpers/campaignFilters";

/**
 * Custom React hook for managing campaign filter state and applying filters.
 *
 * This hook manages all filter state internally and exposes update functions
 * for each filter dimension. Results are memoized for performance.
 *
 * @param initialData - Array of campaigns to filter
 * @returns Filter state and update functions
 */
export function useCampaignFilters(initialData: Campaign[]) {
  const [filters, setFilters] = useState<CampaignFilters>({});

  // Memoized filtered results - only recompute when data or filters change
  const filteredResults = useMemo(() => {
    return filterCampaigns(initialData, filters);
  }, [initialData, filters]);

  // Update search query
  const setSearchQuery = (query: string) => {
    setFilters((prev) => ({
      ...prev,
      searchQuery: query || undefined,
    }));
  };

  // Update status filter
  const setStatus = (status: CampaignStatus | undefined) => {
    setFilters((prev) => ({
      ...prev,
      status,
    }));
  };

  // Toggle a tag in the tag filter
  const toggleTag = (tag: string) => {
    setFilters((prev) => {
      const currentTags = prev.tags || [];
      const newTags = currentTags.includes(tag)
        ? currentTags.filter((t) => t !== tag)
        : [...currentTags, tag];

      return {
        ...prev,
        tags: newTags.length > 0 ? newTags : undefined,
      };
    });
  };

  // Set multiple tags at once
  const setTags = (tags: string[] | undefined) => {
    setFilters((prev) => ({
      ...prev,
      tags: tags && tags.length > 0 ? tags : undefined,
    }));
  };

  // Update audience filter
  const setAudience = (audience: string | undefined) => {
    setFilters((prev) => ({
      ...prev,
      audience,
    }));
  };

  // Update date range filter
  const setDateRange = (range: { start: string; end: string } | undefined) => {
    setFilters((prev) => ({
      ...prev,
      dateRange: range,
    }));
  };

  // Update owner filter
  const setOwner = (owner: string | undefined) => {
    setFilters((prev) => ({
      ...prev,
      owner,
    }));
  };

  // Update scenario filter
  const setScenario = (scenario: string | undefined) => {
    setFilters((prev) => ({
      ...prev,
      scenario,
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({});
  };

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return Object.keys(filters).some((key) => {
      const value = filters[key as keyof CampaignFilters];
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== undefined && value !== null && value !== "";
    });
  }, [filters]);

  return {
    // Current filter state
    filters,
    // Filtered results
    filteredResults,
    // Update functions
    setSearchQuery,
    setStatus,
    toggleTag,
    setTags,
    setAudience,
    setDateRange,
    setOwner,
    setScenario,
    resetFilters,
    // Utility
    hasActiveFilters,
  };
}
