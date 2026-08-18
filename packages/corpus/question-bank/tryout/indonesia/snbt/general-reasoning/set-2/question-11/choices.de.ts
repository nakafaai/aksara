import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$1{,}1$$ Millionen Tonnen",
      value: false,
    },
    {
      label: "$$1{,}8$$ Millionen Tonnen",
      value: true,
    },
    {
      label: "$$2{,}5$$ Millionen Tonnen",
      value: false,
    },
    {
      label: "$$3{,}0$$ Millionen Tonnen",
      value: false,
    },
    {
      label: "Kann nicht bestimmt werden",
      value: false,
    },
  ],
};

export default choices;
