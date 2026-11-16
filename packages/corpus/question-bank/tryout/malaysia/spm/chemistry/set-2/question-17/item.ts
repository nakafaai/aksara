import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "periodic-table",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "P is the strongest oxidising agent of the three, so P water reacts with potassium R solution" },
        { correct: false, label: "Q is the most reactive, because Q is released from potassium Q solution" },
        { correct: false, label: "R is the strongest oxidising agent of the three, because it is released last" },
        { correct: false, label: "Q water reacts with potassium P solution, because Q is more reactive than R" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "P ialah agen pengoksidaan paling kuat antara ketiga-tiganya, jadi air P bertindak balas dengan larutan kalium R" },
        { correct: false, label: "Q paling reaktif, kerana Q dibebaskan daripada larutan kalium Q" },
        { correct: false, label: "R ialah agen pengoksidaan paling kuat antara ketiga-tiganya, kerana ia dibebaskan terakhir" },
        { correct: false, label: "Air Q bertindak balas dengan larutan kalium P, kerana Q lebih reaktif daripada R" },
      ],
    },
  },
};

export default item;
