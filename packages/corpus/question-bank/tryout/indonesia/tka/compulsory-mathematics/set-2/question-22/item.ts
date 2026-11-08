import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "daily-temperature",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Lebih dari $$40\\,\\%$$ hari bersuhu maksimum di atas rata-rata.",
        },
        {
          correct: true,
          label: "Median data sama dengan modusnya.",
        },
        {
          correct: false,
          label: "Rata-rata data lebih kecil daripada mediannya.",
        },
        {
          correct: true,
          label:
            "Ada tepat $$3$$ hari yang suhu maksimumnya di bawah $$32^\\circ\\text{C}$$.",
        },
        {
          correct: false,
          label: "Jangkauan data adalah $$5^\\circ\\text{C}$$.",
        },
      ],
    },
  },
};

export default item;
