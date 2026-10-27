import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-4",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Nora rotates an accurate map to match the passenger's viewpoint, making the route usable and changing what the folded map represents.",
        },
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
            "The passage uses irony as a descriptive label without tying it to the character's choice.",
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
