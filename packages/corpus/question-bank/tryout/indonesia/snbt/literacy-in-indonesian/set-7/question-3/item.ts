import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "gut-bacteria",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Tikus tanpa bakteri tidak dapat menjadi gemuk walaupun diberi banyak makanan.",
        },
        {
          correct: false,
          label:
            "Tikus tanpa bakteri jauh lebih murah dipelihara daripada tikus yang memiliki bakteri.",
        },
        {
          correct: false,
          label:
            "Peneliti ingin mengetahui jenis makanan yang paling disukai tikus kurus.",
        },
        {
          correct: true,
          label:
            "Tikus itu menguji apakah bakteri sendiri mengubah tubuh, bukan sekadar menyertai.",
        },
        {
          correct: false,
          label:
            "Tikus tanpa bakteri mungkin lebih jarang terkena infeksi *C. difficile*.",
        },
      ],
    },
  },
};

export default item;
