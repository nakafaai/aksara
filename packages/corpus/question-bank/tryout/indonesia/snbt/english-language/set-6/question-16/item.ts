import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The recurring object mainly establishes the setting and changes little in relation to the conflict.",
        },
        {
          isCorrect: false,
          label:
            "The character's final decision removes the ambiguity that the recurring object previously carried.",
        },
        {
          isCorrect: false,
          label:
            "The passage uses sensory imagery as a descriptive label without tying it to the character's choice.",
        },
        {
          isCorrect: true,
          label:
            "Miles's small choice changes the meaning of a spool of gold thread while addressing a conflict in a repair café during a storm.",
        },
        {
          isCorrect: false,
          label:
            "The conflict is settled by the setting before the character's final action changes the object's meaning.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
