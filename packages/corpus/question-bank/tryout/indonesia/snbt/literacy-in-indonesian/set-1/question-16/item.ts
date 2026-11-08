import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "food-waste",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Rencana itu keliru karena sayur, bukan nasi, menghasilkan jumlah sisa makanan terbesar.",
        },
        {
          correct: false,
          label:
            "Rencana itu tidak didukung data karena nasi hanya menyumbang kurang dari seperempat seluruh sisa makanan.",
        },
        {
          correct: false,
          label:
            "Rencana itu tepat karena seluruh sisa nasi dapat dihindari dengan perencanaan porsi.",
        },
        {
          correct: true,
          label:
            "Rencana itu sejalan dengan data karena nasi menyumbang sisa terhindarkan terbesar, tetapi tidak menyentuh sisa sayur yang terbuang karena layu.",
        },
        {
          correct: false,
          label:
            "Rencana itu sebaiknya diganti dengan kampanye buah karena buah menghasilkan sisa tak terhindarkan terbesar.",
        },
      ],
    },
  },
};

export default item;
