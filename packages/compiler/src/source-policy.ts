import type { ContentKey } from "@nakafa/aksara-contracts/ids";
import { Effect } from "effect";
import {
  ExecutablePolicyError,
  type ExecutablePolicyViolation,
  type UnsupportedMdxModuleOccurrence,
  UnsupportedMdxModuleSyntaxError,
} from "#compiler/errors";
import {
  type AuthoredListHeadingError,
  createHeadingPolicy,
} from "#compiler/heading-policy";
import {
  type AuthoredCoordinateLabelError,
  createCoordinateLabelPolicy,
} from "#compiler/label-policy";
import { enforceExecutablePolicy } from "#compiler/policy";

/** Every expected failure surfaced by authored-source policy validation. */
export type SourcePolicyError =
  | AuthoredCoordinateLabelError
  | AuthoredListHeadingError
  | ExecutablePolicyError
  | UnsupportedMdxModuleSyntaxError;

/** Creates the complete authored-source policy used by inspection and compilation. */
export function createSourcePolicy(
  contentKey: ContentKey,
  allowedComponents: ReadonlySet<string>
) {
  const coordinateLabelPolicy = createCoordinateLabelPolicy(contentKey);
  const headingPolicy = createHeadingPolicy(contentKey);
  const unsupportedModules: UnsupportedMdxModuleOccurrence[] = [];
  const violations: ExecutablePolicyViolation[] = [];
  const remarkPlugins = [
    coordinateLabelPolicy.remarkPlugin,
    headingPolicy.remarkPlugin,
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
      if (violations.length > 0) {
        return yield* new ExecutablePolicyError({
          contentKey,
          violations: [...violations],
        });
      }
      yield* coordinateLabelPolicy.validate();
      yield* headingPolicy.validate();
    }
  );

  return { remarkPlugins, validate };
}
