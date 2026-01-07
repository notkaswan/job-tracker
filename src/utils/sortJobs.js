import { STATUS_PRIORITY } from "../constants/status";

export const sortJobs = (jobs) => {
  return [...jobs].sort((a, b) => {
    const statusDiff = STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status];

    if (statusDiff !== 0) {
      return statusDiff;
    }

    const timeA = a.createdAt?.seconds || 0;
    const timeB = b.createdAt?.seconds || 0;

    return timeB - timeA;
  });
};
