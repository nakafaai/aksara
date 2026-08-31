import { GEOMETRY_TOLERANCE, type SpacePoint } from "#contracts/math/base";

/** Checks a space polygon is planar and has non-zero area. */
export function hasCoplanarArea(
  vertices: readonly [SpacePoint, SpacePoint, SpacePoint, ...SpacePoint[]]
) {
  const offsets = normalizedSpaceOffsets(vertices);
  let strongestNormal: SpacePoint | undefined;
  let strongestLength = 0;
  const vectors = offsets.slice(1);
  for (const [leftIndex, left] of vectors.entries()) {
    for (const right of vectors.slice(leftIndex + 1)) {
      const candidate = cross(left, right);
      const candidateLength = length(candidate);
      if (candidateLength > strongestLength) {
        strongestLength = candidateLength;
        strongestNormal = candidate;
      }
    }
  }
  if (!(strongestNormal && strongestLength > GEOMETRY_TOLERANCE)) {
    return false;
  }
  const unitNormal = divide(strongestNormal, strongestLength);
  return offsets.every(
    (offset) =>
      Math.abs(dot(unitNormal, offset)) <=
      GEOMETRY_TOLERANCE * Math.max(1, length(offset))
  );
}

/** Translates before scaling so coplanarity is independent of scene location. */
function normalizedSpaceOffsets(
  vertices: readonly [SpacePoint, SpacePoint, SpacePoint, ...SpacePoint[]]
) {
  const [origin] = vertices;
  let offsets = vertices.map(({ x, y, z }) => ({
    x: x - origin.x,
    y: y - origin.y,
    z: z - origin.z,
  }));
  if (
    offsets.some(
      ({ x, y, z }) =>
        !(Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(z))
    )
  ) {
    let sourceScale = 1;
    for (const { x, y, z } of vertices) {
      sourceScale = Math.max(
        sourceScale,
        Math.abs(x),
        Math.abs(y),
        Math.abs(z)
      );
    }
    offsets = vertices.map(({ x, y, z }) => ({
      x: x / sourceScale - origin.x / sourceScale,
      y: y / sourceScale - origin.y / sourceScale,
      z: z / sourceScale - origin.z / sourceScale,
    }));
  }
  let extent = 0;
  for (const { x, y, z } of offsets) {
    extent = Math.max(extent, Math.abs(x), Math.abs(y), Math.abs(z));
  }
  const divisor = Math.max(extent, Number.MIN_VALUE);
  return offsets.map((offset) => divide(offset, divisor));
}

/** Returns the cross product of two space vectors. */
function cross(left: SpacePoint, right: SpacePoint): SpacePoint {
  return {
    x: left.y * right.z - left.z * right.y,
    y: left.z * right.x - left.x * right.z,
    z: left.x * right.y - left.y * right.x,
  };
}

/** Returns the dot product of two space vectors. */
function dot(left: SpacePoint, right: SpacePoint) {
  return left.x * right.x + left.y * right.y + left.z * right.z;
}

/** Returns a stable Euclidean vector length. */
function length(value: SpacePoint) {
  return Math.hypot(value.x, value.y, value.z);
}

/** Divides one space vector by a positive finite scale. */
function divide(value: SpacePoint, divisor: number): SpacePoint {
  return {
    x: value.x / divisor,
    y: value.y / divisor,
    z: value.z / divisor,
  };
}
