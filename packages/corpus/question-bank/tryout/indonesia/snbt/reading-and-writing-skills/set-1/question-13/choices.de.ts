import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Das Wort _untersuchten_ in Satz $$(2)$$.",
      value: false,
    },
    {
      label: "Das Wort _begünstigen_ in Satz $$(3)$$.",
      value: false,
    },
    {
      label: "Das Wort _lässt_ in Satz $$(4)$$.",
      value: false,
    },
    {
      label: "Das Wort _erzeugen_ in Satz $$(8)$$.",
      value: true,
    },
    {
      label: "Das Wort _bedrohen_ in Satz $$(9)$$.",
      value: false,
    },
  ],
};

export default choices;
