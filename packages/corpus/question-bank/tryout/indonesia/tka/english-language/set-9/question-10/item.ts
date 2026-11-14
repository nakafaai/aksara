import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "recount",
    topic: "reader-response",
  },
  stimulus: "class-mural",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "“Taking time to prepare carefully can make the final result last much longer.”",
        },
        {
          correct: false,
          label:
            "“Murals are a waste of time, because preparing the wall is boring.”",
        },
        {
          correct: false,
          label:
            "“Students should never paint walls without professional artists.”",
        },
        {
          correct: false,
          label:
            "“The class should have chosen ‘Future City’ instead of ‘Our River’.”",
        },
        {
          correct: false,
          label: "“Only art teachers can enjoy projects like this one.”",
        },
      ],
    },
  },
};

export default item;
