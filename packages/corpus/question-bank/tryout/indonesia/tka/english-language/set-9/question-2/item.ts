import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "main-idea-purpose",
  },
  stimulus: "stilt-house",
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "how to build a house from ironwood" },
        {
          correct: false,
          label: "the history of the village of Lembah Tinggi",
        },
        { correct: false, label: "why termites damage most wooden houses" },
        {
          correct: true,
          label:
            "the features of a traditional stilt house and how they suit local conditions",
        },
        {
          correct: false,
          label: "how the writer's grandmother weaves cloth on her loom",
        },
      ],
    },
  },
};

export default item;
