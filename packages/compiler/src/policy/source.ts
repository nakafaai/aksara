import type {
  ContentKey,
  CorpusSourcePath,
} from "@nakafa/aksara-contracts/ids";
import type { HashSet } from "effect";
import { Effect, MutableList } from "effect";
import type {
  DiagramPolicyError,
  ExecutablePolicyViolation,
  MathVisualPolicyError,
  UnsupportedMdxModuleOccurrence,
} from "#compiler/errors";
import {
  ExecutablePolicyError,
  UnsupportedMdxModuleSyntaxError,
} from "#compiler/errors";
import { enforceExecutablePolicy } from "#compiler/policy";
import type { AuthoredHeadingAnchorError } from "#compiler/policy/anchor";
import { createAnchorPolicy } from "#compiler/policy/anchor";
import { createDiagramPolicy } from "#compiler/policy/diagram";
import type {
  AuthoredHeadingDepthError,
  AuthoredListHeadingError,
} from "#compiler/policy/heading";
import { createHeadingPolicy } from "#compiler/policy/heading";
import { createMathVisualPolicy } from "#compiler/policy/math";

/** Every expected failure surfaced by authored-source policy validation. */
export type SourcePolicyError =
  | AuthoredHeadingAnchorError
  | AuthoredHeadingDepthError
  | AuthoredListHeadingError
  | DiagramPolicyError
  | ExecutablePolicyError
  | MathVisualPolicyError
  | UnsupportedMdxModuleSyntaxError;

/** Creates the complete authored-source policy used by inspection and compilation. */
export function createSourcePolicy(
  contentKey: ContentKey,
  sourcePath: CorpusSourcePath,
  allowedComponents: HashSet.HashSet<string>
) {
  const headingPolicy = createHeadingPolicy(contentKey, sourcePath);
  const anchorPolicy = createAnchorPolicy(contentKey);
  const mathVisualPolicy = createMathVisualPolicy(contentKey);
  const diagramPolicy = createDiagramPolicy(contentKey, sourcePath);
  const unsupportedModules = MutableList.make<UnsupportedMdxModuleOccurrence>();
  const violations = MutableList.make<ExecutablePolicyViolation>();
  const remarkPlugins = [
    headingPolicy.remarkPlugin,
    anchorPolicy.remarkPlugin,
    mathVisualPolicy.remarkPlugin,
    diagramPolicy.remarkPlugin,
    enforceExecutablePolicy(allowedComponents, unsupportedModules, violations),
  ];

  /** Rejects policy findings in stable compiler precedence order. */
  const validate = Effect.fn("AksaraCompiler.validateSourcePolicy")(
    function* () {
      if (unsupportedModules.length > 0) {
        return yield* new UnsupportedMdxModuleSyntaxError({
          contentKey,
          occurrences: MutableList.toArray(unsupportedModules),
        });
      }
      yield* mathVisualPolicy.validate();
      yield* diagramPolicy.validate();
      if (violations.length > 0) {
        return yield* new ExecutablePolicyError({
          contentKey,
          violations: MutableList.toArray(violations),
        });
      }
      yield* headingPolicy.validate();
      yield* anchorPolicy.validate();
    }
  );

  return { remarkPlugins, validate };
}
