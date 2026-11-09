import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "cause-effect",
  },
  stimulus: "class-mural",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "because the base coat made the painting go faster",
        },
        {
          correct: false,
          label: "because the class won a prize for the mural",
        },
        {
          correct: false,
          label: "because Bu Sinta explained it on the first day",
        },
        {
          correct: true,
          label:
            "because the mural's colors have stayed bright while the paint on the gate nearby is peeling",
        },
        {
          correct: false,
          label: "because the canteen owner paid for the paint",
        },
      ],
    },
  },
};

export default item;
