import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Anwohner verloren ihre Motorräder",
      value: false,
    },
    {
      label: "Die Bewohner sind ängstlich und unruhig",
      value: false,
    },
    {
      label: "In Gang Mawar kommt es fast jede Woche zu Diebstählen",
      value: false,
    },
    {
      label: "Sicherheitskräfte patrouillieren nicht regelmäßig",
      value: false,
    },
    {
      label: "Der Sicherheitsdienst patrouilliert regelmäßig",
      value: true,
    },
  ],
};

export default choices;
