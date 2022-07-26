export interface ISettings {
  theme: "default" | "dark" | "light";
  font: string;
  accent: string;
  accentFont: string;
  popupWidth: number;
  hideURL: boolean;
  sort: "last-visit" | "most-visit";
  infinite: boolean;
  openURL: "new-tab" | "current-tab" | "background-tab";
  hideTime: boolean;
}

export const settings: ISettings = {
  theme: "default",
  font: "",
  accent: "#64B5F6",
  accentFont: "#f5f5f5",
  popupWidth: 400,
  hideURL: false,
  sort: "last-visit",
  infinite: true,
  openURL: "new-tab",
  hideTime: false,
};

export const accents = [
  { color: "#64B5F6" },
  { color: "#E57373" },
  { color: "#4db6ac" },
  { color: "#4dd0e1" },
  { color: "#ffd54f" },
  { color: "#f06292" },
];
