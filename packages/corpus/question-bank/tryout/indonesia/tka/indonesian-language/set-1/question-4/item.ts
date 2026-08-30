import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "keduanya membandingkan dua jenis laboratorium",
        },
        {
          isCorrect: false,
          label:
            "paragraf kedua berisi simpulan, paragraf ketiga berisi definisi",
        },
        {
          isCorrect: true,
          label:
            "paragraf kedua menyatakan masalah, paragraf ketiga menunjukkan dampak perbaikannya",
        },
        {
          isCorrect: false,
          label: "keduanya menjelaskan alasan program dihentikan",
        },
        {
          isCorrect: false,
          label: "paragraf kedua menolak gagasan pada paragraf ketiga",
        },
      ],
    },
  },
  stimulusKey: "seed-library",
};

export default item;
