import {
  Array as Arr,
  type BigDecimal,
  MutableHashMap,
  MutableHashSet,
  Option,
  Schema,
} from "effect";

const encodeJson = Schema.encodeSync(Schema.fromJsonString(Schema.Unknown));

import type {
  SceneAxis,
  SceneCoordinate,
  ScenePath,
} from "#contracts/math/coordinate";
import type { PlaneMathObject } from "#contracts/math/plane";
import { unresolvedProximityIndexes } from "#contracts/math/proximity";
import { numberRatio } from "#contracts/math/rational";
import { radialGeometryPath } from "#contracts/math/scene";

/** Keeps one authored issue path for each exact path value. */
function uniquePaths(paths: readonly ScenePath[]) {
  const byText = MutableHashMap.empty<string, ScenePath>();
  for (const path of paths) {
    MutableHashMap.set(byText, encodeJson(path), path);
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
    axes.flatMap((axis) => {
      const entries = coordinates.filter((entry) => entry.axis === axis);
      const unresolved = unresolvedProximityIndexes(entries, threshold);
      return entries.flatMap((entry, index) =>
        entry.reportable && MutableHashSet.has(unresolved, index)
          ? [entry.path]
          : []
      );
    })
  );
}

/** Finds non-zero radius deltas between concentric circles or arcs. */
export function concentricRadiusCollisionPaths(
  objects: readonly PlaneMathObject[],
  threshold: BigDecimal.BigDecimal
) {
  const groups = MutableHashMap.empty<
    string,
    Array<{
      readonly index: number;
      readonly kind: "arc" | "circle";
      readonly value: ReturnType<typeof numberRatio>;
    }>
  >();
  for (const [index, object] of objects.entries()) {
    if (object.kind !== "arc" && object.kind !== "circle") {
      continue;
    }
    const key = `${object.center.x}:${object.center.y}`;
    const group = Option.getOrUndefined(MutableHashMap.get(groups, key)) ?? [];
    group.push({ index, kind: object.kind, value: numberRatio(object.radius) });
    MutableHashMap.set(groups, key, group);
  }
  const paths: ScenePath[] = [];
  for (const group of MutableHashMap.values(groups)) {
    const unresolved = unresolvedProximityIndexes(group, threshold);
    for (const [entryIndex, entry] of group.entries()) {
      if (MutableHashSet.has(unresolved, entryIndex)) {
        paths.push(radialGeometryPath(entry.kind, entry.index));
      }
    }
  }
  return paths;
}
