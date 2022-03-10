
import type { SailwaveSeries } from '../../../sail-results/esm/import/sailwave-blw';

/**
 * A series imported from SailWave.
 */
export class ImportedSeries {
  blw: SailwaveSeries;
  isActive = false;

  constructor(blw: SailwaveSeries) {
    this.blw = blw;
  }

  get competitors() {
    return Object.entries(this.blw.competitors);
  }

  get races() {
    return Object.entries(this.blw.races);
  }
}
