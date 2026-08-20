import {
  CurriculumRouteDraftSchema,
  CurriculumRouteSchema,
} from "@nakafa/aksara-contracts/program/curriculum";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Schema } from "effect";
import {
  addMaterialContext,
  CurriculumContextError,
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
  nodeKey: "class-10-mathematics-algebra",
  parentPath: subject.publicPath,
  publicPath: `${subject.publicPath}/algebra`,
  sitemap: false,
  title: "Algebra",
});

describe("curriculum material context", () => {
  it("binds one material leaf to its nearest subject-owned group", async () => {
    const leaf = Schema.decodeSync(CurriculumRouteSchema)({
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
    const unresolved = Schema.decodeSync(CurriculumRouteDraftSchema)({
      ...leaf,
      materialContextNodeKey: undefined,
      materialContextParentPath: undefined,
      materialContextPublicPath: undefined,
    });

    expect(
      await Effect.runPromise(addMaterialContext([subject, group, unresolved]))
    ).toContainEqual(leaf);
  });

  it("keeps structure routes unchanged", async () => {
    expect(await Effect.runPromise(addMaterialContext([subject]))).toEqual([
      subject,
    ]);
  });

  it("rejects material leaves without a complete subject or course ancestry", async () => {
    const leaf = Schema.decodeSync(CurriculumRouteDraftSchema)({
      ...group,
      canonicalPath: "subjects/mathematics/matrix",
      materialKey: "lesson.mathematics.matrix",
      nodeKey: "class-10-mathematics-matrix",
      title: "Matrices",
    });
    const error = await Effect.runPromise(
      addMaterialContext([group, leaf]).pipe(Effect.flip)
    );

    expect(error).toBeInstanceOf(CurriculumContextError);
    expect(error).toMatchObject({ nodeKey: leaf.nodeKey });
  });

  it("rejects a material leaf without any parent route", async () => {
    const leaf = Schema.decodeSync(CurriculumRouteDraftSchema)({
      ...group,
      canonicalPath: "subjects/mathematics/matrix",
      level: "track",
      materialKey: "lesson.mathematics.matrix",
      nodeKey: "merdeka:root",
      parentPath: undefined,
      publicPath: "curriculum/merdeka",
      title: "Kurikulum Merdeka",
    });
    const error = await Effect.runPromise(
      addMaterialContext([leaf]).pipe(Effect.flip)
    );

    expect(error).toMatchObject({ nodeKey: leaf.nodeKey });
  });
});
