import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "thomas-cup-1958",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Indonesia memenangi Piala Thomas 1958 hanya karena semangat juang para pemainnya yang luar biasa.",
        },
        {
          correct: true,
          label:
            "Kemenangan 1958 lahir dari semangat yang bertemu dengan pembinaan panjang di klub-klub bulu tangkis.",
        },
        {
          correct: false,
          label:
            "Kemenangan 1958 tidak berarti apa-apa di luar olahraga, karena hanya menyangkut satu kejuaraan.",
        },
        {
          correct: false,
          label:
            "Malaya kalah pada 1958 karena regu itu sudah terlalu lama menjadi juara dan kehilangan semangat.",
        },
        {
          correct: false,
          label:
            "PBSI adalah satu-satunya lembaga yang menyiapkan pemain Indonesia untuk Piala Thomas 1958.",
        },
      ],
    },
  },
};

export default item;
