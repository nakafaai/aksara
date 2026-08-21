import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$P > Q$$",
      value: false,
    },
    {
      label: "$$P < Q$$",
      value: true,
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
  en: [
    { label: "$$P > Q$$", value: false },
    { label: "$$P < Q$$", value: true },
    { label: "$$P = Q$$", value: false },
    { label: "$$P + Q = 1$$", value: false },
    {
      label:
        "The information provided is not sufficient to decide one of the options.",
      value: false,
    },
  ],
  id: [
    { label: "$$P > Q$$", value: false },
    { label: "$$P < Q$$", value: true },
    { label: "$$P = Q$$", value: false },
    { label: "$$P + Q = 1$$", value: false },
    {
      label:
        "Informasi yang diberikan tidak cukup untuk memutuskan salah satu pilihan.",
      value: false,
    },
  ],
};

export default choices;
