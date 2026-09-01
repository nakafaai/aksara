import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Daten worden im Kontext Lärmprotokoll im Wohngebiet erhebt und danach vergleichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden an den Kontext Lärmprotokoll im Wohngebiet erhoben und danach verglichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden in diesem Kontext erhoben Lärmprotokoll im Wohngebiet anschließend sie verglichen wurden.",
        },
        {
          isCorrect: true,
          label:
            "Die Daten wurden in diesem Kontext erhoben: Lärmprotokoll im Wohngebiet. Anschließend wurden sie verglichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden von Lärmprotokoll im Wohngebiet erheben und anschließend vergleicht.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Data were collected at this setting (neighbourhood noise log) and compared afterward in.",
        },
        {
          isCorrect: false,
          label:
            "Data was collect in this setting (neighbourhood noise log) and comparing afterward.",
        },
        {
          isCorrect: false,
          label:
            "Data were collected on this setting (neighbourhood noise log) and afterward compared it.",
        },
        {
          isCorrect: true,
          label:
            "Data were collected in this setting (neighbourhood noise log) and compared afterward.",
        },
        {
          isCorrect: false,
          label:
            "Data collected this setting (neighbourhood noise log) and were comparison afterward.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Data di kumpulkan dalam pencatatan kebisingan lingkungan, lalu dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data dikumpulkan didalam pencatatan kebisingan lingkungan, lalu dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data mengumpulkan dalam pencatatan kebisingan lingkungan, lalu membandingkan.",
        },
        {
          isCorrect: true,
          label:
            "Data dikumpulkan dalam pencatatan kebisingan lingkungan, lalu dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data dikumpulkan pada dalam pencatatan kebisingan lingkungan, lalu di bandingkan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
