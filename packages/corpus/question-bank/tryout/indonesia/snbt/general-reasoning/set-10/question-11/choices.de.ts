import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Entwaldung kann Böden anfälliger für Erosion machen",
      value: false,
    },
    {
      label:
        "Entwaldung allein verursachte 2019 fast alle vom Menschen verursachten Treibhausgasemissionen",
      value: true,
    },
    {
      label:
        "Von der Abholzung betroffen sind auch Gemeinden, die Brennholz nutzen",
      value: false,
    },
    {
      label: "Entwaldung bedroht die Lebensräume von Wildtieren",
      value: false,
    },
    {
      label: "Der Landnutzungssektor umfasst mehr als nur Entwaldung",
      value: false,
    },
  ],
};

export default choices;
