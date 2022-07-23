import { useState, useEffect, useLayoutEffect } from "react";

import { settings } from "../pages/options/redux/settings/defaults";

const useStorageConfig = () => {
  const [config, setConfig] = useState(settings);

  // Load initial data
  useLayoutEffect(() => {
    (async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const syncVariables = (await chrome.storage.sync.get(null)) as any;
      setConfig(syncVariables);
    })();
  }, []);

  // Listen to changes
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onChange = (data: any) => {
      for (const key in data) {
        setConfig({
          ...config,
          [key]: data[key].newValue,
        });
      }
    };

    chrome.storage.onChanged.addListener(onChange);
    return () => chrome.storage.onChanged.removeListener(onChange);
  }, []);

  return config;
};

export default useStorageConfig;
