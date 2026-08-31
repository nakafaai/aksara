import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Die Daten wurden in diesem Kontext erhoben: Musikproberäume. Anschließend wurden sie verglichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten worden im Kontext Musikproberäume erhebt und danach vergleichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden an den Kontext Musikproberäume erhoben und danach verglichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden in diesem Kontext erhoben Musikproberäume anschließend sie verglichen wurden.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden von Musikproberäume erheben und anschließend vergleicht.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Data were collected in this setting (music practice rooms) and compared afterward.",
        },
        {
          isCorrect: false,
          label:
            "Data were collected at this setting (music practice rooms) and compared afterward in.",
        },
        {
          isCorrect: false,
          label:
            "Data was collect in this setting (music practice rooms) and comparing afterward.",
        },
        {
          isCorrect: false,
          label:
            "Data were collected on this setting (music practice rooms) and afterward compared it.",
        },
        {
          isCorrect: false,
          label:
            "Data collected this setting (music practice rooms) and were comparison afterward.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Data diukur di ruang latihan musik dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data di ukur di ruang latihan musik dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data diukur didepan ruang latihan musik dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data mengukur di ruang latihan musik dan kemudian membandingkan.",
        },
        {
          isCorrect: false,
          label: "Data diukur pada di ruang latihan musik lalu di bandingkan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
