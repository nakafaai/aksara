import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pengamatan awal membuktikan bahwa pengelompokan bahan menyebabkan perbedaan.",
        },
        {
          correct: false,
          label:
            "Tim perlu mengubah beberapa unsur kelas sekaligus sebelum mengukur ulang.",
        },
        {
          correct: false,
          label: "Pola awal membenarkan pengelompokan bahan secara permanen.",
        },
        {
          correct: true,
          label:
            "Oleh karena itu, dugaan tersebut perlu diuji dengan mengelompokkan bahan menurut tahap resep.",
        },
        {
          correct: false,
          label:
            "Ketidakpastian yang tersisa membuat perbandingan lanjutan tidak diperlukan.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
