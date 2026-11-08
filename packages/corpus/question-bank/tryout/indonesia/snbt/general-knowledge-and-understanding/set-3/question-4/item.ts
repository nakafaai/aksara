import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "inference",
  },
  stimulus: "batik",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Pembuatannya tidak memakai malam untuk menghalangi pewarna pada bagian kain tertentu.",
        },
        {
          correct: false,
          label: "Motifnya tidak pernah meniru motif batik tradisional.",
        },
        {
          correct: false,
          label: "Kain itu tidak dapat dipakai untuk pakaian sehari-hari.",
        },
        {
          correct: false,
          label: "Harganya lebih mahal daripada batik tulis.",
        },
        {
          correct: false,
          label:
            "Kain itu tidak diakui oleh UNESCO karena dibuat setelah tahun $$2009$$, ketika batik ditetapkan sebagai warisan budaya.",
        },
      ],
    },
  },
};

export default item;
