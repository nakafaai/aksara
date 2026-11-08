import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "bandung-conference",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "semua peserta konferensi sebenarnya mendukung blok Uni Soviet",
        },
        {
          correct: true,
          label:
            "peserta konferensi tidak selalu sepakat walaupun memiliki tujuan bersama",
        },
        {
          correct: false,
          label:
            "konferensi itu dibatalkan sebelum Dasasila Bandung disepakati",
        },
        {
          correct: false,
          label:
            "Eropa Timur menjadi salah satu peserta Konferensi Asia Afrika",
        },
        {
          correct: false,
          label:
            "negara-negara Afrika tidak diizinkan berbicara sama sekali dalam konferensi itu",
        },
      ],
    },
  },
};

export default item;
