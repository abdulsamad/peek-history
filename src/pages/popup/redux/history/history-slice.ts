import { createSlice } from "@reduxjs/toolkit";
import { getHistory } from "./thunks";

interface IHistoryItem {
  id: string;
  lastVisitTime: number;
  title: string;
  typedCount: number;
  url: string;
  visitCount: number;
}

interface historyState {
  loading: boolean;
  items: IHistoryItem[];
}

const initialState: historyState = {
  loading: false,
  items: [
    {
      id: "62903",
      lastVisitTime: 1657175405201.2,
      title: "bio on freelance platform developer - Google Search",
      typedCount: 0,
      url: "https://www.google.com/search?q=bio+on+freelance+platform+developer&sxsrf=ALiCzsYsw9v1Lf_A5cqWHe1HCNx9TsASBw%3A1657175338468&ei=Kn3GYoKcHJit4-EP2_G-IA&ved=0ahUKEwiC2YSbk-b4AhWY1jgGHdu4DwQQ4dUDCA4&uact=5&oq=bio+on+freelance+platform+developer&gs_lcp=Cgdnd3Mtd2l6EAM6BwgAEEcQsAM6CggAEEcQsAMQyQM6BAgjECdKBAhBGABKBAhGGABQhwxY2S9g-jFoBXABeACAAdoBiAHaDJIBBTAuOS4xmAEAoAEByAEIwAEB&sclient=gws-wiz",
      visitCount: 2,
    },
    {
      id: "62901",
      lastVisitTime: 1657175349244.24,
      title: "description on freelance platform developer - Google Search",
      typedCount: 0,
      url: "https://www.google.com/search?q=description+on+freelance+platform+developer&oq=description+on+freelance+platform+developer&aqs=chrome..69i57j33i21.8844j0j7&sourceid=chrome&ie=UTF-8",
      visitCount: 3,
    },
    {
      id: "62902",
      lastVisitTime: 1657175343846.342,
      title: "Freelance Developer Job Description – Finxter",
      typedCount: 0,
      url: "https://blog.finxter.com/freelance-developer-job-description/",
      visitCount: 1,
    },
  ],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    deleteHistory(state) {
      console.log(state);
    },
  },
  extraReducers: {
    [`${getHistory.pending}`]: (state) => {
      state.loading = true;
    },
    [`${getHistory.fulfilled}`]: (state, action) => {
      state.loading = true;
      state.items = action.payload;
    },
  },
});

export const { deleteHistory } = historySlice.actions;
export default historySlice.reducer;
