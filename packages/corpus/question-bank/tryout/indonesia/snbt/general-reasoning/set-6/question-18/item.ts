import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Semua makanan gorengan mengandung lemak trans industri.",
        },
        {
          correct: false,
          label:
            "Mengurangi konsumsi lemak trans industri menjamin seseorang tidak mengalami penyakit jantung koroner.",
        },
        {
          correct: false,
          label:
            "Perubahan LDL dan HDL saling meniadakan sehingga risiko penyakit jantung tidak berubah.",
        },
        {
          correct: true,
          label:
            "Mengurangi konsumsi lemak trans industri mengurangi paparan terhadap faktor risiko pola makan yang dapat dicegah untuk penyakit jantung koroner.",
        },
        {
          correct: false,
          label:
            "Membatasi lemak trans industri hanya bermanfaat bagi orang yang sudah menderita penyakit jantung koroner.",
        },
      ],
    },
  },
};

export default item;
