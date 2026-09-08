import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Die Daten wurden im Kompostierworkshop erhoben und anschließend verglichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten worden im Kompostierworkshop erhebt und danach vergleichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden an den Kompostierworkshop erhoben und danach verglichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden im Kompostierworkshop erhoben anschließend sie verglichen wurden.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden von Kompostierworkshop erheben und anschließend vergleicht.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Data were collected in the composting workshop and compared afterward.",
        },
        {
          isCorrect: false,
          label:
            "Data were collected at the composting workshop and compared afterward in.",
        },
        {
          isCorrect: false,
          label:
            "Data was collect in the composting workshop and comparing afterward.",
        },
        {
          isCorrect: false,
          label:
            "Data were collected on the composting workshop and afterward compared it.",
        },
        {
          isCorrect: false,
          label:
            "Data collected the composting workshop and were comparison afterward.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Data dikumpulkan di lokakarya kompos dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data di kumpulkan di lokakarya kompos dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data dikumpulkan didepan lokakarya kompos dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data mengumpulkan di lokakarya kompos dan kemudian membandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data dikumpulkan pada di lokakarya kompos lalu di bandingkan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
