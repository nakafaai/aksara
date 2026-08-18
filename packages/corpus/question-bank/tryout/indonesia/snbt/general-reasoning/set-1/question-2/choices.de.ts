import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Die Forschenden nutzen sowohl Selektion als auch Kreuzung, um die Mango-Genressourcensammlung weiterzuentwickeln.",
      value: true,
    },
    {
      label:
        "Örtliche Landwirte erzeugten Agri Gardina 45 ausschließlich durch Selektion.",
      value: false,
    },
    {
      label:
        "Denarum Agrihorti wurde aus kommerziellen Mangos in Kalifornien selektiert.",
      value: false,
    },
    {
      label:
        "Denarum Agrihorti besitzt einen hohen Anteil grober Fruchtfasern.",
      value: false,
    },
    {
      label: "Jede Akzession der Cukurgondang-Sammlung ist exportreif.",
      value: false,
    },
  ],
};

export default choices;
