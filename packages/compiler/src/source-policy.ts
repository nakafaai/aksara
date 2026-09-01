import type { ContentKey } from "@nakafa/aksara-contracts/ids";
import { Effect } from "effect";
import {
  ExecutablePolicyError,
  type ExecutablePolicyViolation,
  type MathVisualPolicyError,
  type UnsupportedMdxModuleOccurrence,
  UnsupportedMdxModuleSyntaxError,
} from "#compiler/errors";
import {
  type AuthoredListHeadingError,
  createHeadingPolicy,
} from "#compiler/heading-policy";
import { createMathVisualPolicy } from "#compiler/math-policy";
import { enforceExecutablePolicy } from "#compiler/policy";

/** Every expected failure surfaced by authored-source policy validation. */
export type SourcePolicyError =
  | AuthoredListHeadingError
  | ExecutablePolicyError
  | MathVisualPolicyError
  | UnsupportedMdxModuleSyntaxError;

/** Creates the complete authored-source policy used by inspection and compilation. */
export function createSourcePolicy(
  contentKey: ContentKey,
  allowedComponents: ReadonlySet<string>
) {
  const headingPolicy = createHeadingPolicy(contentKey);
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
