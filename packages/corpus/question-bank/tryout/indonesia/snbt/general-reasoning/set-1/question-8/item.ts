import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "parallel-argument",
  },
  stimulus: "jalur",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Semua gang yang diberi lampu jalan di kelurahan itu mengalami penurunan kasus pencurian. Gang Kenanga termasuk gang yang diberi lampu jalan. Jadi, pencurian di Gang Kenanga menurun.",
        },
        {
          correct: false,
          label:
            "Jika lampu jalan dipasang, pencurian berkurang. Pencurian di Gang Mawar tidak berkurang. Jadi, lampu jalan tidak dipasang di Gang Mawar.",
        },
        {
          correct: true,
          label:
            "Sejak lampu jalan dipasang di Gang Melati, kasus pencurian di gang itu berkurang. Jadi, memasang lampu jalan di semua gang akan mengurangi pencurian di seluruh kelurahan.",
        },
        {
          correct: false,
          label:
            "Di setiap gang yang diberi lampu jalan, pencurian berkurang. Jadi, lampu jalan mungkin ikut menekan pencurian.",
        },
        {
          correct: false,
          label:
            "Pencurian di Gang Melati berkurang setelah ronda malam dimulai. Jadi, ronda malam lebih efektif daripada lampu jalan.",
        },
      ],
    },
  },
};

export default item;
