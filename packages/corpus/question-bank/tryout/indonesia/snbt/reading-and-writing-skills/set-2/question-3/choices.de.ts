import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Ein Familien-Medienplan sollte Kindern Grenzen setzen, aber die gleichen Grenzen sollten auch für Erwachsene gelten.",
      value: true,
    },
    {
      label:
        "Ein Familien-Medienplan sollte Kindern Grenzen setzen, weil die gleichen Grenzen auch für Erwachsene gelten sollten.",
      value: false,
    },
    {
      label:
        "Ein Familien-Medienplan sollte Kindern Grenzen setzen, obwohl die gleichen Grenzen auch für Erwachsene gelten sollten.",
      value: false,
    },
    {
      label:
        "Ein Familien-Medienplan sollte Kindern Grenzen setzen, die gleichen Grenzen sollten auch für Erwachsene gelten.",
      value: false,
    },
    {
      label:
        "Ein Familien-Medienplan sollte Kindern Grenzen setzen; deshalb sollten die gleichen Grenzen auch für Erwachsene gelten.",
      value: false,
    },
  ],
};

export default choices;
