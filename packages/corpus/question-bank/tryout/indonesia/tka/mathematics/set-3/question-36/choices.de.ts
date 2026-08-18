import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "$$x = 30^\\circ + k \\cdot 180^\\circ$$, $$k$$ ist eine ganze Zahl",
      value: false,
    },
    {
      label:
        "$$x = 60^\\circ + k \\cdot 180^\\circ$$, $$k$$ ist eine ganze Zahl",
      value: false,
    },
    {
      label:
        "$$x = 90^\\circ + k \\cdot 180^\\circ$$, $$k$$ ist eine ganze Zahl",
      value: false,
    },
    {
      label:
        "$$x = 120^\\circ + k \\cdot 180^\\circ$$, $$k$$ ist eine ganze Zahl",
      value: true,
    },
    {
      label:
        "$$x = 150^\\circ + k \\cdot 180^\\circ$$, $$k$$ ist eine ganze Zahl",
      value: false,
    },
  ],
};

export default choices;
