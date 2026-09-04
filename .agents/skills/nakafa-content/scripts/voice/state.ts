import type { LineContext, LineState } from "#nakafa-content/voice/types";

const METADATA_START_PATTERN = /^export const metadata\s*=\s*\{\s*$/u;
const METADATA_DESCRIPTION_PATTERN =
  /^\s*description:\s*"(?:[^"\\]|\\.)*"\s*,?\s*$/u;
const METADATA_DESCRIPTION_KEY_PATTERN = /^\s*description:\s*$/u;
const METADATA_STRING_VALUE_PATTERN = /^\s*"(?:[^"\\]|\\.)*"\s*,?\s*$/u;
const METADATA_END_PATTERN = /^\s*\};\s*$/u;
const CODE_FENCE_PATTERN = /^\s*(```|~~~)/u;
const UNESCAPED_BACKTICK_PATTERN = /(?<!\\)`/gu;

/** Creates the mutable parser state used across lesson source lines. */
export function createLineState(): LineState {
  return {
    expectsMetadataDescriptionValue: false,
    inCodeFence: false,
    inMetadata: false,
    inTemplateLiteral: false,
  };
}

/** Classifies one line before prose and structural rules are applied. */
export function classifyLine(line: string, state: LineState): LineContext {
  if (METADATA_START_PATTERN.test(line)) {
    state.inMetadata = true;
  }
  const isCodeFence = CODE_FENCE_PATTERN.test(line);
  if (isCodeFence) {
    state.inCodeFence = !state.inCodeFence;
  }
  const hasOddBacktickCount =
    [...line.matchAll(UNESCAPED_BACKTICK_PATTERN)].length % 2 === 1;
  const isTemplateLiteralLine = state.inTemplateLiteral || hasOddBacktickCount;
  const isProtectedRegion =
    state.inMetadata ||
    state.inCodeFence ||
    isCodeFence ||
    isTemplateLiteralLine;
  const isMetadataDescription =
    state.inMetadata &&
    (METADATA_DESCRIPTION_PATTERN.test(line) ||
      (state.expectsMetadataDescriptionValue &&
        METADATA_STRING_VALUE_PATTERN.test(line)));
  return {
    hasOddBacktickCount,
    isMetadataDescription,
    isProtectedRegion,
  };
}

/** Advances metadata and template-literal state after scanning one line. */
export function finishLine(
  line: string,
  state: LineState,
  context: LineContext
): void {
  if (context.isMetadataDescription) {
    state.expectsMetadataDescriptionValue = false;
  } else if (state.inMetadata && METADATA_DESCRIPTION_KEY_PATTERN.test(line)) {
    state.expectsMetadataDescriptionValue = true;
  }
  if (state.inMetadata && METADATA_END_PATTERN.test(line)) {
    state.inMetadata = false;
    state.expectsMetadataDescriptionValue = false;
  }
  if (context.hasOddBacktickCount) {
    state.inTemplateLiteral = !state.inTemplateLiteral;
  }
}
