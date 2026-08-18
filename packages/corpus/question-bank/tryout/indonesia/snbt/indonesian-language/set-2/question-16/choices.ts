import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  id: [
    { label: "Membuktikan bahwa semua catatan Romawi keliru", value: false },
    {
      label: "Menentukan secara pasti identitas setiap penduduk Pompeii",
      value: false,
    },
    {
      label: "Menetapkan harga setiap benda peninggalan Romawi",
      value: false,
    },
    {
      label: "Menunjukkan bahwa kehidupan Romawi hanya berpusat pada seni",
      value: false,
    },
    {
      label: "Membantu memahami kehidupan masyarakat Pompeii pada masa itu",
      value: true,
    },
  ],
};

export default choices;
