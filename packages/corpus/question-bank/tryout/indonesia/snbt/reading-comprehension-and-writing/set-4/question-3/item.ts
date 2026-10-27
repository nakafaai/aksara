import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pengamatan awal membuktikan bahwa label foto menyebabkan perbedaan hasil.",
        },
        {
          correct: false,
          label:
            "Tim perlu mengubah beberapa unsur layanan sekaligus sebelum mengukur ulang.",
        },
        {
          correct: false,
          label: "Pola awal membenarkan penerapan permanen label foto.",
        },
        {
          correct: false,
          label:
            "Ketidakpastian yang tersisa membuat perbandingan lanjutan tidak diperlukan.",
        },
        {
          correct: true,
          label:
            "Oleh karena itu, hipotesis tersebut perlu diuji dengan menambahkan label foto pada rak.",
        },
      ],
    },
  },
};

export default item;
