import { createAsyncThunk } from "@reduxjs/toolkit";
import dayjs from "dayjs";

export const getHistory = createAsyncThunk(
  "history/getHistory",
  async ({
    text = "",
    maxResults = 50,
    startTime = dayjs("01-01-1970").valueOf(),
    endTime,
  }: {
    text?: string;
    maxResults?: number;
    startTime?: number;
    endTime?: number;
  }) => {
    const historyItems = await chrome.history.search({
      text,
      maxResults,
      startTime,
      endTime,
    });

    return historyItems;
  }
);

export const addHistory = createAsyncThunk(
  "history/addHistory",
  async ({
    text = "",
    maxResults = 50,
    startTime = dayjs("01-01-1970").valueOf(),
    endTime,
  }: {
    text?: string;
    maxResults?: number;
    startTime?: number;
    endTime?: number;
  }) => {
    const historyItems = await chrome.history.search({
      text,
      maxResults,
      startTime,
      endTime,
    });

    return historyItems;
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

export const deleteRange = createAsyncThunk(
  "history/deleteRange",
  async ({
    startTime,
    endTime = Date.now(),
  }: {
    startTime: number;
    endTime?: number;
  }) => {
    await chrome.history.deleteRange({ startTime, endTime });

    return true;
  }
);
