import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Indem gezeigt wird, dass das Skalarprodukt des Positionsvektors A und des Richtungsvektors der Tangente an A positiv ist.",
      value: false,
    },
    {
      label:
        "Indem wir zeigen, dass das Kreuzprodukt des Positionsvektors A und des Richtungsvektors der Tangente an A der Nullvektor ist.",
      value: false,
    },
    {
      label:
        "Indem wir zeigen, dass das Skalarprodukt des Positionsvektors A und des Richtungsvektors der Tangente an A Null ist.",
      value: true,
    },
    {
      label:
        "Indem man zeigt, dass der Positionsvektor A und der Richtungsvektor der Tangente an A die gleiche Richtung haben.",
      value: false,
    },
    {
      label:
        "Indem man zeigt, dass der Ortsvektor A und der Richtungsvektor der Tangente an A die gleiche Länge haben.",
      value: false,
    },
  ],
};

export default choices;
