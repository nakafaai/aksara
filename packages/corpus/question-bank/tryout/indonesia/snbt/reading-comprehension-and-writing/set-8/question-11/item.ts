import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "author-purpose",
  },
  stimulus: "jamu-label",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "menceritakan usaha seorang penjual jamu mengembangkan dagangannya melalui pengemasan dan pelabelan",
        },
        {
          correct: false,
          label: "menjelaskan resep jamu kunyit asam dan beras kencur",
        },
        {
          correct: false,
          label: "mengajak pelajar minum jamu setiap hari",
        },
        {
          correct: false,
          label: "membandingkan jamu dengan minuman kemasan buatan pabrik",
        },
        {
          correct: false,
          label: "mengkritik dinas koperasi yang jarang mengadakan pelatihan",
        },
      ],
    },
  },
};

export default item;
