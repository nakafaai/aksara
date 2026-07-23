import { aiProgrammingData } from "#corpus/material/lesson/ai-ds/ai-programming/data";
import { aiProgrammingNumpy } from "#corpus/material/lesson/ai-ds/ai-programming/numpy";
import { aiProgrammingSyntax } from "#corpus/material/lesson/ai-ds/ai-programming/syntax";
import { aiProgrammingTools } from "#corpus/material/lesson/ai-ds/ai-programming/tools";
import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonAiDsAiProgrammingMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/ai-ds/ai-programming",
  domain: "ai-ds",
  key: "lesson.ai-ds.ai-programming",
  kind: "lesson",
  routeSlugs: { en: "ai-programming", id: "pemrograman-ai" },
  sections: [
    aiProgrammingSyntax.arithmeticOperator,
    aiProgrammingNumpy.arrayNumpy,
    aiProgrammingNumpy.arrayOperationNumpy,
    aiProgrammingNumpy.attributeDataTypeNumpy,
    aiProgrammingSyntax.comparisonLogic,
    aiProgrammingData.container,
    aiProgrammingSyntax.controlFlow,
    aiProgrammingData.dictionary,
    aiProgrammingSyntax.escapeSequence,
    aiProgrammingData.everythingObjectPython,
    aiProgrammingTools.fileInputOutput,
    aiProgrammingSyntax.function,
    aiProgrammingData.immutableMutableIdentity,
    aiProgrammingData.indexingSlicing,
    aiProgrammingNumpy.indexingSlicingNumpy,
    aiProgrammingData.iterable,
    aiProgrammingTools.markdownCli,
    aiProgrammingTools.mathFunction,
    aiProgrammingData.numberAttributeMethod,
    aiProgrammingData.numbers,
    aiProgrammingSyntax.printFunction,
    aiProgrammingSyntax.pythonStep1,
    aiProgrammingData.stringFormatting,
    aiProgrammingData.stringMethod,
    aiProgrammingData.stringObject,
    aiProgrammingSyntax.syntacticSugar,
    aiProgrammingSyntax.variable,
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
  },
});
