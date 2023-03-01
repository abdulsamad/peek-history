export const faviconURL = (u: string | undefined, size = "32") => {
  if (!u) return "";

  const url = new URL(chrome.runtime.getURL("/_favicon/"));
  url.searchParams.set("pageUrl", u);
  url.searchParams.set("size", size);
  return url.toString();
};
