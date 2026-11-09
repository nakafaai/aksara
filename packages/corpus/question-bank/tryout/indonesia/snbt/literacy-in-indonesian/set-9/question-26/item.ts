import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "batik-wax",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "menyatakan bahwa motif batik tidak penting sama sekali bagi UNESCO",
        },
        {
          correct: true,
          label:
            "memperkuat gagasan awal bahwa batik ditentukan oleh cara membuatnya",
        },
        {
          correct: false,
          label:
            "menjelaskan alasan harga batik tulis lebih mahal daripada batik cap",
        },
        {
          correct: false,
          label: "menyarankan agar pembatik berhenti membuat motif yang baru",
        },
        {
          correct: false,
          label: "mengkritik UNESCO karena terlambat mengakui batik Indonesia",
        },
      ],
    },
  },
};

export default item;
