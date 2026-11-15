import { Array as Arr, Predicate, Record as Rec, Schema } from "effect";

import {
  MathAppearanceSchema,
  MathVisualKeySchema,
} from "#contracts/math/base";
import { MathVisualSchema, mathVisualLabelKeys } from "#contracts/math/visual";
import { NoPropsSchema } from "#contracts/visual/base/layout";
import { cardFields, type RichSlot } from "#contracts/visual/card";
import { type AnswerReader, figure, markup } from "#contracts/visual/entry";

/** A scene and the keys of the rich labels it anchors, as the check reads them. */
const LabeledSceneSchema = Schema.Struct({
  labels: Schema.optionalKey(Schema.Record(Schema.String, Schema.Unknown)),
  scene: MathVisualSchema,
});
type LabeledScene = typeof LabeledSceneSchema.Type;

/** The appearance of one scene object, which says whether it draws the answer. */
const AppearanceSchema = Schema.Struct({ appearance: MathAppearanceSchema });
type Appearance = typeof AppearanceSchema.Type;

/**
 * Checks that the rich labels match the anchors of the scene, key for key. A
 * scene without anchors may leave its labels out.
 */
function hasSceneLabels({ labels = {}, scene }: LabeledScene) {
  const anchors = mathVisualLabelKeys(scene);
  const keys = Rec.keys(labels);
  return (
    anchors.length === keys.length &&
    Arr.every(anchors, (anchor) => Arr.contains(keys, anchor))
  );
}

/** Props of `MathVisual`: a plane or space scene and the rich labels it anchors. */
function mathVisual<E>(rich: RichSlot<E>) {
  return Schema.Struct({
    ...cardFields(rich),
    labels: Schema.optionalKey(Schema.Record(MathVisualKeySchema, rich)),
    scene: MathVisualSchema,
  }).check(
    Schema.makeFilter(hasSceneLabels, {
      message: "Expected one rich label for each label anchor of the scene.",
    })
  );
}

/**
 * Reads the answer state of a scene: every object drawn in the `answer`
 * appearance, and the readouts, which compute values from the scene.
 */
const sceneAnswer: AnswerReader = (props) => {
  const scene = Predicate.hasProperty(props, "scene") ? props.scene : undefined;
  if (!Schema.is(MathVisualSchema)(scene)) {
    return [];
  }
  const objects: readonly Appearance[] = scene.objects;
  const answers = Arr.flatMap(objects, (object, index) =>
    object.appearance === "answer" ? [`scene.objects.${index}`] : []
  );
  const readouts =
    scene.space === "plane" && scene.readouts !== undefined
      ? ["scene.readouts"]
      : [];
  return [...answers, ...readouts];
};

/**
 * Props of `BlockMath` and `InlineMath`: one formula in LaTeX. A lesson may
 * write a long formula over several lines, so the source keeps its spacing;
 * an assessment stores it trimmed.
 */
const FormulaSchema = Schema.Struct({
  math: Schema.String.check(
    Schema.makeFilter((math) => math.trim().length > 0, {
      message: "Expected a formula.",
    })
  ),
});

/**
 * The mathematical components. A scene marks its answer with the `answer`
 * appearance and computes values in its readouts, so both are answer state.
 * A formula and a container of formulas are markup.
 */
export function mathVisuals<E>(rich: RichSlot<E>) {
  return {
    BlockMath: markup(FormulaSchema),
    InlineMath: markup(FormulaSchema),
    MathContainer: markup(NoPropsSchema),
    MathVisual: figure(mathVisual(rich), sceneAnswer),
  };
}
