import { Action } from "@reduxjs/toolkit";

const initialSate = {
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
    {
      id: "54974",
      lastVisitTime: 1657175239717.4329,
      title: "YouTube",
      typedCount: 0,
      url: "https://www.youtube.com/",
      visitCount: 1809,
    },
    {
      id: "62900",
      lastVisitTime: 1657175235055.017,
      title: 'Sia " Unstoppable " - YouTube',
      typedCount: 0,
      url: "https://www.youtube.com/watch?v=swO_840dx-A",
      visitCount: 1,
    },
    {
      id: "62899",
      lastVisitTime: 1657174856823.453,
      title: "$1 Salary Exposed - YouTube",
      typedCount: 0,
      url: "https://www.youtube.com/watch?v=f9a-OXKe1e8",
      visitCount: 1,
    },
    {
      id: "767",
      lastVisitTime: 1657174774717.246,
      title: "Feed | LinkedIn",
      typedCount: 1,
      url: "https://www.linkedin.com/feed/",
      visitCount: 294,
    },
  ],
};

const historyReducer = (state = initialSate, action: any) => {
  switch (action.type) {
    case "FETCH_HISTORY":
      return {
        ...state,
        items: action,
      };

    case "UPDATE_HISTORY":
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default historyReducer;
