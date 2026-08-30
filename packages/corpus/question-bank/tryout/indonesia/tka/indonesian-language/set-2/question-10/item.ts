import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "emotional-response",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "kecewa karena Dara menghancurkan arsip",
        },
        {
          isCorrect: true,
          label:
            "optimistis karena sebuah media dapat berubah bentuk tanpa kehilangan ingatannya",
        },
        {
          isCorrect: false,
          label: "takut karena sekolah kehilangan semua suara lama",
        },
        {
          isCorrect: false,
          label: "marah karena laboratorium bahasa dibatalkan",
        },
        {
          isCorrect: false,
          label: "bosan karena tidak ada keputusan baru",
        },
      ],
    },
  },
  stimulusKey: "last-broadcast",
};

export default item;
