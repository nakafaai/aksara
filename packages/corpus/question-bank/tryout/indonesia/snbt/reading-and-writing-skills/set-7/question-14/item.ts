import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Daten worden beim Schirmverleih am Bahnhof erhebt und danach vergleichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden an den Schirmverleih am Bahnhof erhoben und danach verglichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden beim Schirmverleih am Bahnhof erhoben anschließend sie verglichen wurden.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden von Schirmverleih am Bahnhof erheben und anschließend vergleicht.",
        },
        {
          isCorrect: true,
          label:
            "Die Daten wurden beim Schirmverleih am Bahnhof erhoben und danach verglichen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Data were collected at the station umbrella service and compared afterward in.",
        },
        {
          isCorrect: false,
          label:
            "Data was collect at the station umbrella service and comparing afterward.",
        },
        {
          isCorrect: false,
          label:
            "Data were collected at the station umbrella service and afterward compared it.",
        },
        {
          isCorrect: false,
          label:
            "Data collected the station umbrella service and were comparison afterward.",
        },
        {
          isCorrect: true,
          label:
            "Data were collected at the station umbrella service and compared afterward.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Data di kumpulkan di stasiun dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label: "Data dikumpulkan distasiun dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label: "Data mengumpulkan di stasiun dan kemudian membandingkan.",
        },
        {
          isCorrect: false,
          label: "Data dikumpulkan pada di stasiun lalu di bandingkan.",
        },
        {
          isCorrect: true,
          label: "Data dikumpulkan di stasiun dan kemudian dibandingkan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
