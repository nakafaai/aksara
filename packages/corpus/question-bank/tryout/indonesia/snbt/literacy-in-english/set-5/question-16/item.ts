import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "great-stink",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "John Snow had persuaded Parliament that cholera spread through water.",
        },
        {
          correct: false,
          label:
            "A cholera outbreak that summer had killed several members of Parliament.",
        },
        {
          correct: true,
          label:
            "Many believed foul air spread disease, so the smell seemed dangerous.",
        },
        {
          correct: false,
          label:
            "The river had flooded the Houses of Parliament during the hot June.",
        },
        {
          correct: false,
          label:
            "Bazalgette had already finished the new sewers at his own expense.",
        },
      ],
    },
  },
};

export default item;
