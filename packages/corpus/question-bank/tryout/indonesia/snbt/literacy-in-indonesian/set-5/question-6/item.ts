import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Karena jenis baterai dijaga sama, perilaku kedua susunan pada model dapat dianggap sama persis dengan perilaku instalasi rumah.",
        },
        {
          correct: false,
          label:
            "Bacaan hanya mendefinisikan rangkaian tertutup tanpa membandingkan susunan komponen atau membahas perilaku lampu.",
        },
        {
          correct: false,
          label:
            "Perbandingan seri dan paralel sudah cukup menjelaskan keselamatan instalasi rumah, sedangkan batas tegangan hanya memengaruhi terang lampu.",
        },
        {
          correct: false,
          label:
            "Karena tidak meniru instalasi rumah, model tersebut tidak dapat dipakai untuk menjelaskan hubungan susunan komponen dan perilaku lampu.",
        },
        {
          correct: true,
          label:
            "Rangkaian listrik dengan dua lampu menyederhanakan proses agar dapat diperiksa sambil tetap memiliki batas representasi.",
        },
      ],
    },
  },
};

export default item;
