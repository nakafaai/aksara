import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "quantifiers",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Kapal Bahari tidak berlayar ke Kepulauan Seribu malam ini.",
        },
        {
          correct: false,
          label: "Kapal Bahari membawa pelampung tambahan malam ini.",
        },
        {
          correct: false,
          label:
            "Semua kapal yang mengangkut sepeda motor berlayar ke Kepulauan Seribu.",
        },
        {
          correct: false,
          label:
            "Kapal Bahari tidak mengangkut barang apa pun selain sepeda motor.",
        },
        {
          correct: false,
          label:
            "Sebagian kapal yang membawa pelampung tambahan mengangkut sepeda motor.",
        },
      ],
    },
  },
};

export default item;
