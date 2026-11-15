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
            "Lebih banyak pengunjung berhenti di stan $$24$$ rasa daripada di stan $$6$$ rasa.",
        },
        {
          column: 1,
          label:
            "Di antara pengunjung yang berhenti, yang membeli di stan $$6$$ rasa kira-kira sepuluh kali lebih sering daripada di stan $$24$$ rasa.",
        },
        {
          column: 2,
          label:
            "Meta-analisis 2010 menemukan bahwa banyak pilihan selalu menurunkan pembelian.",
        },
        {
          column: 1,
          label:
            "Hasil percobaan selai belum tentu berlaku untuk pilihan yang mudah dibandingkan.",
        },
      ],
    },
  },
};

export default item;
