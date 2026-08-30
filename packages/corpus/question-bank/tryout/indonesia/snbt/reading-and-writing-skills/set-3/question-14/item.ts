import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Daten worden im Kontext Kompostierworkshop erhebt und danach vergleichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden an den Kontext Kompostierworkshop erhoben und danach verglichen.",
        },
        {
          isCorrect: true,
          label:
            "Die Daten wurden in diesem Kontext erhoben: Kompostierworkshop. Anschließend wurden sie verglichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden in diesem Kontext erhoben Kompostierworkshop anschließend sie verglichen wurden.",
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
          isCorrect: false,
          label:
            "Data were collected at this setting (composting workshop) and compared afterward in.",
        },
        {
          isCorrect: false,
          label:
            "Data was collect in this setting (composting workshop) and comparing afterward.",
        },
        {
          isCorrect: true,
          label:
            "Data were collected in this setting (composting workshop) and compared afterward.",
        },
        {
          isCorrect: false,
          label:
            "Data were collected on this setting (composting workshop) and afterward compared it.",
        },
        {
          isCorrect: false,
          label:
            "Data collected this setting (composting workshop) and were comparison afterward.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Data di ukur di lokakarya pembuatan kompos dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data diukur didepan lokakarya pembuatan kompos dan kemudian dibandingkan.",
        },
        {
          isCorrect: true,
          label:
            "Data diukur di lokakarya pembuatan kompos dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data mengukur di lokakarya pembuatan kompos dan kemudian membandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data diukur pada di lokakarya pembuatan kompos lalu di bandingkan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
