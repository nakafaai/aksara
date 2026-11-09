import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "effective-sentence",
  },
  stimulus: "medicine-return",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Warga cukup membawa obat sisa dalam kemasannya, lalu kotak itu dimasukkan.",
        },
        {
          correct: false,
          label:
            "Warga cukup dibawa obat sisa dalam kemasannya, lalu dimasukkan ke kotak itu.",
        },
        {
          correct: false,
          label:
            "Warga cukup membawa obat sisa dalam kemasannya, lalu dimasukkan ke dalam kotak itu oleh warga.",
        },
        {
          correct: true,
          label:
            "Warga cukup membawa obat sisa dalam kemasannya, lalu memasukkannya ke kotak itu.",
        },
        {
          correct: false,
          label:
            "Warga cukup membawa obat sisa, dalam kemasannya lalu dimasukkan ke kotak itu.",
        },
      ],
    },
  },
};

export default item;
