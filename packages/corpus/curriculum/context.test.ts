import { describe, expect, it } from "@effect/vitest";
import {
  CurriculumRouteDraftSchema,
  CurriculumRouteSchema,
} from "@nakafa/aksara-contracts/program/curriculum";
import { Effect, Schema } from "effect";
import {
  addMaterialContext,
  CurriculumContextError,
  CurriculumMaterialCardError,
} from "#corpus/curriculum/context";

const subject = Schema.decodeSync(CurriculumRouteSchema)({
  appLocale: "en",
  iconKey: "mathematics",
  kind: "curriculum-context",
  level: "subject",
  nodeKey: "class-10-mathematics",
  order: 10,
  parentPath: "curriculum/merdeka/class-10",
  programKey: "merdeka",
  publicPath: "curriculum/merdeka/class-10/mathematics",
  sitemap: true,
  sourcePath: "packages/corpus/curriculum/merdeka",
  title: "Mathematics",
});
const group = Schema.decodeSync(CurriculumRouteSchema)({
  ...subject,
  level: "topic",
  materialCardDescription: "Solve equations and read their graphs.",
  materialCardTitle: "Algebra",
  nodeKey: "class-10-mathematics-algebra",
  parentPath: subject.publicPath,
  publicPath: `${subject.publicPath}/algebra`,
  sitemap: false,
  title: "Algebra",
});

describe("curriculum material context", () => {
  it.effect("binds one material leaf to its nearest subject-owned group", () =>
    Effect.gen(function* () {
      const leaf = yield* Schema.decodeEffect(CurriculumRouteSchema)({
        ...group,
        canonicalPath: "subjects/mathematics/matrix",
        materialContextNodeKey: group.nodeKey,
        materialContextParentPath: subject.publicPath,
        materialContextPublicPath: group.publicPath,
        materialKey: "lesson.mathematics.matrix",
        nodeKey: "class-10-mathematics-matrix",
        parentPath: group.publicPath,
        publicPath: `${group.publicPath}/matrix`,
        title: "Matrices",
      });
      const unresolved = yield* Schema.decodeEffect(CurriculumRouteDraftSchema)(
        {
          ...leaf,
          materialContextNodeKey: undefined,
          materialContextParentPath: undefined,
          materialContextPublicPath: undefined,
        }
      );

      expect(
        yield* addMaterialContext([subject, group, unresolved])
      ).toContainEqual(leaf);
    })
  );

  it.effect("keeps structure routes unchanged", () =>
    Effect.gen(function* () {
      expect(yield* addMaterialContext([subject])).toEqual([subject]);
    })
  );

  it.effect(
    "rejects material leaves without a complete subject or course ancestry",
    () =>
      Effect.gen(function* () {
        const leaf = yield* Schema.decodeEffect(CurriculumRouteDraftSchema)({
          ...group,
          canonicalPath: "subjects/mathematics/matrix",
          materialKey: "lesson.mathematics.matrix",
          nodeKey: "class-10-mathematics-matrix",
          title: "Matrices",
        });
        const error = yield* addMaterialContext([group, leaf]).pipe(
          Effect.flip
        );

        expect(error).toBeInstanceOf(CurriculumContextError);
        expect(error).toMatchObject({ nodeKey: leaf.nodeKey });
      })
  );

  it.effect(
    "rejects a material leaf whose card group declares no card copy",
    () =>
      Effect.gen(function* () {
        const bare = yield* Schema.decodeEffect(CurriculumRouteSchema)({
          ...subject,
          level: "topic",
          nodeKey: "class-10-mathematics-geometry",
          parentPath: subject.publicPath,
          publicPath: `${subject.publicPath}/geometry`,
          sitemap: false,
          title: "Geometry",
        });
        const leaf = yield* Schema.decodeEffect(CurriculumRouteDraftSchema)({
          ...bare,
          canonicalPath: "subjects/mathematics/matrix",
          materialKey: "lesson.mathematics.matrix",
          nodeKey: "class-10-mathematics-matrix",
          parentPath: bare.publicPath,
          publicPath: `${bare.publicPath}/matrix`,
          title: "Matrices",
        });
        const error = yield* addMaterialContext([subject, bare, leaf]).pipe(
          Effect.flip
        );

        expect(error).toBeInstanceOf(CurriculumMaterialCardError);
        expect(error).toMatchObject({
          nodeKey: bare.nodeKey,
          programKey: "merdeka",
        });
      })
  );

  it.effect("rejects a material leaf without any parent route", () =>
    Effect.gen(function* () {
      const leaf = yield* Schema.decodeEffect(CurriculumRouteDraftSchema)({
        ...group,
        canonicalPath: "subjects/mathematics/matrix",
        level: "track",
        materialKey: "lesson.mathematics.matrix",
        nodeKey: "merdeka:root",
        parentPath: undefined,
        publicPath: "curriculum/merdeka",
        title: "Kurikulum Merdeka",
      });
      const error = yield* addMaterialContext([leaf]).pipe(Effect.flip);

      expect(error).toMatchObject({ nodeKey: leaf.nodeKey });
    })
  );
});
