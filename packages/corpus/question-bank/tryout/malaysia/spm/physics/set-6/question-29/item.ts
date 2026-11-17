import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "About $$5.0\\text{ h}$$, and RM $$7.50$$" },
        { correct: false, label: "About $$5.6\\text{ h}$$, and RM $$7.50$$" },
        { correct: true, label: "About $$5.6\\text{ h}$$, and RM $$8.33$$" },
        { correct: false, label: "About $$4.5\\text{ h}$$, and RM $$6.75$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kira-kira $$5.0\\text{ h}$$, dan RM $$7.50$$",
        },
        {
          correct: false,
          label: "Kira-kira $$5.6\\text{ h}$$, dan RM $$7.50$$",
        },
        {
          correct: true,
          label: "Kira-kira $$5.6\\text{ h}$$, dan RM $$8.33$$",
        },
        {
          correct: false,
          label: "Kira-kira $$4.5\\text{ h}$$, dan RM $$6.75$$",
        },
      ],
    },
  },
};

export default item;
