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
          correct: true,
          label:
            "Samira turns a blue date stamp from a reminder of unfinished work into a shared practice by recording the last package, and the next volunteer carries the action forward.",
        },
        {
          correct: false,
          label:
            "The passage uses motif as a descriptive label without tying it to the character's choice.",
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
