import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-comparison",
  },
  stimulus: "electric-cars",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "penilaian tentang ke mana dana insentif sebaiknya diarahkan",
        },
        {
          correct: false,
          label:
            "pengakuan bahwa pembuatan baterai mobil listrik menghasilkan emisi",
        },
        {
          correct: false,
          label:
            "anggapan bahwa motor listrik lebih boros energi daripada mesin bensin",
        },
        {
          correct: false,
          label:
            "keyakinan bahwa emisi mobil listrik sama persis dengan mobil bensin",
        },
        {
          correct: false,
          label:
            "kemungkinan bahwa listrik bersih tidak pernah tersedia di negara itu",
        },
      ],
    },
  },
};

export default item;
