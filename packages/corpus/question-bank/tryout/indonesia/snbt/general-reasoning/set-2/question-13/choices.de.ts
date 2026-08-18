import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Inlandsbeschaffung und Reisimporte werden als gegenläufig beschrieben",
      value: true,
    },
    {
      label:
        "Inlandsbeschaffung und Reisimporte werden als gleichläufig beschrieben",
      value: false,
    },
    {
      label:
        "Der Text beschreibt keinen Zusammenhang zwischen Inlandsbeschaffung und Reisimporten",
      value: false,
    },
    {
      label:
        "Inlandsbeschaffung und Reisexporte werden als gegenläufig beschrieben",
      value: false,
    },
    {
      label:
        "Die Lösung der Überarbeitung der Präsidialverordnung Nr. $$63$$ von $$2017$$ wird die Budgetzuweisungen ändern",
      value: false,
    },
  ],
};

export default choices;
