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
          label: "They made containers cheaper to paint and repair.",
        },
        {
          correct: false,
          label: "They required every ship to carry only twenty-foot boxes.",
        },
        {
          correct: false,
          label:
            "They prevented dockworkers from stealing goods from containers.",
        },
        {
          correct: false,
          label:
            "They allowed unions to control how many containers a port could handle.",
        },
        {
          correct: true,
          label:
            "Without common sizes and fittings, equipment built for one company's boxes could not handle another's.",
        },
      ],
    },
  },
};

export default item;
