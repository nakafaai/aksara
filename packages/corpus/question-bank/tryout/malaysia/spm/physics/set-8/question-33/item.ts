import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electromagnetism",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0\\text{ N}$$, $$9.00\\text{ N}$$ pushing it away from the centre bar, and $$31.6\\text{ kA}$$",
        },
        {
          correct: true,
          label:
            "$$0\\text{ N}$$, $$6.75\\text{ N}$$ pushing it away from the centre bar, and $$36.5\\text{ kA}$$",
        },
        {
          correct: false,
          label:
            "$$18.0\\text{ N}$$, $$6.75\\text{ N}$$ pushing it away from the centre bar, and $$22.4\\text{ kA}$$",
        },
        {
          correct: false,
          label:
            "$$0\\text{ N}$$, $$11.25\\text{ N}$$ pushing it away from the centre bar, and $$28.3\\text{ kA}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0\\text{ N}$$, $$9.00\\text{ N}$$ yang menolaknya menjauhi batang tengah, dan $$31.6\\text{ kA}$$",
        },
        {
          correct: true,
          label:
            "$$0\\text{ N}$$, $$6.75\\text{ N}$$ yang menolaknya menjauhi batang tengah, dan $$36.5\\text{ kA}$$",
        },
        {
          correct: false,
          label:
            "$$18.0\\text{ N}$$, $$6.75\\text{ N}$$ yang menolaknya menjauhi batang tengah, dan $$22.4\\text{ kA}$$",
        },
        {
          correct: false,
          label:
            "$$0\\text{ N}$$, $$11.25\\text{ N}$$ yang menolaknya menjauhi batang tengah, dan $$28.3\\text{ kA}$$",
        },
      ],
    },
  },
};

export default item;
