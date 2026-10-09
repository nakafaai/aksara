import {
  Array as Arr,
  type BigDecimal,
  MutableHashMap,
  MutableHashSet,
  Record as Rec,
} from "effect";

import { type SceneAxis, SceneAxisSchema } from "#contracts/math/base";
import type { SceneCoordinate, ScenePath } from "#contracts/math/coordinate";
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
  const axes: readonly SceneAxis[] = SceneAxisSchema.literals;
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

/** Finds non-zero radius deltas between concentric circles or arcs. */
export function concentricRadiusCollisionPaths(
  objects: readonly PlaneMathObject[],
  threshold: BigDecimal.BigDecimal
) {
  const radii = Arr.flatMap(objects, (object, index) =>
    object.kind === "arc" || object.kind === "circle"
      ? [
          {
            center: `${object.center.x}:${object.center.y}`,
            index,
            kind: object.kind,
            value: numberRatio(object.radius),
          },
        ]
      : []
  );
  // A center text always holds a colon, so the groups keep first-seen order.
  const groups = Rec.values(Arr.groupBy(radii, (radius) => radius.center));
  return Arr.flatMap(groups, (group) => {
    const unresolved = unresolvedProximityIndexes(group, threshold);
    return Arr.flatMap(group, (entry, entryIndex) =>
      MutableHashSet.has(unresolved, entryIndex)
        ? [radialGeometryPath(entry.kind, entry.index)]
        : []
    );
  });
}
