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
          isCorrect: true,
          label:
            "Ravi traces a wrongly sorted bag backward from the final bin to a mismatched permit, revealing how one early symbol can spread an error through the market.",
        },
        {
          isCorrect: false,
          label:
            "The passage uses plot structure as a descriptive label without tying it to the character's choice.",
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
