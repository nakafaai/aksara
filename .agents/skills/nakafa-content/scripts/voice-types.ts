import {
  APP_LOCALE_CODES,
  type AppLocaleCode,
} from "@nakafa/aksara-contracts/locale";

export const LESSON_VOICE_LOCALES = APP_LOCALE_CODES;

export type LessonVoiceLocale = AppLocaleCode;

export interface LessonVoiceRule {
  id: string;
  patterns: Partial<Record<LessonVoiceLocale, RegExp>>;
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
  return (LESSON_VOICE_LOCALES as readonly string[]).includes(locale);
}
