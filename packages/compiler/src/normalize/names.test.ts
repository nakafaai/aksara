import type { RendererDomain } from "@nakafa/aksara-contracts/renderer/domain";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import {
  nameRelativeComponents,
  type RelativeComponentIdentity,
} from "#compiler/normalize/names";

const TRYOUT_ROOT = "packages/contents/question-bank/tryout/indonesia";

interface AliasCase {
  readonly expected: string;
  readonly identity: RelativeComponentIdentity;
}

/** Builds one measured tryout alias case from its resolved owner module. */
function tryoutCase(
  rendererDomain: RendererDomain,
  track: string,
  owner: string,
  componentName: string,
  expected: string
): AliasCase {
  return {
    expected,
    identity: {
      componentName,
      rendererDomain,
      sourcePath: `${TRYOUT_ROOT}/${track}/${owner}/graph.tsx`,
    },
  };
}

const MATH_CASES = [
  ["set-2/question-19", "Set2Question19Graph"],
  ["set-2/question-6", "Set2Question6Graph"],
  ["set-3/question-18", "Set3Question18Graph"],
  ["set-3/question-19", "Set3Question19Graph"],
  ["set-4/question-18", "Set4Question18Graph"],
  ["set-4/question-19", "Set4Question19Graph"],
  ["set-4/question-4", "Set4Question4Graph"],
  ["set-4/question-5", "Set4Question5Graph"],
  ["set-6/question-18", "Set6Question18Graph"],
  ["set-6/question-19", "Set6Question19Graph"],
  ["set-6/question-5", "Set6Question5Graph"],
  ["set-7/question-18", "Set7Question18Graph"],
  ["set-7/question-19", "Set7Question19Graph"],
  ["set-7/question-4", "Set7Question4Graph"],
] as const;

const QUANT_CASES = [
  ["set-10/question-1", "Graph", "Set10Question1Graph"],
  ["set-10/question-2", "Graph", "Set10Question2Graph"],
  ["set-10/question-8", "Graph", "Set10Question8Graph"],
  ["set-6/question-12", "Graph", "Set6Question12Graph"],
  ["set-6/question-19", "Graph", "Set6Question19Graph"],
  ["set-7/question-1", "Graph", "Set7Question1Graph"],
  ["set-7/question-13", "Graph", "Set7Question13Graph"],
  ["set-7/question-14", "Graph", "Set7Question14Graph"],
  ["set-8/question-20", "Graph", "Set8Question20Graph"],
  ["set-9/question-1", "Graph", "Set9Question1Graph"],
  ["set-9/question-2", "Graph", "Set9Question2Graph"],
  ["set-9/question-3", "Graph", "Set9Question3Graph"],
  ["set-5/question-12", "QuestionGraph", "Set5Question12Graph"],
  ["set-5/question-9", "QuestionGraph", "Set5Question9Graph"],
] as const;

const SALES_CASES = [
  ["set-2/question-15", "Set2Question15SalesChart"],
  ["set-2/question-5", "Set2Question5SalesChart"],
  ["set-5/question-6", "Set5Question6SalesChart"],
  ["set-8/question-1", "Set8Question1SalesChart"],
] as const;

const ACTUAL_ALIASES: readonly AliasCase[] = [
  ...MATH_CASES.map(([owner, expected]) =>
    tryoutCase(
      "snbt-math",
      "snbt/mathematical-reasoning",
      owner,
      "Graph",
      expected
    )
  ),
  ...QUANT_CASES.map(([owner, componentName, expected]) =>
    tryoutCase(
      "snbt-quant",
      "snbt/quantitative-knowledge",
      owner,
      componentName,
      expected
    )
  ),
  ...SALES_CASES.map(([owner, expected]) =>
    tryoutCase(
      "snbt-general",
      "snbt/general-reasoning",
      owner,
      "SalesChart",
      expected
    )
  ),
  {
    expected: "KimElectabilityChart",
    identity: {
      componentName: "ElectabilityChart",
      rendererDomain: "politics",
      sourcePath:
        "packages/contents/articles/politics/kim-plus-empty-box/chart.tsx",
    },
  },
  {
    expected: "PorkElectabilityChart",
    identity: {
      componentName: "ElectabilityChart",
      rendererDomain: "politics",
      sourcePath:
        "packages/contents/articles/politics/pork-barrel-politics-power/electability-chart.tsx",
    },
  },
];

/** Runs one successful relative component naming program. */
function name(identities: readonly RelativeComponentIdentity[]) {
  return Effect.runPromise(nameRelativeComponents(identities));
}

/** Returns one typed relative component naming failure. */
function reject(identities: readonly RelativeComponentIdentity[]) {
  return Effect.runPromise(
    nameRelativeComponents(identities).pipe(Effect.flip)
  );
}

describe("relative component names", () => {
  it("preserves unique and cross-domain component contracts", async () => {
    const named = await name([
      {
        componentName: "FunctionMachine",
        rendererDomain: "mathematics",
        sourcePath:
          "packages/contents/material/lesson/mathematics/function-composition-inverse-function/function-concept/function-machine.tsx",
      },
      {
        componentName: "Illustration",
        rendererDomain: "snbt-quant",
        sourcePath: `${TRYOUT_ROOT}/snbt/quantitative-knowledge/set-3/question-13/illustration.tsx`,
      },
      {
        componentName: "Illustration",
        rendererDomain: "tka-math",
        sourcePath: `${TRYOUT_ROOT}/tka/mathematics/set-1/question-30/illustration.tsx`,
      },
    ]);
    expect(named.map(({ contractName }) => contractName)).toEqual([
      "FunctionMachine",
      "Illustration",
      "Illustration",
    ]);
  });

  it("assigns every exact measured same-domain alias", async () => {
    const named = await name(ACTUAL_ALIASES.map(({ identity }) => identity));
    expect(named.map(({ contractName }) => contractName)).toEqual(
      ACTUAL_ALIASES.map(({ expected }) => expected)
    );
  });

  it.each([
    ["packages/corpus/material/test/widget.tsx", "Widget", "module-path"],
    [
      "packages/contents/material/lesson/test/widget.ts",
      "Widget",
      "module-path",
    ],
    [
      "packages/contents/material/lesson/Test/widget.tsx",
      "Widget",
      "module-path",
    ],
    [
      "packages/contents/material/lesson/test/BadWidget.tsx",
      "Widget",
      "module-path",
    ],
    ["packages/contents/material//test/widget.tsx", "Widget", "module-path"],
    ["packages/contents/curriculum/test/widget.tsx", "Widget", "owner-kind"],
    [
      "packages/contents/material/lesson/test/widget.tsx",
      "widget",
      "component-name",
    ],
  ] as const)(
    "rejects invalid ownership as %s",
    async (path, componentName, reason) => {
      await expect(
        reject([
          { componentName, rendererDomain: "mathematics", sourcePath: path },
        ])
      ).resolves.toMatchObject({ _tag: "RelativeComponentNameError", reason });
    }
  );

  it("rejects an unmeasured same-domain duplicate", async () => {
    const error = await reject([
      {
        componentName: "Widget",
        rendererDomain: "politics",
        sourcePath: "packages/contents/articles/a/widget.tsx",
      },
      {
        componentName: "Widget",
        rendererDomain: "politics",
        sourcePath: "packages/contents/articles/b/widget.tsx",
      },
    ]);
    expect(error).toMatchObject({ reason: "unexpected-duplicate" });
  });

  it("rejects aliases that collide with an owner or reserved name", async () => {
    const sameOwner = `${TRYOUT_ROOT}/snbt/general-reasoning/set-2/question-15`;
    const ownerError = await reject([
      {
        componentName: "SalesChart",
        rendererDomain: "snbt-general",
        sourcePath: `${sameOwner}/chart.tsx`,
      },
      {
        componentName: "SalesChart",
        rendererDomain: "snbt-general",
        sourcePath: `${sameOwner}/sales.tsx`,
      },
    ]);
    const reservedError = await reject([
      {
        componentName: "Set2Question19Graph",
        rendererDomain: "snbt-math",
        sourcePath: "packages/contents/articles/test/graph.tsx",
      },
      ...MATH_CASES.slice(0, 2).map(
        ([owner]) =>
          tryoutCase(
            "snbt-math",
            "snbt/mathematical-reasoning",
            owner,
            "Graph",
            "unused"
          ).identity
      ),
    ]);
    expect([ownerError._tag, reservedError._tag]).toEqual([
      "RelativeComponentCollisionError",
      "RelativeComponentCollisionError",
    ]);
  });

  it("rejects unique and aliased names above the renderer ceiling", async () => {
    const unique = await reject([
      {
        componentName: `A${"a".repeat(128)}`,
        rendererDomain: "mathematics",
        sourcePath: "packages/contents/material/lesson/test/widget.tsx",
      },
    ]);
    const first = "a".repeat(120);
    const second = "b".repeat(120);
    const alias = await reject([
      {
        componentName: "ElectabilityChart",
        rendererDomain: "politics",
        sourcePath: `packages/contents/articles/${first}/chart.tsx`,
      },
      {
        componentName: "ElectabilityChart",
        rendererDomain: "politics",
        sourcePath: `packages/contents/articles/${second}/chart.tsx`,
      },
    ]);
    expect(unique).toMatchObject({ reason: "name-length" });
    expect(alias).toMatchObject({ reason: "name-length" });
  });

  it("names an empty inventory without inventing contracts", async () => {
    await expect(name([])).resolves.toEqual([]);
  });
});
