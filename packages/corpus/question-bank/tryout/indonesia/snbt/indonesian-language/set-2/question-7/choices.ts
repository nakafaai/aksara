import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  id: [
    { label: "Semua bacaannya merupakan karya terkenal", value: false },
    {
      label: "Semua fitur dapat digunakan tanpa berlangganan",
      value: false,
    },
    { label: "Aplikasi dapat digunakan tanpa perangkat digital", value: false },
    { label: "Aplikasi tidak memerlukan ruang penyimpanan", value: false },
    { label: "Bacaan tersedia dalam berbagai bahasa", value: true },
  ],
};

export default choices;
