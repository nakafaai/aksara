import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "All $$120$$ tomato seedlings survived the first month.",
      value: false,
    },
    {
      label: "All $$96$$ surviving seedlings produced new leaves.",
      value: false,
    },
    {
      label:
        "The report proved that the surviving seedlings were disease-free.",
      value: false,
    },
    {
      label: "$$72$$ of the surviving seedlings produced new leaves.",
      value: true,
    },
    {
      label: "The surviving seedlings produced more fruit than the others.",
      value: false,
    },
  ],
  id: [
    {
      label: "Seluruh $$120$$ bibit tomat bertahan hidup selama bulan pertama.",
      value: false,
    },
    {
      label: "Seluruh $$96$$ bibit yang bertahan hidup menghasilkan daun baru.",
      value: false,
    },
    {
      label:
        "Laporan membuktikan bahwa bibit yang bertahan bebas dari penyakit.",
      value: false,
    },
    {
      label:
        "Sebanyak $$72$$ bibit yang bertahan hidup menghasilkan daun baru.",
      value: true,
    },
    {
      label:
        "Bibit yang bertahan menghasilkan lebih banyak buah daripada bibit lainnya.",
      value: false,
    },
  ],
};

export default choices;
