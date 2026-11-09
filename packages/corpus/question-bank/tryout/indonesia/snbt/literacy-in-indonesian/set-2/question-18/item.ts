import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Menjaga pintu masuk rumah dari pencuri",
        },
        {
          correct: false,
          label: "Membawa hasil panen dari luar kota",
        },
        {
          correct: false,
          label: "Menghias bagian hunian dengan lukisan dinding",
        },
        {
          correct: false,
          label: "Menjual roti langsung kepada pembeli di jalan",
        },
        {
          correct: true,
          label: "Menggiling biji-bijian yang diperlukan untuk membuat roti",
        },
      ],
    },
  },
};

export default item;
