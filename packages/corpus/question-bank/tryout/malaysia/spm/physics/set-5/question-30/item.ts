import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$110\\text{ W}$$, and none is wasted" },
        { correct: true, label: "$$68\\text{ W}$$, and about $$25\\%$$" },
        { correct: false, label: "$$70\\text{ W}$$, and about $$24\\%$$" },
        { correct: false, label: "$$87\\text{ W}$$, and about $$25\\%$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$110\\text{ W}$$, dan tiada yang terbazir" },
        { correct: true, label: "$$68\\text{ W}$$, dan kira-kira $$25\\%$$" },
        { correct: false, label: "$$70\\text{ W}$$, dan kira-kira $$24\\%$$" },
        { correct: false, label: "$$87\\text{ W}$$, dan kira-kira $$25\\%$$" },
      ],
    },
  },
};

export default item;
