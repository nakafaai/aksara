import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "information-quality",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "berguna sebagai petunjuk, tetapi tidak menjamin hasil yang sama",
        },
        {
          isCorrect: false,
          label: "selalu akurat karena ditulis oleh penanam",
        },
        {
          isCorrect: false,
          label: "tidak berguna karena bukan hasil laboratorium",
        },
        {
          isCorrect: false,
          label: "hanya boleh dibaca oleh petugas perpustakaan",
        },
        {
          isCorrect: false,
          label: "cukup untuk membuktikan daya tumbuh semua benih",
        },
      ],
    },
  },
  stimulusKey: "seed-library",
};

export default item;
