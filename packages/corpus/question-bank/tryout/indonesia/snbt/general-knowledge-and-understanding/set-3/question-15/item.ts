import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "inference",
  },
  stimulus: "beber",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Jika dua pertunjukan berlangsung sama lama, keduanya membentangkan gulungan yang sama.",
        },
        {
          correct: false,
          label:
            "Jika dua dalang membentangkan seluruh adegan dari gulungan yang sama, tuturan mereka tentang setiap adegan sama panjang.",
        },
        {
          correct: true,
          label:
            "Jika urutan adegan dalam dua pertunjukan berbeda, kedua pertunjukan itu tidak membentangkan seluruh adegan dari satu gulungan yang sama.",
        },
        {
          correct: false,
          label:
            "Jika dua dalang membentangkan gulungan yang sama, percakapan antartokoh yang mereka tuturkan sama persis.",
        },
        {
          correct: false,
          label:
            "Jika sebuah gulungan dibuat dari daluang, gulungan itu adalah gulungan warisan yang disimpan sebagai pusaka.",
        },
      ],
    },
  },
};

export default item;
