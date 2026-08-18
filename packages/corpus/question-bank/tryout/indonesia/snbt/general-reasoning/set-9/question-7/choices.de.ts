import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Die Schlussfolgerung ist definitiv wahr",
      value: true,
    },
    {
      label: "Die Schlussfolgerung ist möglicherweise wahr",
      value: false,
    },
    {
      label: "Die Schlussfolgerung ist definitiv falsch",
      value: false,
    },
    {
      label:
        "Die Schlussfolgerung ist für die bereitgestellten Informationen irrelevant",
      value: false,
    },
    {
      label:
        "Die Schlussfolgerung kann aufgrund unzureichender Informationen nicht bewertet werden",
      value: false,
    },
  ],
};

export default choices;
