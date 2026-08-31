import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Repeat the three arrangements with more cells but keep the same single resistor; this alone would establish their current, power, and operating time under every load.",
        },
        {
          isCorrect: false,
          label:
            "Use a different resistor, meter, cell pack, and measurement interval for each arrangement so that the follow-up covers more conditions at once.",
        },
        {
          isCorrect: true,
          label:
            "Test several resistor values while measuring voltage, current, and each cell's internal resistance; this would show whether the series pattern persists and clarify what it implies for power.",
        },
        {
          isCorrect: false,
          label:
            "Measure the open-circuit voltage more precisely but omit current and load resistance, because terminal voltage alone determines operating time.",
        },
        {
          isCorrect: false,
          label:
            "Repeat only the series arrangement until its mean is exactly twice 1.46 V, then treat that equality as evidence that the original limitation no longer matters.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
