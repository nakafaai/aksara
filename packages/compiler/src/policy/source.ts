import type {
  ContentKey,
  CorpusSourcePath,
} from "@nakafa/aksara-contracts/ids";
import { Effect, type HashSet } from "effect";
import {
  ExecutablePolicyError,
  type ExecutablePolicyViolation,
  type MathVisualPolicyError,
  type UnsupportedMdxModuleOccurrence,
  UnsupportedMdxModuleSyntaxError,
} from "#compiler/errors";
import { enforceExecutablePolicy } from "#compiler/policy";
import {
  type AuthoredHeadingDepthError,
  type AuthoredListHeadingError,
  createHeadingPolicy,
} from "#compiler/policy/heading";
import { createMathVisualPolicy } from "#compiler/policy/math";

/** Every expected failure surfaced by authored-source policy validation. */
export type SourcePolicyError =
  | AuthoredHeadingDepthError
  | AuthoredListHeadingError
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
  const mathVisualPolicy = createMathVisualPolicy(contentKey);
  const unsupportedModules: UnsupportedMdxModuleOccurrence[] = [];
  const violations: ExecutablePolicyViolation[] = [];
  const remarkPlugins = [
    headingPolicy.remarkPlugin,
    mathVisualPolicy.remarkPlugin,
    enforceExecutablePolicy(allowedComponents, unsupportedModules, violations),
  ];

  /** Rejects policy findings in stable compiler precedence order. */
  const validate = Effect.fn("AksaraCompiler.validateSourcePolicy")(
    function* () {
      if (unsupportedModules.length > 0) {
        return yield* new UnsupportedMdxModuleSyntaxError({
          contentKey,
          occurrences: [...unsupportedModules],
        });
      }
      yield* mathVisualPolicy.validate();
      if (violations.length > 0) {
        return yield* new ExecutablePolicyError({
          contentKey,
          violations: [...violations],
        });
      }
      yield* headingPolicy.validate();
    }
  );

  return { remarkPlugins, validate };
}
