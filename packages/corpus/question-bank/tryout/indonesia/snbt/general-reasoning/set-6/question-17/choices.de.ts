import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Am vergangenen Sonntag ereignete sich in Kampung Bambu keine Straftat.",
      value: false,
    },
    {
      label:
        "Am vergangenen Sonntag ereignete sich in Kampung Bambu kein Diebstahl.",
      value: false,
    },
    {
      label:
        "Am vergangenen Sonntag ereignete sich in Kampung Bambu ein Diebstahl.",
      value: true,
    },
    {
      label:
        "Die verbesserte Sicherheit verhinderte am vergangenen Sonntag jede Straftat.",
      value: false,
    },
    {
      label:
        "Seit dem vergangenen Sonntag ereignete sich in Kampung Bambu keine Straftat.",
      value: false,
    },
  ],
};

export default choices;
