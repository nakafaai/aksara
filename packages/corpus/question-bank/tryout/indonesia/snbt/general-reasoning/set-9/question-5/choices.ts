import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "Side sleeping may help reduce snoring for some people",
      value: false,
    },
    {
      label: "Back sleeping can narrow the airway in some people",
      value: false,
    },
    {
      label: "Snoring can have causes other than sleep position",
      value: false,
    },
    {
      label:
        "Side sleeping guarantees that all snoring will stop and makes medical assessment unnecessary",
      value: true,
    },
    {
      label:
        "Snoring with breathing pauses, gasping, or choking should be medically assessed",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Tidur menyamping dapat membantu mengurangi dengkuran pada sebagian orang",
      value: false,
    },
    {
      label:
        "Tidur telentang dapat mempersempit jalan napas pada sebagian orang",
      value: false,
    },
    {
      label: "Dengkuran dapat disebabkan oleh faktor selain posisi tidur",
      value: false,
    },
    {
      label:
        "Tidur menyamping menjamin semua dengkuran berhenti dan membuat pemeriksaan medis tidak diperlukan",
      value: true,
    },
    {
      label:
        "Dengkuran yang disertai jeda napas, terengah-engah, atau tersedak perlu diperiksakan",
      value: false,
    },
  ],
};

export default choices;
