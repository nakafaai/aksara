import {
  type AppLocaleCode,
  AppLocaleCodeSchema,
} from "@nakafa/aksara-contracts/locale";
import { Schema } from "effect";
import type { TeachingSectionReview } from "#nakafa-content/body/review";

export type LessonVoiceLocale = AppLocaleCode;

export type LessonVoiceGenre = "article" | "lesson";

export interface LessonVoiceRule {
  id: string;
  inspectLinkLabels?: boolean;
  patterns: Partial<Record<LessonVoiceLocale, RegExp>>;
  protectInlineQuotations?: boolean;
}

export interface SourceIssue {
  column: number;
  excerpt: string;
  rule: string;
}

export interface LessonVoiceIssue extends SourceIssue {
  line: number;
}

export interface LessonVoiceFileIssue extends LessonVoiceIssue {
  file: string;
  locale: LessonVoiceLocale;
}

export interface LessonVoiceReport {
  fileCount: number;
  issues: LessonVoiceFileIssue[];
  pedagogy?: (TeachingSectionReview & {
    file: string;
    locale: LessonVoiceLocale;
  })[];
}

export interface LineState {
  expectsMetadataDescriptionValue: boolean;
  inCodeFence: boolean;
  inMetadata: boolean;
  inTemplateLiteral: boolean;
}

export interface LineContext {
  hasOddBacktickCount: boolean;
  isMetadataDescription: boolean;
  isProtectedRegion: boolean;
}

/** Narrows a file or caller locale to the three lesson locales. */
export function isLessonVoiceLocale(
  locale: string
): locale is LessonVoiceLocale {
  return Schema.is(AppLocaleCodeSchema)(locale);
}
