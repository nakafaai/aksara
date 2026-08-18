import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Wenn die Fahrpreise für öffentliche Verkehrsmittel steigen, steigen auch die Treibstoffpreise (BBM).",
      value: false,
    },
    {
      label:
        "Wenn es keine Erhöhung der Fahrpreise für öffentliche Verkehrsmittel gibt, dann gibt es auch keine Erhöhung der Treibstoffpreise (BBM).",
      value: true,
    },
    {
      label:
        "Wenn die Preise für Grundbedürfnisse steigen, dann sind auch die Treibstoffpreise (BBM) gestiegen",
      value: false,
    },
    {
      label:
        "Jede Erhöhung der Treibstoffpreise (BBM) führt nicht zu einer Erhöhung der Preise für Grundbedürfnisse",
      value: false,
    },
    {
      label:
        "Wenn es keine Erhöhung der Treibstoffpreise (BBM) gibt, dann gibt es auch keine Erhöhung der Preise für Grundbedürfnisse",
      value: false,
    },
  ],
};

export default choices;
