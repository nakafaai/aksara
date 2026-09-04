import { isProtectedProseComponent } from "#nakafa-content/mdx/fields";
import { metadataAddressRanges } from "#nakafa-content/mdx/metadata";
import type { MdxNode } from "#nakafa-content/mdx/parse";
import { imageAltRange } from "#nakafa-content/mdx/surface";
import { germanAntecedentState } from "#nakafa-content/voice/address";
import { collectTextAddressIssues } from "#nakafa-content/voice/child";
import {
  collectAttributeIssues,
  collectParagraphIssues,
  collectRenderedExpressionIssues,
  type ProseState,
} from "#nakafa-content/voice/copy";
import { collectLinkLabelIssues } from "#nakafa-content/voice/link";
import {
  addressRules,
  matchRangeRules,
  matchUnanchoredGermanAddress,
} from "#nakafa-content/voice/match";
import { multilineQuotationRanges } from "#nakafa-content/voice/text";
import type {
  LessonVoiceIssue,
  LessonVoiceLocale,
  LessonVoiceRule,
} from "#nakafa-content/voice/types";

const PROTECTED_NODE_TYPES = new Set([
  "blockquote",
  "code",
  "definition",
  "html",
  "image",
  "inlineCode",
  "link",
  "linkReference",
  "mdxjsEsm",
]);
const LINK_NODE_TYPES = new Set(["link", "linkReference"]);
const IMAGE_NODE_TYPES = new Set(["image", "imageReference"]);

/** Adds address-only findings from learner-visible Markdown image alt copy. */
function collectImageAltIssues(
  locale: LessonVoiceLocale,
  node: MdxNode,
  rules: readonly LessonVoiceRule[],
  source: string,
  issues: LessonVoiceIssue[],
  state: ProseState
): void {
  const range = imageAltRange(node, source);
  const selectedAddressRules = addressRules(rules);
  issues.push(
    ...matchRangeRules(
      locale,
      source,
      range,
      selectedAddressRules,
      false,
      state.quotationRanges
    ),
    ...matchUnanchoredGermanAddress(
      locale,
      source,
      range,
      selectedAddressRules,
      { quotationRanges: state.quotationRanges }
    )
  );
}

/** Recognizes source and component regions that must remain untouched. */
function isProtectedNode(node: MdxNode, inherited: boolean): boolean {
  if (inherited || PROTECTED_NODE_TYPES.has(node.type ?? "")) {
    return true;
  }
  return (
    (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") &&
    isProtectedProseComponent(node.name)
  );
}

/** Scans authored blockquotes as callouts while quoted speech stays masked. */
function collectBlockquoteIssues(
  locale: LessonVoiceLocale,
  node: MdxNode,
  rules: readonly LessonVoiceRule[],
  source: string,
  issues: LessonVoiceIssue[]
): void {
  const selectedAddressRules = addressRules(rules);
  const localState = {
    germanPersonalAntecedent: false,
    germanPossessiveAntecedent: false,
    quotationRanges: multilineQuotationRanges(source),
  };
  for (const child of node.children ?? []) {
    issues.push(
      ...matchRangeRules(
        locale,
        source,
        child.position,
        selectedAddressRules,
        false,
        localState.quotationRanges
      )
    );
    collectNodeIssues(
      locale,
      child,
      selectedAddressRules,
      source,
      issues,
      localState
    );
  }
}

/** Prevents an antecedent from leaking into a newly headed section. */
function resetAntecedentAtHeading(node: MdxNode, state: ProseState): void {
  if (node.type !== "heading") {
    return;
  }
  state.germanPersonalAntecedent = false;
  state.germanPossessiveAntecedent = false;
}

/** Checks paragraph-opening German pronouns against the prior prose state. */
function collectParagraphAddressIssues(
  locale: LessonVoiceLocale,
  node: MdxNode,
  rules: readonly LessonVoiceRule[],
  source: string,
  issues: LessonVoiceIssue[],
  state: ProseState
): void {
  if (node.type !== "paragraph") {
    return;
  }
  issues.push(
    ...matchUnanchoredGermanAddress(locale, source, node.position, rules, {
      allowPersonalAddress: !state.germanPersonalAntecedent,
      allowPossessiveAddress: !state.germanPossessiveAntecedent,
      continueEstablishedAddress: true,
      quotationRanges: state.quotationRanges,
    })
  );
}

/** Records the nearest prose antecedent while owned components stay neutral. */
function updateAntecedentAfterParagraph(
  node: MdxNode,
  source: string,
  state: ProseState
): void {
  if (node.type !== "paragraph") {
    return;
  }
  const start = node.position?.start?.offset;
  const end = node.position?.end?.offset;
  const antecedent =
    start === undefined || end === undefined
      ? { personal: false, possessive: false }
      : germanAntecedentState(source.slice(start, end));
  state.germanPersonalAntecedent = antecedent.personal;
  state.germanPossessiveAntecedent = antecedent.possessive;
}

/** Collects AST-scoped learner-copy matches while preserving protected syntax. */
function collectNodeIssues(
  locale: LessonVoiceLocale,
  node: MdxNode,
  rules: readonly LessonVoiceRule[],
  source: string,
  issues: LessonVoiceIssue[],
  state: ProseState,
  isProtected = false,
  paragraphStart?: number,
  insideJsx = false
): void {
  if (!isProtected && node.type === "blockquote") {
    collectBlockquoteIssues(locale, node, rules, source, issues);
    return;
  }
  if (!isProtected && LINK_NODE_TYPES.has(node.type ?? "")) {
    const linkRules = rules.filter(
      ({ inspectLinkLabels }) => inspectLinkLabels
    );
    collectLinkLabelIssues(
      locale,
      node,
      linkRules,
      source,
      issues,
      state,
      paragraphStart
    );
    return;
  }
  if (!isProtected && IMAGE_NODE_TYPES.has(node.type ?? "")) {
    collectImageAltIssues(locale, node, rules, source, issues, state);
    return;
  }
  const protectedHere = isProtectedNode(node, isProtected);
  const jsxHere =
    insideJsx ||
    node.type === "mdxJsxFlowElement" ||
    node.type === "mdxJsxTextElement";
  if (!protectedHere) {
    resetAntecedentAtHeading(node, state);
    collectParagraphAddressIssues(locale, node, rules, source, issues, state);
    if (insideJsx) {
      collectTextAddressIssues(locale, node, rules, source, issues, state);
    }
    collectParagraphIssues(locale, node, rules, source, issues, state);
    collectAttributeIssues(locale, node, rules, source, issues, state);
    collectRenderedExpressionIssues(locale, node, rules, source, issues, state);
  }
  for (const child of node.children ?? []) {
    collectNodeIssues(
      locale,
      child,
      rules,
      source,
      issues,
      state,
      protectedHere,
      node.type === "paragraph" ? node.position?.start?.offset : paragraphStart,
      jsxHere
    );
  }
  if (!protectedHere && node.type === "paragraph") {
    updateAntecedentAfterParagraph(node, source, state);
  }
}

/** Adds AST-scoped matches that the source-line pass cannot see safely. */
export function findVisibleProseRuleIssues(
  locale: LessonVoiceLocale,
  source: string,
  tree: MdxNode,
  rules: readonly LessonVoiceRule[]
): LessonVoiceIssue[] {
  const issues: LessonVoiceIssue[] = [];
  const selectedAddressRules = addressRules(rules);
  const state = {
    germanPersonalAntecedent: false,
    germanPossessiveAntecedent: false,
    quotationRanges: multilineQuotationRanges(source),
  };
  for (const range of metadataAddressRanges(tree, source)) {
    issues.push(
      ...matchRangeRules(
        locale,
        source,
        range,
        rules,
        false,
        state.quotationRanges
      ),
      ...matchUnanchoredGermanAddress(
        locale,
        source,
        range,
        selectedAddressRules,
        { quotationRanges: state.quotationRanges }
      )
    );
  }
  collectNodeIssues(locale, tree, rules, source, issues, state);
  return issues;
}
