import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "paragraph-relation",
  },
  stimulus: "karst",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Kalimat (6) menyatakan gagasan umum yang dijelaskan dengan contoh pada kalimat (7) dan (8).",
        },
        {
          correct: false,
          label:
            "Kalimat (6) menyimpulkan seluruh isi paragraf pertama tentang terbentuknya karst.",
        },
        {
          correct: false,
          label:
            "Kalimat (6) membantah manfaat sungai bawah tanah yang disebut pada kalimat (5).",
        },
        {
          correct: false,
          label:
            "Kalimat (6) memberikan contoh dari pernyataan umum pada kalimat (7).",
        },
        {
          correct: false,
          label:
            "Kalimat (6) mengulang isi kalimat (9) dengan kata-kata yang lebih singkat, lebih jelas, dan lebih mudah diingat.",
        },
      ],
    },
  },
};

export default item;
