import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "main-idea",
  },
  stimulus: "lebah",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Lebah madu lebih penting daripada lebah liar bagi petani.",
        },
        {
          correct: false,
          label: "Pestisida adalah satu-satunya penyebab berkurangnya lebah.",
        },
        {
          correct: false,
          label: "Peternak lebah harus memeriksa koloninya setiap hari.",
        },
        {
          correct: false,
          label: "Populasi lebah menurun di semua negara.",
        },
        {
          correct: true,
          label:
            "Populasi lebah menurun karena beberapa penyebab yang saling berkaitan, sehingga perlindungannya memerlukan berbagai langkah.",
        },
      ],
    },
  },
};

export default item;
