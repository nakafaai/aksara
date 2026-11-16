import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "rate-of-reaction",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "240 cm³ of oxygen forms, and the mass of manganese(IV) oxide decreases as it reacts",
        },
        {
          correct: false,
          label:
            "120 cm³ of oxygen forms, and the manganese(IV) oxide is used up",
        },
        {
          correct: true,
          label:
            "120 cm³ of oxygen forms, the 0.50 g of manganese(IV) oxide is recovered unchanged, and twice as much catalyst gives the same volume sooner",
        },
        {
          correct: false,
          label:
            "120 cm³ of oxygen forms, and twice as much catalyst would give 240 cm³",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "240 cm³ oksigen terbentuk, dan jisim mangan(IV) oksida berkurang semasa bertindak balas",
        },
        {
          correct: false,
          label:
            "120 cm³ oksigen terbentuk, dan mangan(IV) oksida habis digunakan",
        },
        {
          correct: true,
          label:
            "120 cm³ oksigen terbentuk, 0.50 g mangan(IV) oksida diperoleh semula tanpa berubah, dan dua kali ganda mangkin memberikan isi padu yang sama lebih cepat",
        },
        {
          correct: false,
          label:
            "120 cm³ oksigen terbentuk, dan dua kali ganda mangkin akan memberikan 240 cm³",
        },
      ],
    },
  },
};

export default item;
