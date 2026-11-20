import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/ai-ds/ai-programming",
  domain: "ai-ds",
  key: "lesson.ai-ds.ai-programming",
  kind: "lesson",
  routeSlugs: {
    en: "ai-programming",
    id: "pemrograman-ai",
    de: "ki-programmierung",
    ms: "pengaturcaraan-ai",
  },
  sections: [
    "arithmetic-operator",
    "array-numpy",
    "array-operation-numpy",
    "attribute-data-type-numpy",
    "comparison-logic",
    "container",
    "control-flow",
    "dictionary",
    "escape-sequence",
    "everything-object-python",
    "file-input-output",
    "function",
    "immutable-mutable-identity",
    "indexing-slicing",
    "indexing-slicing-numpy",
    "iterable",
    "markdown-cli",
    "math-function",
    "number-attribute-method",
    "numbers",
    "print-function",
    "python-step-1",
    "string-formatting",
    "string-method",
    "string-object",
    "syntactic-sugar",
    "variable",
  ],
  slug: "ai-programming",
  translations: {
    en: {
      description: "Use Python arithmetic operators with correct precedence.",
      title: "AI Programming",
    },
    id: {
      description: "Gunakan operator aritmatika Python dengan urutan tepat.",
      title: "Pemrograman AI",
    },
    de: {
      description: "Schreibe Python-Code mit sicheren Rechenregeln.",
      title: "KI-Programmierung",
    },
    ms: {
      description: "Guna operator aritmetik Python dengan keutamaan betul.",
      title: "Pengaturcaraan AI",
    },
  },
};

export default lesson;
