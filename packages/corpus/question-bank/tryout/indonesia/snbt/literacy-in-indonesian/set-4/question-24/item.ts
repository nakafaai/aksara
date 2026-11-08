import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "banda-nutmeg",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Belanda menyesal telah melepaskan New Amsterdam kepada Inggris di Amerika Utara.",
        },
        {
          correct: false,
          label:
            "New Amsterdam lebih banyak menghasilkan pala daripada Pulau Run.",
        },
        {
          correct: true,
          label:
            "Penilaian atas sebuah tempat dapat berubah jauh dari zaman ke zaman.",
        },
        {
          correct: false,
          label:
            "Pulau Run masih menjadi pusat perdagangan pala dunia hingga kini.",
        },
        {
          correct: false,
          label:
            "Inggris tidak pernah tertarik pada perdagangan rempah di Maluku.",
        },
      ],
    },
  },
};

export default item;
