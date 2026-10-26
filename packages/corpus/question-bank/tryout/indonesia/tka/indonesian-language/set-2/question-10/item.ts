import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "emotional-response",
  },
  stimulus: "last-broadcast",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "kecewa karena Dara menghancurkan arsip",
        },
        {
          correct: false,
          label:
            "cemas karena pemindahan kaset dapat memutus konteks dari ruang siaran lama",
        },
        {
          correct: false,
          label: "marah karena laboratorium bahasa dibatalkan",
        },
        {
          correct: true,
          label:
            "optimistis karena sebuah media dapat berubah bentuk tanpa kehilangan ingatannya",
        },
        {
          correct: false,
          label:
            "ragu karena arsip digital belum menjamin konteks suara lama terpelihara",
        },
      ],
    },
  },
};

export default item;
