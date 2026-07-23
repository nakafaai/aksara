import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "Most areas in Jakarta will be flooded",
      value: false,
    },
    {
      label: "No areas in Jakarta will be flooded",
      value: false,
    },
    {
      label: "Residents will be forced to evacuate to a safe place",
      value: true,
    },
    {
      label: "Some residents will not evacuate",
      value: false,
    },
    {
      label: "Cannot be concluded",
      value: false,
    },
  ],
  id: [
    {
      label: "Sebagian besar wilayah di Jakarta akan terendam banjir",
      value: false,
    },
    {
      label: "Tidak ada wilayah di Jakarta yang akan terendam banjir",
      value: false,
    },
    {
      label: "Penduduk terpaksa akan mengungsi ke tempat aman",
      value: true,
    },
    {
      label: "Sebagian penduduk tidak akan mengungsi",
      value: false,
    },
    {
      label: "Tidak dapat disimpulkan",
      value: false,
    },
  ],
};

export default choices;
