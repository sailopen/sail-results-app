import type { SailwaveSeries } from '../../../sail-results/esm/import/sailwave-blw';

const typeNames = {
  class: 'Class',
  rating: 'Class rating',
  pursuit: 'Pursuit',
  personalRating: 'Personal rating',
  personalPursuit: 'Personal pursuit',
};

// Store the used race types.
const raceTypes: string[] = [];

type Series = {
  title: string;
};

const series: Series[] = [];

type Competitor = {
  seriesIndex: number;
  class?: string;
  boatName?: string;
  sailNumber?: string;
  helmName?: string;
  crewName?: string;
  // The PN rating used for this event.
  rating?: number;
  fleet?: string;
};

const competitors: Competitor[] = [];

type Race = {
  seriesIndex: number;
  name?: string;
  date?: string;
  time?: string;
  sort?: number;
  isSailed?: boolean;
};

const races: Race[] = [];

type Start = {
  raceIndex: number;
  date?: string;
  time?: string;
  startName?: string;
  fleetName?: string;
  raceTypeIndex?: number;
};

const starts: Start[] = [];

type Result = [
  startIndex: number,
  competitorIndex: number,
  place: number | string | null,
  rating?: number,
  elapsed?: number,
  laps?: number
];

const results: Result[] = [];

const resultStore = {
  raceTypes,
  series,
  competitors,
  races,
  starts,
  results,
};

export const addSeriesToCache = (imported: SailwaveSeries) => {
  // Create and add the series entry.
  const series = {
    title: imported.globals.serevent,
    seriesId: imported.globals.sereventeid,
  };

  const seriesIndex = resultStore.series.length;
  resultStore.series.push(series);

  // Create and add competitor entries with a temporary map.
  const competitorMap: Record<string, number> = {};
  Object.values(imported.competitors).forEach((value) => {
    console.log(value);
    const rating = parseInt(value.comprating);

    const competitor: Competitor = {
      seriesIndex,
      class: value.compclass,
      fleet: value.compfleet,
      boatName: value.compboat,
      sailNumber: value.compsailno,
      helmName: value.comphelmname,
      crewName: value.compcrewname,
      rating: Number.isSafeInteger(rating) ? rating : undefined,
    };
    competitorMap['a'] = resultStore.competitors.length;
    resultStore.competitors.push(competitor);
  });

  // Create and add races with a temporary map.
  const raceMap: Record<string, number> = {};
  Object.values(imported.races).forEach((value) => {
    console.log(value);

    const race: Race = {
      seriesIndex,
      // These all need casting to strings because racestart is an object.
      name: <string>value.racename,
      date: <string>value.racedate,
      time: <string>value.racetime,
      sort: parseInt(<string>value.racerank),
      isSailed: value.racesailed === '1' ? true : undefined,
    };
    /*
    type Start = {
      raceIndex: number;
      date?: string;
      time?: string;
      startName?: string;
      fleetName?: string;
      raceTypeIndex?: number;
    };
    */
    raceMap['a'] = resultStore.races.length;
    resultStore.races.push(race);
  });

  console.log('Here is the store', resultStore);
  return series;
};

export const getResults = () => {
  return resultStore;
};
