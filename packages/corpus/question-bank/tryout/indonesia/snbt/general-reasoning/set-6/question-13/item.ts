import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Peternak ayam mandiri mengalami kerugian.",
        },
        {
          correct: false,
          label: "Mitra dagang telah membatasi ekspor negara tersebut.",
        },
        {
          correct: false,
          label:
            "Sebuah putusan dagang secara langsung menyebabkan penurunan harga di tingkat peternak.",
        },
        {
          correct: false,
          label:
            "Retaliasi merupakan satu-satunya faktor yang menentukan neraca perdagangan.",
        },
        {
          correct: false,
          label: "Impor ayam yang diusulkan telah masuk ke pasar lokal.",
        },
      ],
    },
  },
};

export default item;
