import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "point-of-view",
  },
  stimulus: "homeschooling",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "By arguing that the family's success is probably down to chance, and that it is likely to fade as the two children grow older and their work gets harder.",
        },
        {
          correct: true,
          label:
            "By granting that the success may be real but noting that happy families share their stories most, so it says little in general.",
        },
        {
          correct: false,
          label:
            "By agreeing with it, since the survey figures show that a great many other families made the same choice in 2020.",
        },
        {
          correct: false,
          label:
            "By treating it as strong evidence, because it follows children who moved from attending school to learning at home.",
        },
        {
          correct: false,
          label:
            "By replying that the parent lacks the training she would need to judge her own children's progress fairly.",
        },
      ],
    },
  },
};

export default item;
