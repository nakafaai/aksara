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
  en: [
    {
      label: "Eating a whole apple before lunch always prevents obesity.",
      value: false,
    },
    {
      label: "All four apple preparations produced the same level of fullness.",
      value: false,
    },
    {
      label:
        "Apple juice led to a lower total energy intake than the whole apple.",
      value: false,
    },
    {
      label:
        "In this study, the whole apple produced the greatest fullness and a lower total energy intake than no preload.",
      value: true,
    },
    {
      label:
        "The study proved that fiber alone caused every difference between the apple preparations.",
      value: false,
    },
  ],
  id: [
    {
      label: "Makan apel utuh sebelum makan siang selalu mencegah obesitas.",
      value: false,
    },
    {
      label: "Keempat olahan apel menghasilkan tingkat rasa kenyang yang sama.",
      value: false,
    },
    {
      label:
        "Jus apel menghasilkan total asupan energi yang lebih rendah daripada apel utuh.",
      value: false,
    },
    {
      label:
        "Dalam penelitian ini, apel utuh menghasilkan rasa kenyang paling tinggi dan total asupan energi yang lebih rendah daripada kondisi tanpa sajian pendahuluan.",
      value: true,
    },
    {
      label:
        "Penelitian ini membuktikan bahwa serat saja menyebabkan seluruh perbedaan di antara olahan apel.",
      value: false,
    },
  ],
};

export default choices;
