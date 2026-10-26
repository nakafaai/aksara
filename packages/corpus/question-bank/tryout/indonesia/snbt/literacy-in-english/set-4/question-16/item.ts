import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
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
            "The passage uses tone as a descriptive label without tying it to the character's choice.",
        },
        {
          correct: true,
          label:
            "Eli turns a blank caption card from a sign of hesitation into an invitation to observe, while keeping the detailed museum information available.",
        },
        {
          correct: false,
          label:
            "The conflict is settled by the setting before the character's final action changes the object's meaning.",
        },
      ],
    },
  },
  stimulus: "passage-4",
};

export default item;
