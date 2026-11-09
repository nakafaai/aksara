import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "paraphrase",
  },
  stimulus: "karst",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kawasan karst jarang mendapat hujan sehingga permukaannya selalu kering.",
        },
        {
          correct: false,
          label:
            "Air yang tersimpan di bawah kawasan karst lebih banyak daripada air hujan yang turun.",
        },
        {
          correct: false,
          label:
            "Batu kapur menahan air hujan di permukaan selama musim hujan berlangsung.",
        },
        {
          correct: false,
          label:
            "Permukaan kawasan karst kering karena air hujan yang turun di sana bersifat asam.",
        },
        {
          correct: true,
          label:
            "Permukaan yang tampak kering tidak berarti kawasan karst kekurangan air.",
        },
      ],
    },
  },
};

export default item;
