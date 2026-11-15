import { Array as Arr, HashMap, Match, Option } from "effect";

import {
  type CatalogRow,
  catalogNodeIdentity,
  catalogRowIdentity,
} from "#contracts/assessment/catalog";
import type { ActiveAppLocaleList } from "#contracts/locale";

/**
 * The keys of the nodes a row is beneath: an exam is beneath its country, a
 * track beneath its exam and its group, and a set beneath its track and is
 * the node its sections follow.
 */
function aboveKeys(row: CatalogRow): readonly string[] {
  return Match.value(row).pipe(
    Match.discriminatorsExhaustive("kind")({
      country: () => [],
      exam: ({ countryKey }) => [`country\0${countryKey}`],
      group: () => [],
      section: () => [],
      set: ({ countryKey, examKey, setKey, trackKey }) => [
        `track\0${countryKey}\0${examKey}\0${trackKey}`,
        `section\0${countryKey}\0${examKey}\0${trackKey}\0${setKey}`,
      ],
      track: ({ countryKey, examKey, groupKey }) => [
        `exam\0${countryKey}\0${examKey}`,
        `group\0${countryKey}\0${examKey}\0${groupKey}`,
      ],
    })
  );
}

/** The key under which the nodes beneath a row gather, or none for a set. */
function ownKey(row: CatalogRow): Option.Option<string> {
  return Match.value(row).pipe(
    Match.discriminatorsExhaustive("kind")({
      country: ({ countryKey }) => Option.some(`country\0${countryKey}`),
      exam: ({ countryKey, examKey }) =>
        Option.some(`exam\0${countryKey}\0${examKey}`),
      group: ({ countryKey, examKey, groupKey }) =>
        Option.some(`group\0${countryKey}\0${examKey}\0${groupKey}`),
      section: ({ countryKey, examKey, setKey, trackKey }) =>
        Option.some(
          `section\0${countryKey}\0${examKey}\0${trackKey}\0${setKey}`
        ),
      set: () => Option.none(),
      track: ({ countryKey, examKey, trackKey }) =>
        Option.some(`track\0${countryKey}\0${examKey}\0${trackKey}`),
    })
  );
}

/** Gathers, by node, the locales of every row beneath it. */
function localesBeneath(rows: readonly CatalogRow[]) {
  return Arr.reduce(
    rows,
    HashMap.empty<string, readonly CatalogRow["appLocales"][]>(),
    (beneath, row) =>
      Arr.reduce(aboveKeys(row), beneath, (gathered, key) =>
        HashMap.modifyAt(gathered, key, (locales) =>
          Option.some([...Option.getOrElse(locales, () => []), row.appLocales])
        )
      )
  );
}

/**
 * Finds the first catalog row that is not served where its node is: each row
 * is one of its node's locales, every one of them active, the node has a row
 * in each of them, and a node is served exactly where the nodes beneath it
 * are, so no locale shows a node without a set. Returns that row's identity.
 */
export function catalogLocaleBreach(
  rows: readonly CatalogRow[],
  activeAppLocales: ActiveAppLocaleList
) {
  const present = HashMap.fromIterable(
    Arr.map(rows, (row) => [catalogRowIdentity(row), row] as const)
  );
  const beneath = localesBeneath(rows);
  /** Checks one row against its node's locales and the nodes beneath it. */
  const isServed = (row: CatalogRow) => {
    const served = Arr.join(row.appLocales, ",");
    const expected = Option.map(ownKey(row), (key) =>
      Arr.join(
        Arr.filter(activeAppLocales, (appLocale) =>
          Arr.some(
            Option.getOrElse(HashMap.get(beneath, key), () => []),
            (locales) => Arr.contains(locales, appLocale)
          )
        ),
        ","
      )
    );
    return (
      Arr.contains(row.appLocales, row.appLocale) &&
      Arr.every(row.appLocales, (appLocale) =>
        Arr.contains(activeAppLocales, appLocale)
      ) &&
      Arr.every(row.appLocales, (appLocale) =>
        Option.exists(
          HashMap.get(present, `${appLocale}\0${catalogNodeIdentity(row)}`),
          ({ appLocales }) => Arr.join(appLocales, ",") === served
        )
      ) &&
      Option.getOrElse(expected, () => served) === served
    );
  };
  return Option.map(
    Arr.findFirst(rows, (row) => !isServed(row)),
    catalogRowIdentity
  );
}
