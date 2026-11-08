import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "plot-function",
  },
  stimulus: "mobile-library",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Dimas kehilangan minat pada hewan laut dan beralih ke hewan darat",
        },
        {
          correct: false,
          label: "Wulan berhenti membawa buku ikan paus karena sampulnya lepas",
        },
        {
          correct: true,
          label:
            "Dimas kini cukup mampu dan berani membaca buku yang belum ia kenal",
        },
        {
          correct: false,
          label:
            "gurita adalah hewan laut yang lebih disukai anak-anak di dusun itu",
        },
        {
          correct: false,
          label:
            "Dimas mungkin masih berpura-pura membaca dengan buku yang baru",
        },
      ],
    },
  },
};

export default item;
