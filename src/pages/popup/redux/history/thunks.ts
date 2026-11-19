import { createAsyncThunk } from "@reduxjs/toolkit";

import type { HistoryState, IHistoryItem } from "./history-slice";

type ThunkConfig = { state: { history: HistoryState } };

const PAGE_SIZE = 50;

/**
 * chrome.history.search orders results by each URL's latest visit inside
 * [startTime, endTime), but reports lastVisitTime as the URL's latest visit
 * overall. Returns the in-range visit time, which is where the next page starts.
 */
const visitTimeBefore = async (item: IHistoryItem, endTime?: number) => {
  const { lastVisitTime, url } = item;

  if (
    lastVisitTime !== undefined &&
    (endTime === undefined || lastVisitTime < endTime)
  ) {
    return lastVisitTime;
  }

  const visits = await chrome.history.getVisits({ url: url as string });
  const before = visits
    .map(({ visitTime }) => visitTime ?? 0)
    .filter((time) => endTime === undefined || time < endTime);

  return before.length > 0 ? Math.max(...before) : undefined;
};

/**
 * Fetches one page of history visited before `endTime`, and the end time for the next page.
 */
const searchPage = async (text: string, endTime?: number) => {
  // Ask for one extra item to know whether more history remains
  const results = await chrome.history.search({
    text,
    startTime: 0,
    endTime,
    maxResults: PAGE_SIZE + 1,
  });

  const items = results.slice(0, PAGE_SIZE);
  const last = items[items.length - 1];
  const cursor =
    results.length > PAGE_SIZE && last
      ? await visitTimeBefore(last, endTime)
      : undefined;

  return { items, cursor, remaining: cursor !== undefined };
};

export const getHistory = createAsyncThunk(
  "history/getHistory",
  async ({ text = "" }: { text?: string }) => searchPage(text)
);

export const addHistory = createAsyncThunk<
  {
    items: IHistoryItem[];
    cursor?: number;
    remaining: boolean;
    searchId?: string;
  },
  void,
  ThunkConfig
>(
  "history/addHistory",
  async (_, { getState }) => {
    const { query, cursor, items, searchId } = getState().history;
    const shown = new Set(items.map(({ id }) => id));

    // URLs visited again later are already listed, so skip pages made only of those
    let page = await searchPage(query, cursor);
    let fresh = page.items.filter(({ id }) => !shown.has(id));

    while (fresh.length === 0 && page.remaining) {
      page = await searchPage(query, page.cursor);
      fresh = page.items.filter(({ id }) => !shown.has(id));
    }

    return { ...page, items: fresh, searchId };
  },
  {
    condition: (_, { getState }) => {
      const { remaining, loadingMore } = getState().history;
      return remaining && !loadingMore;
    },
  }
);

export const deleteItem = createAsyncThunk(
  "history/deleteItem",
  async (url: string) => {
    // Delete URL occurrences of the URL
    await chrome.history.deleteUrl({ url });

    return url;
  }
);

export const deleteAll = createAsyncThunk("history/deleteAll", async () => {
  await chrome.history.deleteAll();

  return true;
});

export const deleteRange = createAsyncThunk<
  void,
  { startTime: number; endTime?: number },
  ThunkConfig
>(
  "history/deleteRange",
  async ({ startTime, endTime = Date.now() }, { dispatch, getState }) => {
    await chrome.history.deleteRange({ startTime, endTime });

    // Reload the list for the current search
    await dispatch(getHistory({ text: getState().history.query }));
  }
);
