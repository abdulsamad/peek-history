import { useState, useEffect } from "react";

import { settings } from "../common/redux/settings/defaults";

const useStorageConfig = () => {
  const [config, setConfig] = useState(settings);

  // Load initial data
  useEffect(() => {
    (async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const syncVariables = (await chrome.storage.sync.get(null)) as any;
      setConfig(syncVariables);
    })();
  }, []);

  return config;
};

export default useStorageConfig;
