import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "assumption",
  },
  stimulus: "homework-limits",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "What happened to pupils in Years 3 to 6 would also happen to older pupils if their homework were removed.",
        },
        {
          correct: false,
          label:
            "Children whose worksheets are finished by a parent learn less than children who work alone.",
        },
        {
          correct: false,
          label:
            "Most older pupils already spend more than $$40$$ minutes a night on their homework.",
        },
        {
          correct: false,
          label:
            "Reading and mathematics scores are the only outcomes that matter when homework is judged.",
        },
        {
          correct: false,
          label:
            "Pupils without a quiet room at home scored lower in the pilot than the other pupils did.",
        },
      ],
    },
  },
};

export default item;
