import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Aussage $$(1)$$ allein ist ausreichend, Aussage $$(2)$$ allein jedoch nicht.",
      value: false,
    },
    {
      label:
        "Aussage $$(2)$$ allein ist ausreichend, Aussage $$(1)$$ allein jedoch nicht.",
      value: false,
    },
    {
      label:
        "Beide Aussagen zusammen sind ausreichend, aber keine Aussage allein ist ausreichend.",
      value: true,
    },
    {
      label:
        "Aussage $$(1)$$ allein ist ausreichend, und Aussage $$(2)$$ allein ist ausreichend.",
      value: false,
    },
    {
      label:
        "Die Aussagen $$(1)$$ und $$(2)$$ sind auch zusammen nicht ausreichend.",
      value: false,
    },
  ],
};

export default choices;
