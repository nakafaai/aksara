import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "exam-summary",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Jangkauan nilai kelas XI-2 lebih kecil daripada jangkauan nilai kelas XI-1.",
        },
        {
          correct: true,
          label:
            "Median nilai kelas XI-1 lebih tinggi daripada median nilai kelas XI-2.",
        },
        {
          correct: false,
          label: "Rata-rata nilai kelas XI-1 adalah $$74$$.",
        },
        {
          correct: true,
          label:
            "Tepat $$16$$ siswa kelas XI-1 mendapat nilai lebih dari $$74$$.",
        },
        {
          correct: false,
          label: "Ada siswa kelas XI-2 yang mendapat nilai kurang dari $$50$$.",
        },
      ],
    },
  },
};

export default item;
