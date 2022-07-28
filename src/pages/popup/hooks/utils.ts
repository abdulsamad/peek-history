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

export const numberIterator = (
  start = -1,
  end = Infinity,
  resetVal = -1
): {
  value: () => number;
  reset: () => void;
  prev: () => { value: number; done: boolean };
  next: () => { value: number; done: boolean };
} => {
  let index = start;

  return {
    value: () => index,
    reset: () => (index = resetVal),
    prev: () =>
      index > 0
        ? { value: --index, done: false }
        : { value: index, done: true },
    next: () =>
      index < end
        ? { value: ++index, done: false }
        : { value: index, done: true },
  };
};
