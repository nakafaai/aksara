import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Setiap orang yang mengalami delirium pasti terinfeksi SARS-CoV-2.",
        },
        {
          correct: false,
          label: "Delirium dapat terjadi pada penyakit akut selain COVID-19.",
        },
        {
          correct: false,
          label:
            "Sebagian orang lanjut usia dengan COVID-19 dapat mengalami delirium.",
        },
        {
          correct: false,
          label:
            "Delirium muncul secara akut dan tanda-tandanya dapat berfluktuasi.",
        },
        {
          correct: false,
          label:
            "Dugaan delirium perlu diperiksa untuk mencari penyebab dasarnya.",
        },
      ],
    },
  },
};

export default item;
