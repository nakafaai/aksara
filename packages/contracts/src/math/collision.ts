import type { BigDecimal } from "effect";

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
  return [
    ...new Map(paths.map((path) => [JSON.stringify(path), path])).values(),
  ];
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
        entry.reportable && unresolved.has(index) ? [entry.path] : []
      );
    })
  );
}

/** Finds non-zero radius deltas between concentric circles or arcs. */
export function concentricRadiusCollisionPaths(
  objects: readonly PlaneMathObject[],
  threshold: BigDecimal.BigDecimal
) {
  const groups = new Map<
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
    const group = groups.get(key) ?? [];
    group.push({ index, kind: object.kind, value: numberRatio(object.radius) });
    groups.set(key, group);
  }
  const paths: ScenePath[] = [];
  for (const group of groups.values()) {
    const unresolved = unresolvedProximityIndexes(group, threshold);
    for (const [entryIndex, entry] of group.entries()) {
      if (unresolved.has(entryIndex)) {
        paths.push(radialGeometryPath(entry.kind, entry.index));
      }
    }
  }
  return paths;
}
