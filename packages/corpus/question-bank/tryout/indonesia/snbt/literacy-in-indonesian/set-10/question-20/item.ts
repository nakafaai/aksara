import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-view",
  },
  stimulus: "artefact-return",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Ia akan menolak seluruh gagasan pengembalian benda budaya rampasan.",
        },
        {
          correct: false,
          label:
            "Ia akan setuju tanpa syarat karena benda itu memang milik bangsa Indonesia.",
        },
        {
          correct: false,
          label:
            "Ia akan mengusulkan agar benda itu dipamerkan di Belanda selamanya.",
        },
        {
          correct: false,
          label:
            "Ia akan meminta agar katalog digital tidak perlu lagi dibuat.",
        },
        {
          correct: true,
          label:
            "Ia akan mengingatkan bahwa tidak semua museum memiliki fasilitas itu.",
        },
      ],
    },
  },
};

export default item;
