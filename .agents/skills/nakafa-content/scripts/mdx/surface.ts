import assert from "node:assert/strict";

import type { MdxNode, SourceRange } from "#nakafa-content/mdx/parse";
import { renderedSourceRange } from "#nakafa-content/mdx/rendered";

/** Locates accessible alt copy while leaving a Markdown image URL protected. */
export function imageAltRange(node: MdxNode, source: string): SourceRange {
  assert.ok(node.type === "image" || node.type === "imageReference");
  const start = node.position?.start?.offset;
  const end = node.position?.end?.offset;
  const continuationColumn = node.position?.start?.column;
  assert.ok(start !== undefined);
  assert.ok(end !== undefined);
  assert.ok(continuationColumn !== undefined);
  const authored = source.slice(start, end);
  const markerOffset = authored.indexOf("![");
  assert.notEqual(markerOffset, -1);
  const altStart = markerOffset + 2;
  let depth = 1;
  let altEnd = -1;
  for (let index = altStart; index < authored.length; index += 1) {
    if (authored[index] === "\\") {
      index += 1;
      continue;
    }
    if (authored[index] === "[") {
      depth += 1;
      continue;
    }
    if (authored[index] !== "]") {
      continue;
    }
    depth -= 1;
    if (depth === 0) {
      altEnd = index;
      break;
    }
  }
  assert.notEqual(altEnd, -1);
  const range = {
    end: { offset: start + altEnd },
    start: { column: continuationColumn, offset: start + altStart },
  };
  assert.ok(typeof node.alt === "string");
  return renderedSourceRange(range, node.alt, source);
}
