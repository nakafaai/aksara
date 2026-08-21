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
  en: [
    { label: "$$1.1$$ million tons", value: false },
    { label: "$$1.8$$ million tons", value: true },
    { label: "$$2.5$$ million tons", value: false },
    { label: "$$3.0$$ million tons", value: false },
    { label: "Cannot be determined", value: false },
  ],
  id: [
    { label: "$$1{,}1$$ juta ton", value: false },
    { label: "$$1{,}8$$ juta ton", value: true },
    { label: "$$2{,}5$$ juta ton", value: false },
    { label: "$$3{,}0$$ juta ton", value: false },
    { label: "Tidak dapat ditentukan", value: false },
  ],
};

export default choices;
