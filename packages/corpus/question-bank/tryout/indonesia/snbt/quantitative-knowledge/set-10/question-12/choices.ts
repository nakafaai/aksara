import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$48$$ Tage",
      value: false,
    },
    {
      label: "$$48{,}5$$ Tage",
      value: false,
    },
    {
      label: "$$49$$ Tage",
      value: false,
    },
    {
      label: "$$49{,}5$$ Tage",
      value: true,
    },
    {
      label: "$$50$$ Tage",
      value: false,
    },
  ],
  en: [
    { label: "$$48$$ days", value: false },
    { label: "$$48.5$$ days", value: false },
    { label: "$$49$$ days", value: false },
    { label: "$$49.5$$ days", value: true },
    { label: "$$50$$ days", value: false },
  ],
  id: [
    { label: "$$48$$ hari", value: false },
    { label: "$$48{,}5$$ hari", value: false },
    { label: "$$49$$ hari", value: false },
    { label: "$$49{,}5$$ hari", value: true },
    { label: "$$50$$ hari", value: false },
  ],
};

export default choices;
