import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$x < -1$$ oder $$x > \\frac{5}{2}$$",
      value: false,
    },
    {
      label: "$$x < -\\frac{1}{2}$$ oder $$x > 3$$",
      value: false,
    },
    {
      label: "$$x < -\\frac{1}{2}$$ oder $$x > \\frac{5}{2}$$",
      value: true,
    },
    {
      label: "$$x < -1$$ oder $$x > 3$$",
      value: false,
    },
    {
      label: "$$x < -\\frac{3}{2}$$ oder $$x > \\frac{5}{2}$$",
      value: false,
    },
  ],
  en: [
    {
      label: "$$x < -1$$ or $$x > \\frac{5}{2}$$",
      value: false,
    },
    {
      label: "$$x < -\\frac{1}{2}$$ or $$x > 3$$",
      value: false,
    },
    {
      label: "$$x < -\\frac{1}{2}$$ or $$x > \\frac{5}{2}$$",
      value: true,
    },
    {
      label: "$$x < -1$$ or $$x > 3$$",
      value: false,
    },
    {
      label: "$$x < -\\frac{3}{2}$$ or $$x > \\frac{5}{2}$$",
      value: false,
    },
  ],
  id: [
    {
      label: "$$x < -1$$ atau $$x > \\frac{5}{2}$$",
      value: false,
    },
    {
      label: "$$x < -\\frac{1}{2}$$ atau $$x > 3$$",
      value: false,
    },
    {
      label: "$$x < -\\frac{1}{2}$$ atau $$x > \\frac{5}{2}$$",
      value: true,
    },
    {
      label: "$$x < -1$$ atau $$x > 3$$",
      value: false,
    },
    {
      label: "$$x < -\\frac{3}{2}$$ atau $$x > \\frac{5}{2}$$",
      value: false,
    },
  ],
};

export default choices;
