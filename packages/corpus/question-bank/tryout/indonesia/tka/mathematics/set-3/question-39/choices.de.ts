import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "$$r = \\sqrt{8}$$, Winkel $$\\alpha$$ liegt im Quadranten $$\\text{II}$$ oder $$\\text{IV}$$",
      value: false,
    },
    {
      label:
        "$$r = \\sqrt{8}$$, Winkel $$\\alpha$$ liegt im Quadranten $$\\text{II}$$",
      value: false,
    },
    {
      label:
        "$$r = \\sqrt{10}$$, Winkel $$\\alpha$$ liegt im Quadranten $$\\text{II}$$ oder $$\\text{IV}$$",
      value: false,
    },
    {
      label:
        "$$r = \\sqrt{10}$$, Winkel $$\\alpha$$ liegt im Quadranten $$\\text{II}$$",
      value: true,
    },
    {
      label: "$$r = 3$$, Winkel $$\\alpha$$ liegt im Quadranten $$\\text{IV}$$",
      value: false,
    },
  ],
};

export default choices;
