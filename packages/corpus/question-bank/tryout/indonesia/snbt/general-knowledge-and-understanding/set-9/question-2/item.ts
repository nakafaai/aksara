import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "cause",
  },
  stimulus: "tenun",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "agar bagian itu tidak menyerap pewarna",
        },
        {
          correct: false,
          label: "agar benang tidak putus ketika ditenun menjadi kain",
        },
        {
          correct: false,
          label: "agar warna pada benang lebih cepat kering",
        },
        {
          correct: false,
          label: "agar benang lebih mudah dibentangkan pada bingkai",
        },
        {
          correct: false,
          label: "agar motif kain tidak dapat ditiru oleh orang lain",
        },
      ],
    },
  },
};

export default item;
