import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$P < Q$$",
      value: true,
    },
    {
      label: "$$P > Q$$",
      value: false,
    },
    {
      label: "$$P = Q$$",
      value: false,
    },
    {
      label: "$$P = 2Q$$",
      value: false,
    },
    {
      label:
        "Die bereitgestellten Informationen reichen nicht aus, um sich für eine der vier oben genannten Optionen zu entscheiden",
      value: false,
    },
  ],
  en: [
    {
      label: "$$P < Q$$",
      value: true,
    },
    {
      label: "$$P > Q$$",
      value: false,
    },
    {
      label: "$$P = Q$$",
      value: false,
    },
    {
      label: "$$P = 2Q$$",
      value: false,
    },
    {
      label:
        "The information provided is not sufficient to decide on one of the four options above",
      value: false,
    },
  ],
  id: [
    {
      label: "$$P < Q$$",
      value: true,
    },
    {
      label: "$$P > Q$$",
      value: false,
    },
    {
      label: "$$P = Q$$",
      value: false,
    },
    {
      label: "$$P = 2Q$$",
      value: false,
    },
    {
      label:
        "Informasi yang diberikan tidak cukup untuk memutuskan salah satu dari empat pilihan di atas",
      value: false,
    },
  ],
};

export default choices;
