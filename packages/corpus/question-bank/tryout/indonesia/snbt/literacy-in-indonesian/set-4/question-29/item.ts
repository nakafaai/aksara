import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "choice-overload",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Dari jumlah pengunjung lewat yang sama, stan $$24$$ rasa menghentikan lebih banyak pengunjung, tetapi menghasilkan lebih sedikit pembeli daripada stan $$6$$ rasa.",
        },
        {
          column: 2,
          label:
            "Stan $$24$$ rasa menghentikan dua kali lebih banyak pengunjung daripada stan $$6$$ rasa.",
        },
        {
          column: 2,
          label:
            "Meta-analisis 2010 menunjukkan bahwa banyaknya pilihan tidak pernah memengaruhi pembelian.",
        },
        {
          column: 1,
          label:
            "Menurut meta-analisis 2015, orang yang sudah tahu apa yang ia inginkan lebih kecil kemungkinannya mengalami kelebihan pilihan.",
        },
        {
          column: 2,
          label:
            "Penulis menyimpulkan bahwa percobaan selai keliru dan perlu diabaikan.",
        },
      ],
    },
  },
};

export default item;
