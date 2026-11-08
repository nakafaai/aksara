import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "main-idea",
  },
  stimulus: "tsunami",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Semua gempa bumi di bawah laut menimbulkan tsunami besar.",
        },
        {
          correct: false,
          label:
            "Gempa yang sangat dalam selalu menimbulkan tsunami paling tinggi.",
        },
        {
          correct: false,
          label: "Letusan gunung api adalah penyebab utama tsunami di dunia.",
        },
        {
          correct: false,
          label: "Tsunami hanya dapat dipicu oleh gempa bumi.",
        },
        {
          correct: true,
          label:
            "Tsunami terutama terbentuk karena dasar laut naik atau turun secara tiba-tiba, sehingga tidak semua gempa bawah laut menimbulkannya.",
        },
      ],
    },
  },
};

export default item;
