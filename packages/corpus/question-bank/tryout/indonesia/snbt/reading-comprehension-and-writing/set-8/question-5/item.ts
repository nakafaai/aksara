import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "inference",
  },
  stimulus: "rattan-weaving",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Anak muda tetap tinggal di desa untuk menganyam rotan.",
        },
        {
          correct: false,
          label: "Tas rotan dari desa itu dijual lebih mahal.",
        },
        {
          correct: false,
          label: "Pembeli dari kota besar datang langsung ke desa.",
        },
        {
          correct: true,
          label:
            "Kerajinan rotan di desa itu makin terancam hilang ketika perajin tua tidak lagi mampu bekerja.",
        },
        {
          correct: false,
          label: "Perajin tua mengajar menganyam di pabrik di kota.",
        },
      ],
    },
  },
};

export default item;
