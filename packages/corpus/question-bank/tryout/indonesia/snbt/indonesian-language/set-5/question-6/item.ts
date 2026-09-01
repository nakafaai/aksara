import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Karena jenis baterai dijaga sama, perilaku kedua susunan pada model dapat dianggap sama persis dengan perilaku instalasi rumah.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menjelaskan rangkaian tertutup sebagai hasil utama, bukan sebagai bagian dari penelitian.",
        },
        {
          isCorrect: false,
          label:
            "Perbandingan seri dan paralel sudah cukup menjelaskan keselamatan instalasi rumah, sedangkan batas tegangan hanya memengaruhi terang lampu.",
        },
        {
          isCorrect: false,
          label:
            "Karena tidak meniru instalasi rumah, model tersebut tidak dapat dipakai untuk menjelaskan hubungan susunan komponen dan perilaku lampu.",
        },
        {
          isCorrect: true,
          label:
            "Rangkaian listrik dengan dua lampu menyederhanakan proses agar dapat diperiksa sambil tetap memiliki batas representasi.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
