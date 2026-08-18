import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Seit Januar $$1941$$ wurden in Cukurgondang Mango-Akzessionen angepflanzt, und die Anlage umfasste $$11{,}87$$ Hektar.",
      value: false,
    },
    {
      label:
        "Die Nationale Mango-Innovationswoche fand am IP2TP Cukurgondang in Pasuruan, Ostjava, statt.",
      value: false,
    },
    {
      label:
        "Bäuerliche Betriebe in Pasuruan bauten jede Akzession der Cukurgondang-Sammlung an.",
      value: true,
    },
    {
      label:
        "Das Ministerium bezeichnete Cukurgondang als zweitgrößte Mangosammlung der Welt.",
      value: false,
    },
    {
      label:
        "Die Veranstaltung diente der Verbreitung von Mangoforschung und -technologie.",
      value: false,
    },
  ],
};

export default choices;
