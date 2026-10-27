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
            "Data awal telah membuktikan bahwa label lokasi menyebabkan perbedaan.",
        },
        {
          correct: false,
          label:
            "Tim perlu mengubah beberapa unsur pembagian bibit sekaligus sebelum mengukur ulang.",
        },
        {
          correct: true,
          label:
            "Oleh karena itu, dugaan tentang kegunaan label lokasi perlu diuji pada setiap baki bibit.",
        },
        {
          correct: false,
          label:
            "Pola awal membenarkan penggunaan label lokasi secara permanen.",
        },
        {
          correct: false,
          label:
            "Ketidakpastian yang tersisa membuat perbandingan lanjutan tidak diperlukan.",
        },
      ],
    },
  },
};

export default item;
