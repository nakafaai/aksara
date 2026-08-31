import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Daten worden im Kontext Fundbüroservice erhebt und danach vergleichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden an den Kontext Fundbüroservice erhoben und danach verglichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden in diesem Kontext erhoben Fundbüroservice anschließend sie verglichen wurden.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden von Fundbüroservice erheben und anschließend vergleicht.",
        },
        {
          isCorrect: true,
          label:
            "Die Daten wurden in diesem Kontext erhoben: Fundbüroservice. Anschließend wurden sie verglichen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Data were collected at this setting (lost-property service) and compared afterward in.",
        },
        {
          isCorrect: false,
          label:
            "Data was collect in this setting (lost-property service) and comparing afterward.",
        },
        {
          isCorrect: false,
          label:
            "Data were collected on this setting (lost-property service) and afterward compared it.",
        },
        {
          isCorrect: false,
          label:
            "Data collected this setting (lost-property service) and were comparison afterward.",
        },
        {
          isCorrect: true,
          label:
            "Data were collected in this setting (lost-property service) and compared afterward.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Data di ukur di layanan pencarian barang hilang dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data diukur didepan layanan pencarian barang hilang dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data mengukur di layanan pencarian barang hilang dan kemudian membandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data diukur pada di layanan pencarian barang hilang lalu di bandingkan.",
        },
        {
          isCorrect: true,
          label:
            "Data diukur di layanan pencarian barang hilang dan kemudian dibandingkan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
