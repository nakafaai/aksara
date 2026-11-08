import {
  Array as Arr,
  HashSet,
  Option,
  Order,
  Record as Rec,
  Result,
  type Schema,
} from "effect";

import type { FormulaScope } from "#contracts/math/formula/compile";
import type { FormulaParameter } from "#contracts/math/formula/field";
import {
  formulaNames,
  readFormula,
  readRelation,
} from "#contracts/math/formula/parse";
import type { FormulaGeometry } from "#contracts/math/formula/plane";
import type { SampleBox, SamplePoint } from "#contracts/math/formula/sample";
import type { PlaneMathObject } from "#contracts/math/plane";
import type { SpaceMathObject } from "#contracts/math/space";

/** One authored formula of an object: where it stands and what it may read. */
export interface FormulaField {
  readonly path: readonly (string | number)[];
  readonly relation: boolean;
  readonly text: string;
  readonly variables: readonly string[];
}

/** Builds one expression field. */
function expression(
  path: readonly (string | number)[],
  text: string,
  variables: readonly string[]
): FormulaField {
  return { path, relation: false, text, variables };
}

/**
 * Lists every formula a plane object holds and the variables each may read:
 * its input axis for a function, t for a parametric curve, theta for a polar
 * curve, and x and y for an equation or a region.
 */
export function planeFormulaFields(
  object: PlaneMathObject
): readonly FormulaField[] {
  if (object.kind === "function") {
    return [expression(["formula"], object.formula, [object.inputAxis ?? "x"])];
  }
  if (object.kind === "parametric") {
    return [
      expression(["x"], object.x, ["t"]),
      expression(["y"], object.y, ["t"]),
    ];
  }
  if (object.kind === "polar") {
    return [expression(["radius"], object.radius, ["theta"])];
  }
  if (object.kind === "implicit") {
    return [
      {
        path: ["equation"],
        relation: true,
        text: object.equation,
        variables: ["x", "y"],
      },
    ];
  }
  if (object.kind === "region") {
    return Arr.map(object.inequalities, (text, index) => ({
      path: ["inequalities", index],
      relation: true,
      text,
      variables: ["x", "y"],
    }));
  }
  return [];
}

/**
 * Lists every formula a space object holds and the variables each may read:
 * t for a curve, x and y for a surface z = f(x, y), u and v for a parametric
 * surface, and the axis variable for a solid of revolution.
 */
export function spaceFormulaFields(
  object: SpaceMathObject
): readonly FormulaField[] {
  if (object.kind === "parametric" || object.kind === "surface") {
    const variables = object.kind === "parametric" ? ["t"] : ["u", "v"];
    return Arr.map(["x", "y", "z"] as const, (axis) =>
      expression([axis], object[axis], variables)
    );
  }
  if (object.kind === "function") {
    return [expression(["formula"], object.formula, ["x", "y"])];
  }
  if (object.kind === "revolution") {
    return [expression(["formula"], object.formula, [object.axis])];
  }
  return [];
}

/** Every name one formula reads, or none when it does not parse at all. */
function namesOf(field: FormulaField) {
  if (field.relation) {
    return Result.match(readRelation(field.text), {
      onFailure: () => HashSet.empty<string>(),
      onSuccess: ({ left, right }) =>
        HashSet.union(formulaNames(left), formulaNames(right)),
    });
  }
  return Result.match(readFormula(field.text), {
    onFailure: () => HashSet.empty<string>(),
    onSuccess: formulaNames,
  });
}

/**
 * Reports every formula that reads a name its object does not offer, and every
 * slider whose name repeats an earlier one.
 */
export function formulaScopeIssues<Object>(
  objects: readonly Object[],
  fields: (object: Object) => readonly FormulaField[],
  parameters: readonly FormulaParameter[]
): readonly Schema.FilterIssue[] {
  const names = Arr.map(parameters, ({ name }) => name);
  const declared = Arr.dedupe(names);
  const repeated = Arr.flatMap(
    parameters,
    ({ name }, index): Schema.FilterIssue[] =>
      Arr.contains(Arr.take(names, index), name)
        ? [
            {
              issue: "Expected a unique slider name.",
              path: ["parameters", index, "name"],
            },
          ]
        : []
  );
  const unknown = Arr.flatMap(objects, (object, index) =>
    Arr.flatMap(fields(object), (field): Schema.FilterIssue[] => {
      const allowed = HashSet.fromIterable([...field.variables, ...declared]);
      const stray = Arr.sort(
        Arr.fromIterable(HashSet.difference(namesOf(field), allowed)),
        Order.String
      );
      return Arr.isReadonlyArrayEmpty(stray)
        ? []
        : [
            {
              issue: `Expected only ${Arr.join([...field.variables, ...declared], ", ")} in this formula, not ${Arr.join(stray, ", ")}.`,
              path: ["objects", index, ...field.path],
            },
          ];
    })
  );
  return [...repeated, ...unknown];
}

/** Each slider's starting value by its name, the scope a scene first draws with. */
export function parameterScope(
  parameters: readonly FormulaParameter[]
): FormulaScope {
  return Rec.fromEntries(
    Arr.map(parameters, ({ name, value }) => [name, value])
  );
}

/** Whether a point lies inside a box; a plane box ignores z. */
function inside(box: SampleBox, point: SamplePoint) {
  const within = (
    value: number,
    range: { readonly max: number; readonly min: number }
  ) => value >= range.min && value <= range.max;
  return (
    within(point.x, box.x) &&
    within(point.y, box.y) &&
    (box.z === undefined || within(point.z, box.z))
  );
}

/** Whether sampled geometry shows anything inside its frame. */
export function geometryVisible(geometry: FormulaGeometry, box: SampleBox) {
  if (geometry.kind === "curves") {
    return Arr.some(geometry.branches, Arr.isReadonlyArrayNonEmpty);
  }
  if (geometry.kind === "region") {
    return Arr.isReadonlyArrayNonEmpty(geometry.fill);
  }
  if (geometry.kind === "grid") {
    return Arr.some(geometry.grid.points, (point) =>
      Option.exists(point, (each) => inside(box, each))
    );
  }
  return Arr.every(geometry.faces, (face) =>
    Arr.every(face, (corner) => inside(box, corner))
  );
}
