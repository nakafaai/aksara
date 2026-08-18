import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "widerstandsfähig (Satz $$(1)$$).",
      value: false,
    },
    {
      label: "Folge (Satz $$(2)$$).",
      value: false,
    },
    {
      label: "erfüllen (Satz $$(3)$$).",
      value: false,
    },
    {
      label: "nennt (Satz $$(4)$$).",
      value: false,
    },
    {
      label: "verringern (Satz $$(7)$$).",
      value: true,
    },
  ],
};

export default choices;
