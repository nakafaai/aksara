import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "Nitrogen and phosphorus always harm floodplain soils",
      value: false,
    },
    {
      label: "Floodplains can only export material and never retain it",
      value: false,
    },
    {
      label: "Floodplains can retain sediment and nutrients",
      value: true,
    },
    {
      label:
        "Floodplains only accumulate material and never lose it through erosion",
      value: false,
    },
    {
      label: "Every flood makes every floodplain soil more fertile",
      value: false,
    },
  ],
  id: [
    {
      label: "Nitrogen dan fosfor selalu merusak tanah dataran banjir",
      value: false,
    },
    {
      label:
        "Dataran banjir hanya dapat melepas bahan dan tidak pernah menahannya",
      value: false,
    },
    {
      label: "Dataran banjir dapat menahan sedimen dan unsur hara",
      value: true,
    },
    {
      label:
        "Dataran banjir hanya menumpuk bahan dan tidak pernah kehilangannya akibat erosi",
      value: false,
    },
    {
      label: "Setiap banjir membuat semua tanah dataran banjir lebih subur",
      value: false,
    },
  ],
};

export default choices;
