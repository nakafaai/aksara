import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Aussage $$(1)$$ allein reicht aus, Aussage $$(2)$$ allein jedoch nicht",
      value: false,
    },
    {
      label:
        "Aussage $$(2)$$ allein reicht aus, Aussage $$(1)$$ allein jedoch nicht",
      value: true,
    },
    {
      label: "Beide Aussagen zusammen reichen aus, aber keine Aussage allein",
      value: false,
    },
    {
      label:
        "Aussage $$(1)$$ allein reicht aus, und Aussage $$(2)$$ allein reicht aus",
      value: false,
    },
    {
      label: "Die Aussagen $$(1)$$ und $$(2)$$ reichen auch zusammen nicht aus",
      value: false,
    },
  ],
};

export default choices;
