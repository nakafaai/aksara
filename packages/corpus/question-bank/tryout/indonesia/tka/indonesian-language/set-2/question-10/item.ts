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
          isCorrect: false,
          label:
            "cemas karena pemindahan kaset dapat memutus konteks dari ruang siaran lama",
        },
        {
          isCorrect: false,
          label: "marah karena laboratorium bahasa dibatalkan",
        },
        {
          isCorrect: true,
          label:
            "optimistis karena sebuah media dapat berubah bentuk tanpa kehilangan ingatannya",
        },
        {
          isCorrect: false,
          label:
            "ragu karena arsip digital belum menjamin konteks suara lama terpelihara",
        },
      ],
    },
  },
  stimulusKey: "last-broadcast",
};

export default item;
