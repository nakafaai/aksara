import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "descriptive",
    topic: "information-validity",
  },
  stimulus: "library-loans",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "A book borrowed on a Saturday and renewed once is due on the Saturday three weeks later.",
        },
        {
          correct: true,
          label:
            "A DVD borrowed on a Thursday falls due on the Sunday, so it may come back on the Monday without a fine.",
        },
        {
          correct: true,
          label:
            "A member under $$12$$ who returns a DVD $$3$$ days late, with no Sunday among them, pays $$\\text{Rp}3{,}000$$.",
        },
        {
          correct: false,
          label:
            "A magazine borrowed on a Monday may be renewed on the following Monday.",
        },
        {
          correct: false,
          label:
            "A member who holds $$4$$ books and $$2$$ DVDs may also borrow a magazine.",
        },
      ],
    },
  },
};

export default item;
