import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "nuclear-power",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "It accepts that the country can go on burning some gas, but rejects the claim that gas plants used only in rare windless weeks would emit little.",
        },
        {
          correct: false,
          label:
            "It accepts that gas plants used only in rare windless weeks would emit little, but rejects the claim that wind farms and solar parks can be built quickly.",
        },
        {
          correct: true,
          label:
            "It accepts that gas plants used only in rare windless weeks would emit little, but rejects the idea that the country can rely on them once it stops burning gas.",
        },
        {
          correct: false,
          label:
            "It accepts that storage will close the gap by the 2040s, but rejects the cost of keeping gas plants in reserve until then.",
        },
        {
          correct: false,
          label:
            "It accepts that gas plants used only in rare windless weeks would emit little, but rejects them because they would cost more to build than reactors.",
        },
      ],
    },
  },
};

export default item;
