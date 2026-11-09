import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-4",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The recurring object mainly establishes the setting and changes little in relation to the conflict.",
        },
        {
          correct: false,
          label:
            "The character's final decision removes the ambiguity that the recurring object previously carried.",
        },
        {
          correct: false,
          label:
            "The passage uses sensory imagery as a descriptive label without tying it to the character's choice.",
        },
        {
          correct: true,
          label:
            "Miles chooses a contrasting gold repair seam, and its line of light reframes repair as continuing an object's history rather than erasing it.",
        },
        {
          correct: false,
          label:
            "The conflict is settled by the setting before the character's final action changes the object's meaning.",
        },
      ],
    },
  },
};

export default item;
