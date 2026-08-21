import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$\\text{I, II und III}$$",
      value: false,
    },
    {
      label: "$$\\text{I und II}$$",
      value: true,
    },
    {
      label: "$$\\text{II und III}$$",
      value: false,
    },
    {
      label: "$$\\text{I}$$",
      value: false,
    },
    {
      label: "$$\\text{III}$$",
      value: false,
    },
  ],
  en: [
    {
      label: "$$\\text{I, II, and III}$$",
      value: false,
    },
    {
      label: "$$\\text{I and II}$$",
      value: true,
    },
    {
      label: "$$\\text{II and III}$$",
      value: false,
    },
    {
      label: "$$\\text{I}$$",
      value: false,
    },
    {
      label: "$$\\text{III}$$",
      value: false,
    },
  ],
  id: [
    {
      label: "$$\\text{I, II, dan III}$$",
      value: false,
    },
    {
      label: "$$\\text{I dan II}$$",
      value: true,
    },
    {
      label: "$$\\text{II dan III}$$",
      value: false,
    },
    {
      label: "$$\\text{I}$$",
      value: false,
    },
    {
      label: "$$\\text{III}$$",
      value: false,
    },
  ],
};

export default choices;
