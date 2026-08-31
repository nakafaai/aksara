import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Daten worden im Kontext Schirmverleih am Bahnhof erhebt und danach vergleichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden an den Kontext Schirmverleih am Bahnhof erhoben und danach verglichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden in diesem Kontext erhoben Schirmverleih am Bahnhof anschließend sie verglichen wurden.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden von Schirmverleih am Bahnhof erheben und anschließend vergleicht.",
        },
        {
          isCorrect: true,
          label:
            "Die Daten wurden in diesem Kontext erhoben: Schirmverleih am Bahnhof. Anschließend wurden sie verglichen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Data were collected at this setting (station umbrella lending) and compared afterward in.",
        },
        {
          isCorrect: false,
          label:
            "Data was collect in this setting (station umbrella lending) and comparing afterward.",
        },
        {
          isCorrect: false,
          label:
            "Data were collected on this setting (station umbrella lending) and afterward compared it.",
        },
        {
          isCorrect: false,
          label:
            "Data collected this setting (station umbrella lending) and were comparison afterward.",
        },
        {
          isCorrect: true,
          label:
            "Data were collected in this setting (station umbrella lending) and compared afterward.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Data di ukur di peminjaman payung stasiun dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data diukur didepan peminjaman payung stasiun dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data mengukur di peminjaman payung stasiun dan kemudian membandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data diukur pada di peminjaman payung stasiun lalu di bandingkan.",
        },
        {
          isCorrect: true,
          label:
            "Data diukur di peminjaman payung stasiun dan kemudian dibandingkan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
