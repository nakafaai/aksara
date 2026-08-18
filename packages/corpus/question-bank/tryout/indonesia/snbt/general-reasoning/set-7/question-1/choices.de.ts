import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Ein ganzer Apfel vor dem Mittagessen verhindert immer Adipositas.",
      value: false,
    },
    {
      label:
        "Alle vier Apfelzubereitungen führten zum gleichen Sättigungsgefühl.",
      value: false,
    },
    {
      label:
        "Apfelsaft führte zu einer niedrigeren gesamten Energieaufnahme als der ganze Apfel.",
      value: false,
    },
    {
      label:
        "In dieser Studie erzeugte der ganze Apfel das stärkste Sättigungsgefühl und eine niedrigere gesamte Energieaufnahme als die Bedingung ohne Vorspeise.",
      value: true,
    },
    {
      label:
        "Die Studie bewies, dass allein die Ballaststoffe alle Unterschiede zwischen den Apfelzubereitungen verursachten.",
      value: false,
    },
  ],
};

export default choices;
