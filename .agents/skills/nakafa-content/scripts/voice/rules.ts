import { FLOW_CONTEXT_RULES } from "#nakafa-content/flow/context";
import { FLOW_STYLE_RULES } from "#nakafa-content/flow/style";
import { LANGUAGE_CALQUE_RULES } from "#nakafa-content/language/calque";
import { NAVIGATION_VOICE_RULES } from "#nakafa-content/link/check";
import { TECHNICAL_METAPHOR_RULES } from "#nakafa-content/metaphor/technical";
import { ARTICLE_EVIDENCE_RULES } from "#nakafa-content/prose/article";
import { AI_ARTIFACT_RULES, AI_STYLE_RULES } from "#nakafa-content/prose/tell";
import { ADDRESS_VOICE_RULES } from "#nakafa-content/voice/address";
import { AMBIGUITY_VOICE_RULES } from "#nakafa-content/voice/ambiguity";
import { CLAIM_VOICE_RULES } from "#nakafa-content/voice/claim";
import { CONTRAST_VOICE_RULES } from "#nakafa-content/voice/contrast";
import { DEFECT_VOICE_RULES } from "#nakafa-content/voice/defect";
import { DEMONSTRATIVE_VOICE_RULES } from "#nakafa-content/voice/demonstrative";
import { FLOW_VOICE_RULES } from "#nakafa-content/voice/flow";
import { HEADING_VOICE_RULES } from "#nakafa-content/voice/heading";
import { LANGUAGE_VOICE_RULES } from "#nakafa-content/voice/language";
import { METAPHOR_VOICE_RULES } from "#nakafa-content/voice/metaphor";
import { METHOD_VOICE_RULES } from "#nakafa-content/voice/method";
import { NARRATION_VOICE_RULES } from "#nakafa-content/voice/narration";
import { PEDAGOGY_VOICE_RULES } from "#nakafa-content/voice/pedagogy";
import { POINTER_VOICE_RULES } from "#nakafa-content/voice/pointer";
import { REPORTING_VOICE_RULES } from "#nakafa-content/voice/reporting";
import { TRANSITION_VOICE_RULES } from "#nakafa-content/voice/transition";
import type { LessonVoiceRule } from "#nakafa-content/voice/types";
import { VAGUE_VOICE_RULES } from "#nakafa-content/voice/vague";
import { VISIBILITY_VOICE_RULES } from "#nakafa-content/voice/visibility";

export const LESSON_VOICE_RULES = [
  ...ADDRESS_VOICE_RULES,
  ...AI_ARTIFACT_RULES,
  ...AI_STYLE_RULES,
  ...DEFECT_VOICE_RULES,
  ...METAPHOR_VOICE_RULES,
  ...TECHNICAL_METAPHOR_RULES,
  ...METHOD_VOICE_RULES,
  ...TRANSITION_VOICE_RULES,
  ...CLAIM_VOICE_RULES,
  ...CONTRAST_VOICE_RULES,
  ...DEMONSTRATIVE_VOICE_RULES,
  ...FLOW_VOICE_RULES,
  ...FLOW_CONTEXT_RULES,
  ...FLOW_STYLE_RULES,
  ...HEADING_VOICE_RULES,
  ...LANGUAGE_VOICE_RULES,
  ...LANGUAGE_CALQUE_RULES,
  ...NAVIGATION_VOICE_RULES,
  ...AMBIGUITY_VOICE_RULES,
  ...REPORTING_VOICE_RULES,
  ...VISIBILITY_VOICE_RULES,
  ...NARRATION_VOICE_RULES,
  ...VAGUE_VOICE_RULES,
  ...PEDAGOGY_VOICE_RULES,
  ...POINTER_VOICE_RULES,
] satisfies readonly LessonVoiceRule[];

/**
 * Uses a professional article register. Lesson choreography and teacher-only
 * narrative heuristics stay out because an article is not a classroom script.
 */
export const ARTICLE_VOICE_RULES = [
  ...ADDRESS_VOICE_RULES,
  ...AI_ARTIFACT_RULES,
  ...AI_STYLE_RULES,
  ...ARTICLE_EVIDENCE_RULES,
  ...DEFECT_VOICE_RULES,
  ...CLAIM_VOICE_RULES,
  ...AMBIGUITY_VOICE_RULES,
  ...HEADING_VOICE_RULES,
  ...LANGUAGE_VOICE_RULES,
  ...NAVIGATION_VOICE_RULES,
] satisfies readonly LessonVoiceRule[];

// Worked answers analyze assessed passages. Lesson narrative rules such as
// "central idea", "the next section", and "not only" cannot distinguish the
// passage's meaning from an empty teaching aside. Keep objective authored-copy
// rules here; the complete answer and its prompt own the pedagogical review.
export const ANSWER_VOICE_RULES = [
  ...ADDRESS_VOICE_RULES,
  ...AI_ARTIFACT_RULES,
  ...DEFECT_VOICE_RULES,
  ...HEADING_VOICE_RULES,
  ...LANGUAGE_VOICE_RULES,
  ...NAVIGATION_VOICE_RULES,
] satisfies readonly LessonVoiceRule[];
