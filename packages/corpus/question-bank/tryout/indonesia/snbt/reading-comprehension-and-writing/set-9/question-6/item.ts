import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Label terbukti menjadi satu-satunya penyebab nilai yang lebih tinggi.",
        },
        {
          isCorrect: false,
          label: "Setiap relawan mengalami peningkatan yang sama.",
        },
        {
          isCorrect: false,
          label: "Nilai awal dan pembanding sama.",
        },
        {
          isCorrect: false,
          label:
            "Uji tersebut menetapkan hasil jangka panjang untuk seluruh pembibitan.",
        },
        {
          isCorrect: true,
          label:
            "Nilai bibit yang sampai tanpa dialihkan pada hari uji melebihi nilai awal dan pembanding.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
