import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  id: [
    { label: "Perkembangan harga beras di Indonesia", value: false },
    {
      label: "Informasi negara selain Indonesia yang mengonsumsi beras",
      value: false,
    },
    {
      label:
        "Hasil penelitian tentang pengaruh pencucian terhadap tekstur nasi",
      value: true,
    },
    { label: "Informasi terkait olahan beras", value: false },
    {
      label: "Cara memasak nasi tanpa menyisakan pati di dalam butirannya",
      value: false,
    },
  ],
};

export default choices;
