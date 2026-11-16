import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "reproduction-and-growth-in-humans-and-animals",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Absolute growth rate: 12 to 14 years; relative growth rate: 12 to 14 years",
        },
        {
          correct: true,
          label:
            "Absolute growth rate: 12 to 14 years; relative growth rate: 2 to 4 years",
        },
        {
          correct: false,
          label:
            "Absolute growth rate: 2 to 4 years; relative growth rate: 12 to 14 years",
        },
        {
          correct: false,
          label:
            "Absolute growth rate: 12 to 14 years; relative growth rate: 4 to 6 years",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kadar pertumbuhan mutlak: 12 hingga 14 tahun; kadar pertumbuhan relatif: 12 hingga 14 tahun",
        },
        {
          correct: true,
          label:
            "Kadar pertumbuhan mutlak: 12 hingga 14 tahun; kadar pertumbuhan relatif: 2 hingga 4 tahun",
        },
        {
          correct: false,
          label:
            "Kadar pertumbuhan mutlak: 2 hingga 4 tahun; kadar pertumbuhan relatif: 12 hingga 14 tahun",
        },
        {
          correct: false,
          label:
            "Kadar pertumbuhan mutlak: 12 hingga 14 tahun; kadar pertumbuhan relatif: 4 hingga 6 tahun",
        },
      ],
    },
  },
};

export default item;
