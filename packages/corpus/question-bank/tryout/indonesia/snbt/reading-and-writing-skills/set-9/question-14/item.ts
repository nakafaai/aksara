import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Die Daten wurden in den Proberäumen erhoben und danach verglichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten worden in den Proberäumen erhebt und danach vergleichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden an die Proberäume erhoben und danach verglichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden in den Proberäumen erhoben anschließend sie verglichen wurden.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden von Proberäume erheben und anschließend vergleicht.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Data were collected in the music practice rooms and compared afterward.",
        },
        {
          isCorrect: false,
          label:
            "Data were collected in the music practice rooms and compared afterward in.",
        },
        {
          isCorrect: false,
          label:
            "Data was collect in the music practice rooms and comparing afterward.",
        },
        {
          isCorrect: false,
          label:
            "Data were collected in the music practice rooms and afterward compared it.",
        },
        {
          isCorrect: false,
          label:
            "Data collected the music practice rooms and were comparison afterward.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Data dikumpulkan di ruang latihan musik dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data di kumpulkan di ruang latihan musik dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data dikumpulkan diruang latihan musik dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data mengumpulkan di ruang latihan musik dan kemudian membandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data dikumpulkan pada di ruang latihan musik lalu di bandingkan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
