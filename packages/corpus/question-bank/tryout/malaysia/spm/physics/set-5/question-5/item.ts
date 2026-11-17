import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "force-and-motion-1",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$80\\text{ N}$$, and $$75\\%$$" },
        { correct: false, label: "$$160\\text{ N}$$, and $$150\\%$$" },
        { correct: false, label: "$$70\\text{ N}$$, and $$75\\%$$" },
        { correct: false, label: "$$40\\text{ N}$$, and $$19\\%$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$80\\text{ N}$$, dan $$75\\%$$" },
        { correct: false, label: "$$160\\text{ N}$$, dan $$150\\%$$" },
        { correct: false, label: "$$70\\text{ N}$$, dan $$75\\%$$" },
        { correct: false, label: "$$40\\text{ N}$$, dan $$19\\%$$" },
      ],
    },
  },
};

export default item;
