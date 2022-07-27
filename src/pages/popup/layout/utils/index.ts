import { ISettings } from "@src/commons/redux/settings/defaults";

export const onURLClick = async (
  url: string,
  openURL: ISettings["openURL"]
) => {
  // Open link in new tab
  if (openURL === "new-tab") {
    await chrome.tabs.create({ url });
    return;
  } else if (openURL === "background-tab") {
    await chrome.tabs.create({ url, active: false });
    return;
  }

  // Open link in current tab
  await chrome.tabs.update({ url });
};
