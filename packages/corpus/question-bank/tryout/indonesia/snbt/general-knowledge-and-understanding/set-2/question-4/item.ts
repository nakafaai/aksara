import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "inference",
  },
  stimulus: "delta",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Delta dapat mundur ke arah daratan walaupun sungainya masih membawa sedimen sampai ke muara.",
        },
        {
          column: 2,
          label:
            "Di air asin, lempung yang sangat halus mengendap lebih dekat ke mulut sungai daripada butir pasir.",
        },
        {
          column: 2,
          label:
            "Permukaan delta turun hanya jika air tanah di bawahnya diambil secara berlebihan.",
        },
        {
          column: 1,
          label:
            "Delta di pantai yang gelombangnya kuat tetap tersusun dari sedimen yang dibawa sungai.",
        },
      ],
    },
  },
};

export default item;
