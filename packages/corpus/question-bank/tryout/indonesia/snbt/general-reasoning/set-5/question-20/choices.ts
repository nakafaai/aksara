import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label:
        "The first outcome, in which employees resign and receive severance pay, does not occur",
      value: true,
    },
    {
      label: "The employees chose to close the company",
      value: false,
    },
    {
      label: "Some employees receive severance pay under the first outcome",
      value: false,
    },
    {
      label: "Both outcomes occur",
      value: false,
    },
    {
      label: "Neither outcome occurs",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Hasil pertama, yaitu karyawan mengundurkan diri dan menerima pesangon, tidak terjadi",
      value: true,
    },
    {
      label: "Karyawan memilih untuk menutup perusahaan",
      value: false,
    },
    {
      label: "Sebagian karyawan menerima pesangon menurut hasil pertama",
      value: false,
    },
    {
      label: "Kedua hasil terjadi",
      value: false,
    },
    {
      label: "Tidak satu pun hasil terjadi",
      value: false,
    },
  ],
};

export default choices;
