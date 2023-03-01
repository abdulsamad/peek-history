import { createAsyncThunk } from "@reduxjs/toolkit";

export const getShowUpdatePopup = createAsyncThunk(
  "ui/getShowUpdatePopup",
  async () => {
    const data = await chrome.storage.sync.get("showUpdatePopup");
    const showUpdatePopup = data?.showUpdatePopup;
    return showUpdatePopup;
  }
);
