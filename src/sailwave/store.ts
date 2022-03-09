// import { ref } from 'vue';

import { importBlw } from '../../../sail-results/esm/import/sailwave-blw';

import type { SailwaveSeries } from '../../../sail-results/esm/import/sailwave-blw';

/**
 * Import a Sailwave .blw file as an object.
 *
 * @param blwText The text content of a Sailwave .blw file.
 * @returns
 */
export const importSeriesFromBlw = (blwText: string) => {
  const blw = importBlw(blwText);
  return blw;
};
