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
            "Data awal telah membuktikan bahwa kartu pertanyaan menyebabkan perbedaan.",
        },
        {
          correct: false,
          label:
            "Tim perlu mengubah beberapa unsur tur sekaligus sebelum mengukur ulang.",
        },
        {
          correct: true,
          label:
            "Oleh karena itu, dugaan tentang kegunaan kartu pertanyaan perlu diuji pada setiap meja demonstrasi.",
        },
        {
          correct: false,
          label:
            "Pola awal membenarkan penggunaan kartu pertanyaan secara permanen.",
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
