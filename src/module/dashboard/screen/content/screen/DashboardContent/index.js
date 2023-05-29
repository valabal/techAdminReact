import DashboardContent from "./DashboardContent";

import { getContentData } from "./DashboardContentApi";

export const DashboardWrapper = () => {
  return DashboardContent({ getContentData });
};
