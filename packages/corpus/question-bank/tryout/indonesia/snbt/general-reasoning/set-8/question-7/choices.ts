import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "Every component on rack C passed the initial inspection.",
      value: false,
    },
    {
      label:
        "A component that fails the initial inspection never enters the durability test.",
      value: false,
    },
    {
      label: "Every component with a blue seal is placed on rack C.",
      value: true,
    },
    {
      label: "Only components with blue seals enter the durability test.",
      value: false,
    },
    {
      label: "Every component inspected initially receives a blue seal.",
      value: false,
    },
  ],
  id: [
    {
      label: "Setiap komponen di rak C telah lolos pemeriksaan awal.",
      value: false,
    },
    {
      label:
        "Komponen yang gagal dalam pemeriksaan awal tidak pernah menjalani uji ketahanan.",
      value: false,
    },
    {
      label: "Setiap komponen bersegel biru ditempatkan di rak C.",
      value: true,
    },
    {
      label: "Hanya komponen bersegel biru yang menjalani uji ketahanan.",
      value: false,
    },
    {
      label:
        "Setiap komponen yang diperiksa pada tahap awal mendapat segel biru.",
      value: false,
    },
  ],
};

export default choices;
