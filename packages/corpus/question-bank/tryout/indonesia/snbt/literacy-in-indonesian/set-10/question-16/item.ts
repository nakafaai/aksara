import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "fuel-subsidy",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$17\\%$$ dan $$23\\%$$, jadi kelompok keempat lebih terbebani",
        },
        {
          correct: false,
          label:
            "Rp$$1{,}7$$ juta dan Rp$$2{,}3$$ juta, jadi kelompok keempat lebih terbebani",
        },
        {
          correct: false,
          label:
            "sekitar $$3{,}8\\%$$ dan $$3{,}3\\%$$, jadi kelompok keempat lebih terbebani",
        },
        {
          correct: false,
          label:
            "sekitar $$37{,}8\\%$$ dan $$32{,}9\\%$$, jadi kelompok tengah lebih terbebani",
        },
        {
          correct: true,
          label:
            "sekitar $$3{,}8\\%$$ dan $$3{,}3\\%$$, jadi kelompok tengah lebih terbebani",
        },
      ],
    },
  },
};

export default item;
