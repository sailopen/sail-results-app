
import { importBlw, SailwaveSeries } from '../../../sail-results/esm/import/sailwave-blw';

import { ImportedSeries } from './ImportedSeries';

type SeriesId = number;

/*
const typeNames = {
  class: 'Class',
  rating: 'Class rating',
  pursuit: 'Pursuit',
  personalRating: 'Personal rating',
  personalPursuit: 'Personal pursuit',
};
*/

const seriesStore: ImportedSeries[] = [];

/**
 * Import a Sailwave .blw file as an object.
 *
 * @param blwText The text content of a Sailwave .blw file.
 * @returns The local id of the series.
 */
export const importSeriesFromBlw = (blwText: string): SailwaveSeries => {
  return importBlw(blwText);
};

/**
 * Import a Sailwave .blw file as an object.
 *
 * @param blwText The text content of a Sailwave .blw file.
 * @returns The local id of the series.
 */
export const addSeries = (series: SailwaveSeries): SeriesId => {
  seriesStore.push(new ImportedSeries(series));
  return seriesStore.length - 1;
};

export const getSeries = (id: SeriesId): ImportedSeries => {
  return seriesStore[id];
}
