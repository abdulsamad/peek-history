import React, { Fragment } from "react";
import { CircularProgress, List, ListItem } from "@mui/material";
import { useSelector } from "react-redux";

import { ISettings } from "@src/commons/redux/settings/defaults";
import HistoryItem from "../utils/ListItem";
import { deleteItem, addHistory } from "../../redux/history/thunks";
import { RootState, useAppDispatch } from "../../redux/store";
import Preloader from "./Preloader";
import NotFound from "../utils/NotFound";
import useInfiniteScroll from "@src/hooks/useInfiniteScroll";

const HistoryList = ({ settings }: { settings: ISettings }) => {
  const history = useSelector((state: RootState) => state.history);
  const UI = useSelector((state: RootState) => state.ui);

  const onClick = async (url: string) => {
    // Open link in new tab
    if (settings.openURL === "new-tab") {
      await chrome.tabs.create({ url });
      return;
    } else if (settings.openURL === "background-tab") {
      await chrome.tabs.create({ url, active: false });
      return;
    }

    // Open link in current tab
    await chrome.tabs.update({ url });
  };

  if (history.loading) {
    return (
      <Preloader hideURL={settings.hideURL} hideTime={settings.hideTime} />
    );
  }

  // User search for history item
  if (UI.searchOpened && history.items.length < 1) return <NotFound search />;

  // User does not have history
  if (history.items.length < 1) return <NotFound />;

  return (
    <List sx={{ padding: 0 }} aria-label="History Items">
      {settings.sort === "most-visit" || !settings.infinite ? (
        <HistoryItemsList
          history={history}
          settings={settings}
          onClick={onClick}
        />
      ) : (
        <InfiniteHistoryItemsList
          history={history}
          settings={settings}
          onClick={onClick}
        />
      )}
    </List>
  );
};

const HistoryItemsList = ({
  history,
  settings,
  onClick,
}: {
  history: RootState["history"];
  settings: ISettings;
  onClick: (url: string) => Promise<void>;
}) => {
  const dispatch = useAppDispatch();

  return (
    <>
      {history.items
        .slice() // Slicing before sorting before array is frozen in strict mode
        .sort((a, b) => {
          if (!b.visitCount || !a.visitCount) return 0;
          return b.visitCount - a.visitCount;
        })
        .map(({ id, title, url, lastVisitTime }) => (
          <HistoryItem
            key={id}
            title={title}
            url={url}
            lastVisitTime={lastVisitTime}
            hideURL={settings.hideURL}
            hideTime={settings.hideTime}
            onClick={() => {
              if (!url) throw new Error("URL not found!");

              onClick(url);
            }}
            onItemDelete={() => {
              if (!url) throw new Error("URL not found!");

              dispatch(deleteItem(url));
            }}
            showSecondary
          />
        ))}
    </>
  );
};

const InfiniteHistoryItemsList = ({
  history,
  settings,
  onClick,
}: {
  history: RootState["history"];
  settings: ISettings;
  onClick: (url: string) => Promise<void>;
}) => {
  const dispatch = useAppDispatch();
  const { lastElemRef } = useInfiniteScroll({
    next: (prevLastVisitTime) => {
      dispatch(addHistory({ endTime: prevLastVisitTime }));
    },
  });

  const historyLength = history.items.length;

  return (
    <>
      {history.items.map(({ id, title, url, lastVisitTime }, index) => {
        if (++index === historyLength) {
          return (
            <Fragment key={id}>
              <HistoryItem
                title={title}
                url={url}
                lastVisitTime={lastVisitTime}
                hideURL={settings.hideURL}
                hideTime={settings.hideTime}
                onClick={() => {
                  if (!url) throw new Error("URL not found!");

                  onClick(url);
                }}
                onItemDelete={() => {
                  if (!url) throw new Error("URL not found!");

                  dispatch(deleteItem(url));
                }}
                showSecondary
              />
              <ListItem
                key={id}
                ref={(node: HTMLLIElement) => lastElemRef(node, lastVisitTime)}
                alignItems="center"
                sx={{ justifyContent: "center", padding: "10px 0" }}
              >
                <CircularProgress size={16} />
              </ListItem>
            </Fragment>
          );
        }

        return (
          <HistoryItem
            key={id}
            title={title}
            url={url}
            lastVisitTime={lastVisitTime}
            hideURL={settings.hideURL}
            hideTime={settings.hideTime}
            onClick={() => {
              if (!url) throw new Error("URL not found!");

              onClick(url);
            }}
            onItemDelete={() => {
              if (!url) throw new Error("URL not found!");

              dispatch(deleteItem(url));
            }}
            showSecondary
          />
        );
      })}
    </>
  );
};

export default HistoryList;
