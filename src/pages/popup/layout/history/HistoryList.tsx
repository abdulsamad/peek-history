import React, { Fragment, useCallback } from "react";
import { CircularProgress, List, ListItem } from "@mui/material";
import { useSelector } from "react-redux";

import useInfiniteScroll from "@src/hooks/useInfiniteScroll";
import { ISettings } from "@src/commons/redux/settings/defaults";
import { IHistoryItem } from "../../redux/history/history-slice";
import HistoryItem from "../utils/ListItem";
import { deleteItem, addHistory } from "../../redux/history/thunks";
import { RootState, useAppDispatch } from "../../redux/store";
import Preloader from "./Preloader";
import NotFound from "../utils/NotFound";
import { onURLClick } from "../utils";

const HistoryList = ({ settings }: { settings: ISettings }) => {
  const history = useSelector((state: RootState) => state.history);
  const UI = useSelector((state: RootState) => state.ui);

  const dispatch = useAppDispatch();

  const historyItemBlock = useCallback(
    ({
      id,
      title,
      url,
      lastVisitTime,
    }: Omit<IHistoryItem, "typedCount" | "visitCount">) => (
      <HistoryItem
        key={id}
        title={title}
        url={url}
        lastVisitTime={lastVisitTime}
        hideURL={settings.hideURL}
        hideTime={settings.hideTime}
        onClick={() => {
          if (!url) throw new Error("URL not found!");

          onURLClick(url, settings.openURL);
        }}
        onItemDelete={() => {
          if (!url) throw new Error("URL not found!");

          dispatch(deleteItem(url));
        }}
        showSecondary
      />
    ),
    [settings]
  );

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
          historyItemBlock={historyItemBlock}
        />
      ) : (
        <InfiniteHistoryItemsList
          history={history}
          settings={settings}
          historyItemBlock={historyItemBlock}
        />
      )}
    </List>
  );
};

/**
 * History items list with sorting and normal
 */
const HistoryItemsList = ({
  history,
  settings,
  historyItemBlock,
}: {
  history: RootState["history"];
  settings: ISettings;
  historyItemBlock: ({
    id,
    title,
    url,
    lastVisitTime,
  }: Omit<IHistoryItem, "typedCount" | "visitCount">) => JSX.Element;
}) => (
  <>
    {settings.sort === "most-visit"
      ? // Sort By Most Visits
        history.items
          .slice() // Slicing before sorting before array is frozen in strict mode
          .sort((a, b) => {
            if (!b.visitCount || !a.visitCount) return 0;
            return b.visitCount - a.visitCount;
          })
          .map(historyItemBlock)
      : // Sort by Last Visit
        history.items.map(historyItemBlock)}
  </>
);

/**
 * Infinite scroll for history items list
 */
const InfiniteHistoryItemsList = ({
  history,
  historyItemBlock,
}: {
  history: RootState["history"];
  settings: ISettings;
  historyItemBlock: ({
    id,
    title,
    url,
    lastVisitTime,
  }: Omit<IHistoryItem, "typedCount" | "visitCount">) => JSX.Element;
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
              <>{historyItemBlock({ id, title, url, lastVisitTime })}</>
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

        return historyItemBlock({ id, title, url, lastVisitTime });
      })}
    </>
  );
};

export default HistoryList;
