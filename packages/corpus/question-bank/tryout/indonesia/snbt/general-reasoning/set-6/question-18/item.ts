import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Semua makanan gorengan mengandung lemak trans industri.",
        },
        {
          isCorrect: false,
          label:
            "Mengurangi konsumsi lemak trans industri menjamin seseorang tidak mengalami penyakit jantung koroner.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan LDL dan HDL saling meniadakan sehingga risiko penyakit jantung tidak berubah.",
        },
        {
          isCorrect: true,
          label:
            "Mengurangi konsumsi lemak trans industri mengurangi paparan terhadap faktor risiko pola makan yang dapat dicegah untuk penyakit jantung koroner.",
        },
        {
          isCorrect: false,
          label:
            "Membatasi lemak trans industri hanya bermanfaat bagi orang yang sudah menderita penyakit jantung koroner.",
        },
      ],
    },
  },
};

export default item;
