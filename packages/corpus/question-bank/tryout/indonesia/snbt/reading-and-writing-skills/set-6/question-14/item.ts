import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Daten worden im Wohngebiet erhebt und danach vergleichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden an das Wohngebiet erhoben und danach verglichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden im Wohngebiet erhoben anschließend sie verglichen wurden.",
        },
        {
          isCorrect: true,
          label:
            "Die Daten wurden im Wohngebiet erhoben und danach verglichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden von Wohngebiet erheben und anschließend vergleicht.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Data were collected for the neighbourhood noise log and compared afterward in.",
        },
        {
          isCorrect: false,
          label:
            "Data was collect for the neighbourhood noise log and comparing afterward.",
        },
        {
          isCorrect: false,
          label:
            "Data were collected for the neighbourhood noise log and afterward compared it.",
        },
        {
          isCorrect: true,
          label:
            "Data were collected for the neighbourhood noise log and compared afterward.",
        },
        {
          isCorrect: false,
          label:
            "Data collected the neighbourhood noise log and were comparison afterward.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Data di kumpulkan di lingkungan warga dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data dikumpulkan dilingkungan warga dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data mengumpulkan di lingkungan warga dan kemudian membandingkan.",
        },
        {
          isCorrect: true,
          label:
            "Data dikumpulkan di lingkungan warga dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data dikumpulkan pada di lingkungan warga lalu di bandingkan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
