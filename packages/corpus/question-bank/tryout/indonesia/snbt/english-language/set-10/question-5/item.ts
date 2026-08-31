import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Measuring potential difference in one preliminary comparison",
        },
        {
          isCorrect: false,
          label:
            "Treating potential difference as the sole explanation for the observed result",
        },
        {
          isCorrect: true,
          label: "Testing the voltage of two cells connected in series",
        },
        {
          isCorrect: false,
          label:
            "A final rule derived from the first comparison of potential difference",
        },
        {
          isCorrect: false,
          label:
            "A limitation that makes another test of potential difference unnecessary",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
