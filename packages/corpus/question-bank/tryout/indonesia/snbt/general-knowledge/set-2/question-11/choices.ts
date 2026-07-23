import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "milk that does not contain sugar elements.",
      value: false,
    },
    {
      label: "milk specifically for the elderly.",
      value: false,
    },
    {
      label: "a typical drink for certain diseases.",
      value: false,
    },
    {
      label: "milk that has undergone fermentation.",
      value: true,
    },
    {
      label: "mixing milk with oxygen elements.",
      value: false,
    },
  ],
  id: [
    {
      label: "susu yang tidak mengandung unsur gula.",
      value: false,
    },
    {
      label: "susu yang dikhususkan untuk para manula.",
      value: false,
    },
    {
      label: "minuman khas untuk penyakit tertentu.",
      value: false,
    },
    {
      label: "susu yang sudah mengalami peragian.",
      value: true,
    },
    {
      label: "pencampuran susu dengan unsur oksigen.",
      value: false,
    },
  ],
};

export default choices;
