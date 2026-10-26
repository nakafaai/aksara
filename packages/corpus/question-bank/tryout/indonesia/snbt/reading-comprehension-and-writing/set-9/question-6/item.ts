import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Label terbukti menjadi satu-satunya penyebab nilai yang lebih tinggi.",
        },
        {
          correct: false,
          label: "Setiap relawan mengalami peningkatan yang sama.",
        },
        {
          correct: false,
          label: "Nilai awal dan pembanding sama.",
        },
        {
          correct: false,
          label:
            "Uji tersebut menetapkan hasil jangka panjang untuk seluruh pembibitan.",
        },
        {
          correct: true,
          label:
            "Nilai bibit yang sampai tanpa dialihkan pada hari uji melebihi nilai awal dan pembanding.",
        },
      ],
    },
  },
};

export default item;
