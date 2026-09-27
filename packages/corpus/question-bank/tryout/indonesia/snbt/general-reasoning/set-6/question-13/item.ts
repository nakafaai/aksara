import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Peternak ayam mandiri mengalami kerugian.",
        },
        {
          isCorrect: false,
          label: "Mitra dagang telah membatasi ekspor negara tersebut.",
        },
        {
          isCorrect: false,
          label:
            "Sebuah putusan dagang secara langsung menyebabkan penurunan harga di tingkat peternak.",
        },
        {
          isCorrect: false,
          label:
            "Retaliasi merupakan satu-satunya faktor yang menentukan neraca perdagangan.",
        },
        {
          isCorrect: false,
          label: "Impor ayam yang diusulkan telah masuk ke pasar lokal.",
        },
      ],
    },
  },
};

export default item;
