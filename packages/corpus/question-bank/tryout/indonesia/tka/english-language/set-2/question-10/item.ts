import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "recount",
    topic: "reader-response",
  },
  stimulus: "accessible-fair",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Frustration that the class recorded unresolved barriers without cancelling the fair",
        },
        {
          correct: false,
          label:
            "Relief that the revised route proves the next disruption will be manageable",
        },
        {
          correct: false,
          label:
            "Disappointment that the class considered accessibility only after visitors complained",
        },
        {
          correct: false,
          label:
            "Approval of the delay because extra setup time guarantees equal access",
        },
        {
          correct: true,
          label:
            "Respect for the class's honest review instead of a claim of perfection",
        },
      ],
    },
  },
};

export default item;
