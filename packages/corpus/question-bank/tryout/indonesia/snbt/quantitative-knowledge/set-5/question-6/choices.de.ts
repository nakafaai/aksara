import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$P > Q$$",
      value: true,
    },
    {
      label: "$$P < Q$$",
      value: false,
    },
    {
      label: "$$P = Q$$",
      value: false,
    },
    {
      label: "$$P + Q = 1$$",
      value: false,
    },
    {
      label:
        "Die bereitgestellten Informationen reichen nicht aus, um sich für eine der Optionen zu entscheiden.",
      value: false,
    },
  ],
};

export default choices;
