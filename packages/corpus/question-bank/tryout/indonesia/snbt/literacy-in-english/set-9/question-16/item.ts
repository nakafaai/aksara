import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "braille-code",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "It could only be used by soldiers who were writing at night.",
        },
        {
          correct: false,
          label:
            "It was printed in large raised letters that were slow to read.",
        },
        {
          correct: false,
          label: "It represented spelling instead of the sounds of words.",
        },
        {
          correct: true,
          label: "Its symbols used too many dots to be felt with one touch.",
        },
        {
          correct: false,
          label: "It was too expensive for the school in Paris to buy.",
        },
      ],
    },
  },
};

export default item;
