import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "shipping-container",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "They made containers cheaper to paint, repair, and store between voyages.",
        },
        {
          correct: false,
          label:
            "They required every ship to carry only twenty-foot boxes on each voyage.",
        },
        {
          correct: false,
          label:
            "They prevented dockworkers from stealing goods from sealed containers.",
        },
        {
          correct: false,
          label:
            "They allowed unions to control how many containers a port could handle.",
        },
        {
          correct: true,
          label:
            "Otherwise one company's cranes could not lift another company's boxes.",
        },
      ],
    },
  },
};

export default item;
