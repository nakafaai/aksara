import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "theme-message",
  },
  stimulus: "wall-clock",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "akhirnya tahu bahwa pendengaran Kakek sudah lemah",
        },
        {
          correct: false,
          label: "ingin menghentikan kebiasaan memutar jam setiap Senin",
        },
        {
          correct: false,
          label:
            "merasa terpaksa menggantikan tugas yang dulu selalu dikerjakan Kakek",
        },
        {
          correct: true,
          label:
            "mulai merasakan makna kebiasaan itu setelah menjalaninya sendiri",
        },
        {
          correct: false,
          label: "baru mengetahui jumlah putaran jam yang benar dari Ibu",
        },
      ],
    },
  },
};

export default item;
