import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label:
        "The Kīholo Bay fishery can be harvested without ecological limits.",
      value: false,
    },
    {
      label:
        "Every small-scale reef fishery distributes its catch in exactly the same way.",
      value: false,
    },
    {
      label:
        "Most of the Kīholo Bay catch was sold through commercial markets.",
      value: false,
    },
    {
      label: "Sharing seafood at cultural events has no social value.",
      value: false,
    },
    {
      label:
        "Commercial sales records alone would greatly underestimate the fishery's value to the community.",
      value: true,
    },
  ],
};

export default choices;
