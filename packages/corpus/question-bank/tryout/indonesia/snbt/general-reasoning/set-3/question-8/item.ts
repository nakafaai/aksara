import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Setiap orang yang mengalami delirium pasti terinfeksi SARS-CoV-2.",
        },
        {
          isCorrect: false,
          label: "Delirium dapat terjadi pada penyakit akut selain COVID-19.",
        },
        {
          isCorrect: false,
          label:
            "Sebagian orang lanjut usia dengan COVID-19 dapat mengalami delirium.",
        },
        {
          isCorrect: false,
          label:
            "Delirium muncul secara akut dan tanda-tandanya dapat berfluktuasi.",
        },
        {
          isCorrect: false,
          label:
            "Dugaan delirium perlu diperiksa untuk mencari penyebab dasarnya.",
        },
      ],
    },
  },
};

export default item;
