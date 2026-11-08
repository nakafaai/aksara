import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "conflict",
  },
  stimulus: "sewing-machine",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Persaingan antara Sekar dan ibunya dalam mewarisi keahlian Mbah Darsih.",
        },
        {
          correct: false,
          label: "Perebutan mesin jahit tua antara Mbah Darsih dan Sekar.",
        },
        {
          correct: false,
          label: "Penolakan Mbah Darsih terhadap segala bentuk teknologi baru.",
        },
        {
          correct: true,
          label:
            "Pertentangan antara dorongan memenuhi pesanan dengan cepat dan keteguhan menjaga mutu kerja tangan.",
        },
        {
          correct: false,
          label: "Kesulitan Sekar mendapatkan pembeli bagi kebaya neneknya.",
        },
      ],
    },
  },
};

export default item;
