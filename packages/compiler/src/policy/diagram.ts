import type {
  ContentKey,
  CorpusSourcePath,
} from "@nakafa/aksara-contracts/ids";
import {
  Array as Arr,
  Effect,
  MutableList,
  Option,
  Predicate,
  Schema,
} from "effect";
import type { Root } from "mdast";
import type {
  MdxJsxAttribute,
  MdxJsxFlowElement,
  MdxJsxTextElement,
} from "mdast-util-mdx";
import type { Mermaid } from "mermaid";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { attributeExpression } from "#compiler/ast/attribute";
import {
  DiagramPolicyError,
  type DiagramPolicyViolation,
  DiagramPolicyViolationSchema,
} from "#compiler/errors";

/** One authored diagram: its Mermaid source and where that source starts. */
const DiagramCandidateSchema = Schema.Struct({
  chart: Schema.String,
  column: Schema.Finite,
  line: Schema.Finite,
});
type DiagramCandidate = typeof DiagramCandidateSchema.Type;

/** What one `Mermaid` element yields: its diagram, or why it has none to parse. */
const DiagramInspectionSchema = Schema.Union([
  Schema.Struct({ candidate: DiagramCandidateSchema }),
  Schema.Struct({ violation: DiagramPolicyViolationSchema }),
]);
type DiagramInspection = typeof DiagramInspectionSchema.Type;

/** Mermaid for this process, loaded on the first diagram. */
let mermaidLoad: Promise<Mermaid> | undefined;

/**
 * Loads Mermaid with a DOM window in place. Mermaid sanitizes every label with
 * DOMPurify, and DOMPurify works only when a window stood on the global object
 * while its module evaluated, so a jsdom window stands there until Mermaid has
 * loaded and is then removed.
 */
async function importMermaid() {
  const { JSDOM } = await import("jsdom");
  Reflect.set(globalThis, "window", new JSDOM("").window);
  try {
    return (await import("mermaid")).default;
  } finally {
    Reflect.deleteProperty(globalThis, "window");
  }
}

/** Mermaid, loaded once for every document the process checks. */
const loadMermaid = Effect.promise(() => {
  mermaidLoad ??= importMermaid();
  return mermaidLoad;
});

/** Where an MDX node starts, one-based. */
function nodeLocation(node: {
  readonly position?: MdxJsxFlowElement["position"];
}) {
  return {
    column: node.position?.start.column ?? 1,
    line: node.position?.start.line ?? 1,
  };
}

/**
 * Reads the Mermaid source of one `chart` attribute: a string, or a template
 * literal without expressions, which is how the corpus writes a diagram. The
 * chart starts on the attribute's line.
 */
function readChart(attribute: MdxJsxAttribute): DiagramInspection {
  const location = nodeLocation(attribute);
  if (Predicate.isString(attribute.value)) {
    return { candidate: { ...location, chart: attribute.value } };
  }
  const expression = attributeExpression(attribute);
  if (
    expression?.type === "TemplateLiteral" &&
    expression.expressions.length === 0
  ) {
    const [quasi] = expression.quasis;
    return { candidate: { ...location, chart: quasi?.value.cooked ?? "" } };
  }
  if (expression?.type === "Literal" && Predicate.isString(expression.value)) {
    return { candidate: { ...location, chart: expression.value } };
  }
  return {
    violation: {
      ...location,
      message:
        "The chart must be static Mermaid text: a string or a template literal without expressions.",
    },
  };
}

/** Finds the diagram of one `Mermaid` element. */
function inspectDiagram(
  node: MdxJsxFlowElement | MdxJsxTextElement
): DiagramInspection {
  const chart = Arr.findFirst(
    node.attributes,
    (attribute): attribute is MdxJsxAttribute =>
      attribute.type === "mdxJsxAttribute" && attribute.name === "chart"
  );
  if (Option.isNone(chart)) {
    return {
      violation: {
        ...nodeLocation(node),
        message: "The Mermaid element has no chart.",
      },
    };
  }
  return readChart(chart.value);
}

/**
 * The chart line that a Mermaid parse error names: the first line of its
 * location, which Mermaid's grammars report, or the first line of the chart.
 */
function failedChartLine(cause: unknown) {
  const hash = Predicate.hasProperty(cause, "hash") ? cause.hash : undefined;
  const location = Predicate.hasProperty(hash, "loc") ? hash.loc : undefined;
  const line = Predicate.hasProperty(location, "first_line")
    ? location.first_line
    : undefined;
  return Predicate.isNumber(line) ? line : 1;
}

/** Turns a Mermaid parse failure into a violation at the file line it names. */
function parseViolation(
  candidate: DiagramCandidate,
  cause: unknown
): DiagramPolicyViolation {
  return {
    column: candidate.column,
    line: candidate.line + failedChartLine(cause) - 1,
    message: String(cause).trim(),
  };
}

/** Parses each diagram with Mermaid, in order, and returns the ones it cannot parse. */
const parseDiagrams = Effect.fn("AksaraCompiler.parseDiagrams")(function* (
  candidates: readonly DiagramCandidate[]
) {
  if (candidates.length === 0) {
    return [];
  }
  const mermaid = yield* loadMermaid;
  const parsed = yield* Effect.forEach(candidates, (candidate) =>
    Effect.tryPromise({
      catch: (cause) => parseViolation(candidate, cause),
      try: () => mermaid.parse(candidate.chart),
    }).pipe(Effect.flip, Effect.option)
  );
  return Arr.getSomes(parsed);
});

/**
 * Creates the compiler-owned Mermaid policy: every `Mermaid` element must hold
 * static Mermaid text that the Mermaid version Nakafa draws diagrams with
 * parses, so no reader ever sees a diagram that could not be drawn.
 */
export function createDiagramPolicy(
  contentKey: ContentKey,
  sourcePath: CorpusSourcePath
) {
  const candidates = MutableList.make<DiagramCandidate>();
  const violations = MutableList.make<DiagramPolicyViolation>();

  /** Records every `Mermaid` element during the remark traversal. */
  const remarkPlugin: Plugin<[], Root> = () => (tree) => {
    visit(tree, (node) => {
      if (
        !(
          (node.type === "mdxJsxFlowElement" ||
            node.type === "mdxJsxTextElement") &&
          node.name === "Mermaid"
        )
      ) {
        return;
      }
      const inspection = inspectDiagram(node);
      if ("violation" in inspection) {
        MutableList.append(violations, inspection.violation);
        return;
      }
      MutableList.append(candidates, inspection.candidate);
    });
  };

  /** Parses every recorded diagram and rejects the document if one fails. */
  const validate = Effect.fn("AksaraCompiler.validateDiagramPolicy")(
    function* () {
      const findings = [
        ...MutableList.toArray(violations),
        ...(yield* parseDiagrams(MutableList.toArray(candidates))),
      ];
      if (findings.length > 0) {
        return yield* new DiagramPolicyError({
          contentKey,
          sourcePath,
          violations: findings,
        });
      }
    }
  );

  return { remarkPlugin, validate };
}
