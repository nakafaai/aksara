import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "batik-wax",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Motifnya selalu berbeda dari motif batik tradisional yang asli dan lama.",
        },
        {
          correct: false,
          label: "Harganya lebih mahal daripada batik tulis maupun batik cap.",
        },
        {
          correct: false,
          label:
            "Kain itu tidak diakui UNESCO karena dibuat di luar Indonesia.",
        },
        {
          correct: true,
          label:
            "Kain itu dibuat tanpa malam, padahal batik ditentukan oleh teknik malam.",
        },
        {
          correct: false,
          label: "Warnanya tidak dapat bertahan lama setelah kain itu dicuci.",
        },
      ],
    },
  },
};

export default item;
