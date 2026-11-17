import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "heat",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "About $$29$$ minutes, with $$80\\%$$ of it spent freezing",
        },
        {
          correct: false,
          label: "About $$32$$ minutes, with $$73\\%$$ of it spent freezing",
        },
        {
          correct: false,
          label: "About $$7.3$$ minutes, with none of it spent freezing",
        },
        {
          correct: true,
          label: "About $$30$$ minutes, with $$76\\%$$ of it spent freezing",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kira-kira $$29$$ minit, dengan $$80\\%$$ daripadanya untuk membeku",
        },
        {
          correct: false,
          label:
            "Kira-kira $$32$$ minit, dengan $$73\\%$$ daripadanya untuk membeku",
        },
        {
          correct: false,
          label: "Kira-kira $$7.3$$ minit, tanpa sebarang masa untuk membeku",
        },
        {
          correct: true,
          label:
            "Kira-kira $$30$$ minit, dengan $$76\\%$$ daripadanya untuk membeku",
        },
      ],
    },
  },
};

export default item;
