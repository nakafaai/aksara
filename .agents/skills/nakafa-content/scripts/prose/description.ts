import { Array as Arr, Option, Predicate } from "effect";
import type { HeadingFinding } from "#nakafa-content/heading/finding";
import type { EstreeNode, MdxNode } from "#nakafa-content/mdx/parse";
import {
  asEstreeNode,
  parseLessonMdx,
  staticFieldName,
  visitMdxNodes,
} from "#nakafa-content/mdx/parse";
import type { LessonVoiceIssue } from "#nakafa-content/voice/types";

/**
 * Curriculum and chapter prefixes forbidden in curriculum-neutral descriptions
 * (Rule 17). Descriptions explain the concept directly without naming a single
 * syllabus, form, class, or chapter number.
 */
const NUMERIC_PREFIX_PATTERN =
  /\b(?:form|tingkatan|chapter|bab|kelas|klasse|kapitel|jahrgangsstufe)\s+\d+\b/iu;
const ROMAN_PREFIX_PATTERN =
  /\b(?:Form|Tingkatan|Chapter|Bab|Kelas|Klasse|Kapitel)\s+[IVX]{1,4}\b/u;
const LEADING_CURRICULUM_PREFIX_PATTERN =
  /^\s*(?:Nota|KSSM|Kurikulum\s+Merdeka|Merdeka|IGCSE|SPM|SNBT|PT3)\b/iu;

/** Word-internal hyphens (rata-rata, x-axis, NumPy-Array) and apostrophes (don't, Newton's). */
const WORD_INTERNAL_HYPHEN = /(?<=[\p{L}\p{N}])-(?=[\p{L}\p{N}])/gu;
const WORD_INTERNAL_APOSTROPHE = /(?<=\p{L})['’](?=\p{L})/gu;

/** Any character left outside letters, digits, spaces, commas, and periods is forbidden. */
const FORBIDDEN_PUNCTUATION = /[^\p{L}\p{N}\s,.]/gu;

/** One extracted metadata description with its one-based source position. */
interface ExtractedDescription {
  readonly column: number;
  readonly line: number;
  readonly value: string;
}

/** Resolves a static string literal, template without expressions, or string concatenation. */
function staticStringValue(node: EstreeNode): Option.Option<string> {
  if (node.type === "Literal" && Predicate.isString(node.value)) {
    return Option.some(node.value);
  }
  if (
    node.type === "TemplateLiteral" &&
    Array.isArray(node.expressions) &&
    node.expressions.length === 0 &&
    Array.isArray(node.quasis)
  ) {
    const parts = Arr.map(
      node.quasis as readonly EstreeNode[],
      (quasi) => (quasi.value as { cooked: string }).cooked
    );
    return Option.some(Arr.join(parts, ""));
  }
  if (node.type === "BinaryExpression" && node.operator === "+") {
    return Option.map(
      Option.all([
        staticStringValue(node.left as EstreeNode),
        staticStringValue(node.right as EstreeNode),
      ]),
      ([leftText, rightText]) => `${leftText}${rightText}`
    );
  }
  return Option.none();
}

/** Finds the exported metadata object in one ESM program. */
function exportedMetadataObject(estree: EstreeNode): Option.Option<EstreeNode> {
  const body = estree.body as readonly EstreeNode[];
  for (const statement of body) {
    if (statement.type !== "ExportNamedDeclaration") {
      continue;
    }
    const declaration = asEstreeNode(statement.declaration);
    if (
      declaration?.type !== "VariableDeclaration" ||
      !Array.isArray(declaration.declarations)
    ) {
      continue;
    }
    for (const declarator of declaration.declarations as readonly EstreeNode[]) {
      if (staticFieldName(asEstreeNode(declarator.id)) === "metadata") {
        const init = asEstreeNode(declarator.init);
        if (init?.type === "ObjectExpression") {
          return Option.some(init);
        }
      }
    }
  }
  return Option.none();
}

/** Reads the static `metadata.description` value and its source position, if authored. */
export function extractMetadataDescription(
  tree: MdxNode
): Option.Option<ExtractedDescription> {
  let found: Option.Option<ExtractedDescription> = Option.none();
  visitMdxNodes(tree, (node) => {
    if (
      Option.isSome(found) ||
      node.type !== "mdxjsEsm" ||
      node.data?.estree === undefined
    ) {
      return;
    }
    const metadata = exportedMetadataObject(node.data.estree);
    if (Option.isNone(metadata)) {
      return;
    }
    for (const property of metadata.value.properties as readonly EstreeNode[]) {
      if (
        property.type !== "Property" ||
        staticFieldName(asEstreeNode(property.key)) !== "description"
      ) {
        continue;
      }
      const value = staticStringValue(property.value as EstreeNode);
      if (Option.isSome(value)) {
        const loc = (
          property.loc as { start: { column: number; line: number } }
        ).start;
        found = Option.some({
          column: loc.column + 1,
          line: loc.line,
          value: value.value,
        });
      }
    }
  });
  return found;
}

/** Returns every distinct forbidden punctuation character found in a description. */
export function forbiddenDescriptionCharacters(
  text: string
): readonly string[] {
  const cleaned = text
    .replaceAll(WORD_INTERNAL_HYPHEN, " ")
    .replaceAll(WORD_INTERNAL_APOSTROPHE, "");
  return Arr.dedupe(
    Arr.map(
      Array.from(cleaned.matchAll(FORBIDDEN_PUNCTUATION)),
      (match) => match[0]
    )
  );
}

/** Returns the matched curriculum or chapter prefix, if the description carries one. */
export function forbiddenDescriptionPrefix(
  text: string
): Option.Option<string> {
  for (const pattern of [
    LEADING_CURRICULUM_PREFIX_PATTERN,
    NUMERIC_PREFIX_PATTERN,
    ROMAN_PREFIX_PATTERN,
  ]) {
    const match = pattern.exec(text);
    if (match !== null) {
      return Option.some(match[0].trim());
    }
  }
  return Option.none();
}

/**
 * Enforces Rule 17 on `metadata.description`: natural, curriculum-neutral prose
 * using only commas and periods (preserving word-internal hyphens and
 * apostrophes), with no colons, semicolons, parentheses, brackets, slashes,
 * quotes, exclamation or question marks, dashes, or curriculum/chapter prefixes.
 */
export function findDescriptionFindings(tree: MdxNode): HeadingFinding[] {
  return Option.match(extractMetadataDescription(tree), {
    onNone: () => [],
    onSome: ({ line, value }) => {
      const findings: HeadingFinding[] = [];
      const prefix = forbiddenDescriptionPrefix(value);
      if (Option.isSome(prefix)) {
        findings.push({
          blocking: true,
          line,
          message: `metadata.description uses curriculum or chapter prefix '${prefix.value}'. Lessons are curriculum-neutral: explain the concept directly without naming a form, class, syllabus, or chapter.`,
          rule: "metadata-description-prefix",
        });
      }
      const bad = forbiddenDescriptionCharacters(value);
      if (bad.length > 0) {
        findings.push({
          blocking: true,
          line,
          message: `metadata.description uses forbidden punctuation (${Arr.join(bad, " ")}). Write natural direct prose using only commas and periods.`,
          rule: "metadata-description-punctuation",
        });
      }
      return findings;
    },
  });
}

/** Returns strict `metadata.description` issues in `LessonVoiceIssue` shape. */
export function findMetadataDescriptionIssues(
  source: string,
  tree: MdxNode = parseLessonMdx(source)
): LessonVoiceIssue[] {
  const extracted = extractMetadataDescription(tree);
  if (Option.isNone(extracted)) {
    return [];
  }
  const { column, line } = extracted.value;
  const excerpt = (source.split("\n")[line - 1] as string).trim();
  return Arr.map(findDescriptionFindings(tree), ({ rule }) => ({
    column,
    excerpt,
    line,
    rule,
  }));
}
