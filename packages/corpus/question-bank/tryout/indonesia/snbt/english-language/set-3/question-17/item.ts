import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage states that no action or observation occurred in a station before sunrise.",
        },
        {
          isCorrect: false,
          label:
            "Everyone in a station before sunrise obtained exactly the same result without variation.",
        },
        {
          isCorrect: false,
          label:
            "The writer removes every detail related to a station before sunrise.",
        },
        {
          isCorrect: false,
          label:
            "The passage presents irony as proof that no follow-up is needed.",
        },
        {
          isCorrect: true,
          label:
            "Nora turned the map upside down and traced the route from the passenger's point of view.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
