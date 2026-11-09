import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "grid-logic",
  },
  stimulus: "lantai",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Rani hobi memasak.",
        },
        {
          correct: true,
          label: "Sita tinggal di lantai 2.",
        },
        {
          correct: false,
          label: "Tika tinggal di lantai 4.",
        },
        {
          correct: false,
          label: "Rani tinggal di lantai 4.",
        },
        {
          correct: false,
          label: "Tika hobi melukis.",
        },
      ],
    },
  },
};

export default item;
