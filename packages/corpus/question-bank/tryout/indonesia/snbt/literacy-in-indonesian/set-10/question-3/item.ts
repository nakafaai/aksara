import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "coral-bleaching",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Jeda yang pendek membuat alga lain tidak sempat tumbuh di terumbu.",
        },
        {
          correct: true,
          label: "Karang belum sempat pulih sebelum panas berikutnya datang.",
        },
        {
          correct: false,
          label: "Jeda yang pendek menurunkan suhu air laut secara mendadak.",
        },
        {
          correct: false,
          label:
            "Karang membutuhkan pemutihan berulang agar dapat bertahan hidup.",
        },
        {
          correct: false,
          label:
            "Anak karang tumbuh terlalu cepat sehingga terumbu menjadi rapuh.",
        },
      ],
    },
  },
};

export default item;
