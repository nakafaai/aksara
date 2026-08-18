import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$\\text{Rp2{.}500{,}00}$$",
      value: false,
    },
    {
      label: "$$\\text{Rp3{.}000{,}00}$$",
      value: false,
    },
    {
      label: "$$\\text{Rp4{.}000{,}00}$$",
      value: true,
    },
    {
      label: "$$\\text{Rp5{.}000{,}00}$$",
      value: false,
    },
    {
      label: "$$\\text{Rp5{.}500{,}00}$$",
      value: false,
    },
  ],
};

export default choices;
