import { Effect, Schema } from "effect";
import type {
  MdxJsxFlowElement,
  MdxJsxTextElement,
  MdxjsEsm,
} from "mdast-util-mdx";

const TAG_BOUNDARIES = new Set(["\t", "\n", "\r", " ", "/", ">"]);

/** Official MDX positions do not match the unchanged authored source. */
export class MdxSourceEditError extends Schema.TaggedError<MdxSourceEditError>()(
  "MdxSourceEditError",
  {
    reason: Schema.Literal(
      "edit-content",
      "module-position",
      "overlapping-edit",
      "tag-position"
    ),
    sourcePath: Schema.String,
  }
) {}

/** One exact source replacement verified before application. */
export interface MdxSourceEdit {
  readonly end: number;
  readonly expected: string;
  readonly replacement: string;
  readonly start: number;
}

/** Consumes one LF or CRLF line break when present. */
function consumeLineBreak(rawMdx: string, offset: number) {
  if (rawMdx.startsWith("\r\n", offset)) {
    return offset + 2;
  }
  return rawMdx[offset] === "\n" ? offset + 1 : offset;
}

/** Extends module removal through its following separator, never body bytes. */
function moduleRemovalEnd(rawMdx: string, nodeEnd: number) {
  const firstEnd = consumeLineBreak(rawMdx, nodeEnd);
  if (firstEnd === nodeEnd) {
    return nodeEnd;
  }
  let blankEnd = firstEnd;
  while (rawMdx[blankEnd] === " " || rawMdx[blankEnd] === "\t") {
    blankEnd += 1;
  }
  const secondEnd = consumeLineBreak(rawMdx, blankEnd);
  return secondEnd === blankEnd ? firstEnd : secondEnd;
}

/** Creates one byte-local edit that removes an import-only MDX module. */
export const removeMdxModule = Effect.fn("AksaraCompiler.removeMdxModule")(
  function* (rawMdx: string, node: MdxjsEsm, sourcePath: string) {
    const start = node.position?.start.offset;
    const nodeEnd = node.position?.end.offset;
    if (
      start === undefined ||
      nodeEnd === undefined ||
      rawMdx.slice(start, nodeEnd) !== node.value
    ) {
      return yield* new MdxSourceEditError({
        reason: "module-position",
        sourcePath,
      });
    }
    const end = moduleRemovalEnd(rawMdx, nodeEnd);
    return {
      end,
      expected: rawMdx.slice(start, end),
      replacement: "",
      start,
    } satisfies MdxSourceEdit;
  }
);

/** Confirms that one parsed JSX name ends at a legal tag boundary. */
function validTagName(rawMdx: string, start: number, name: string) {
  return (
    rawMdx.slice(start, start + name.length) === name &&
    TAG_BOUNDARIES.has(rawMdx.charAt(start + name.length))
  );
}

/** Creates opening and optional closing edits for one parsed JSX element. */
export const renameMdxElement = Effect.fn("AksaraCompiler.renameMdxElement")(
  function* (
    rawMdx: string,
    node: MdxJsxFlowElement | MdxJsxTextElement,
    replacement: string,
    sourcePath: string
  ) {
    const start = node.position?.start.offset;
    const end = node.position?.end.offset;
    const { name } = node;
    if (
      start === undefined ||
      end === undefined ||
      name === null ||
      !validTagName(rawMdx, start + 1, name)
    ) {
      return yield* new MdxSourceEditError({
        reason: "tag-position",
        sourcePath,
      });
    }
    const edits: MdxSourceEdit[] = [
      {
        end: start + 1 + name.length,
        expected: name,
        replacement,
        start: start + 1,
      },
    ];
    const closingStart = rawMdx.lastIndexOf(`</${name}`, end);
    if (closingStart >= start && validTagName(rawMdx, closingStart + 2, name)) {
      edits.push({
        end: closingStart + 2 + name.length,
        expected: name,
        replacement,
        start: closingStart + 2,
      });
    }
    return edits;
  }
);

/** Applies verified non-overlapping edits from the highest offset downward. */
export const applyMdxEdits = Effect.fn("AksaraCompiler.applyMdxEdits")(
  function* (
    rawMdx: string,
    edits: readonly MdxSourceEdit[],
    sourcePath: string
  ) {
    const ordered = [...edits].sort((left, right) => right.start - left.start);
    let output = rawMdx;
    let previousStart = rawMdx.length + 1;
    for (const edit of ordered) {
      if (edit.end > previousStart) {
        return yield* new MdxSourceEditError({
          reason: "overlapping-edit",
          sourcePath,
        });
      }
      if (rawMdx.slice(edit.start, edit.end) !== edit.expected) {
        return yield* new MdxSourceEditError({
          reason: "edit-content",
          sourcePath,
        });
      }
      output = `${output.slice(0, edit.start)}${edit.replacement}${output.slice(edit.end)}`;
      previousStart = edit.start;
    }
    return output;
  }
);
