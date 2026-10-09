import {
  Array as Arr,
  type BigDecimal,
  MutableHashMap,
  MutableHashSet,
  MutableList,
  Option,
} from "effect";

import type {
  SceneAxis,
  SceneCoordinate,
  ScenePath,
} from "#contracts/math/coordinate";
import type { PlaneMathObject } from "#contracts/math/plane";
import { unresolvedProximityIndexes } from "#contracts/math/proximity";
import { numberRatio } from "#contracts/math/rational";
import { radialGeometryPath } from "#contracts/math/scene";
import { encodeJsonText } from "#contracts/text/json";

/** Keeps one authored issue path for each exact path value. */
function uniquePaths(paths: readonly ScenePath[]) {
  const byText = MutableHashMap.empty<string, ScenePath>();
  for (const path of paths) {
    MutableHashMap.set(byText, encodeJsonText(path), path);
  }
  return Arr.fromIterable(MutableHashMap.values(byText));
}

/** Finds reportable scene coordinates that collapse on the same axis. */
export function coordinateCollisionPaths(
  coordinates: readonly SceneCoordinate[],
  threshold: BigDecimal.BigDecimal
) {
  const axes: readonly SceneAxis[] = ["x", "y", "z"];
  return uniquePaths(
    Arr.flatMap(axes, (axis) => {
      const entries = Arr.filter(coordinates, (entry) => entry.axis === axis);
      const unresolved = unresolvedProximityIndexes(entries, threshold);
      return Arr.flatMap(entries, (entry, index) =>
        entry.reportable && MutableHashSet.has(unresolved, index)
          ? [entry.path]
          : []
      );
    })
  );
}

/** One circle or arc of a concentric group, with its authored index and radius. */
interface RadiusEntry {
  readonly index: number;
  readonly kind: "arc" | "circle";
  readonly value: ReturnType<typeof numberRatio>;
}

/** Finds non-zero radius deltas between concentric circles or arcs. */
export function concentricRadiusCollisionPaths(
  objects: readonly PlaneMathObject[],
  threshold: BigDecimal.BigDecimal
) {
  const groups = MutableHashMap.empty<
    string,
    MutableList.MutableList<RadiusEntry>
  >();
  for (const [index, object] of objects.entries()) {
    if (object.kind !== "arc" && object.kind !== "circle") {
      continue;
    }
    const key = `${object.center.x}:${object.center.y}`;
    const group = Option.getOrElse(MutableHashMap.get(groups, key), () => {
      const created = MutableList.make<RadiusEntry>();
      MutableHashMap.set(groups, key, created);
      return created;
    });
    MutableList.append(group, {
      index,
      kind: object.kind,
      value: numberRatio(object.radius),
    });
  }
  const paths = MutableList.make<ScenePath>();
  for (const group of MutableHashMap.values(groups)) {
    const entries = MutableList.toArray(group);
    const unresolved = unresolvedProximityIndexes(entries, threshold);
    for (const [entryIndex, entry] of entries.entries()) {
      if (MutableHashSet.has(unresolved, entryIndex)) {
        MutableList.append(paths, radialGeometryPath(entry.kind, entry.index));
      }
    }
  }
  return MutableList.toArray(paths);
}
