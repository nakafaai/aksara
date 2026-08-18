import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  id: [
    {
      label: "Persetujuan yang dicapai melalui penyesuaian atau jalan damai",
      value: true,
    },
    {
      label: "Percakapan tanpa tujuan di dalam suatu kelompok",
      value: false,
    },
    {
      label: "Kerja sama yang menghapus seluruh perbedaan",
      value: false,
    },
    {
      label: "Pemungutan suara untuk menentukan pihak yang menang",
      value: false,
    },
    {
      label: "Penyerahan penuh satu pihak kepada pihak lain",
      value: false,
    },
  ],
};

export default choices;
