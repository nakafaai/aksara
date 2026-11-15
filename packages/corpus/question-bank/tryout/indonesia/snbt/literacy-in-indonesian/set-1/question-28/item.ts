import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "bystander-effect",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$4$$ orang" },
        { correct: false, label: "$$3$$ orang" },
        { correct: false, label: "$$5$$ orang" },
        { correct: false, label: "$$2$$ orang" },
        {
          correct: false,
          label:
            "Tidak ada, karena peluang setiap orang dalam kerumunan lebih kecil daripada $$80\\%$$.",
        },
      ],
    },
  },
};

export default item;
