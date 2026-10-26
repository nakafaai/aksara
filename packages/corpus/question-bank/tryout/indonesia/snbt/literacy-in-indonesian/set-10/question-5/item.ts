import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Sudut $$45$$ Derajat sebagai Aturan untuk Semua Oven Surya",
        },
        {
          correct: true,
          label: "Menguji Sudut Reflektor pada Oven Surya Model",
        },
        {
          correct: false,
          label: "Mengabaikan Iradiansi dalam Perbandingan Suhu Air",
        },
        {
          correct: false,
          label: "Putaran Ketiga yang Menentukan Sudut Terbaik",
        },
        {
          correct: false,
          label: "Mengapa Posisi Oven Tidak Perlu Diputar",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
