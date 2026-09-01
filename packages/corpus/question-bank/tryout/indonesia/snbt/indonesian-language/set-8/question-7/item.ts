import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Laju pendinginan rata-rata aluminium sekitar 1,27°C per menit, sehingga bahan aluminium pasti menjadi satu-satunya penyebab seluruh penurunan suhu.",
        },
        {
          isCorrect: false,
          label:
            "Perbedaan ketebalan dinding membuat laju pendinginan yang tampak pada tabel tidak dapat dibandingkan sama sekali.",
        },
        {
          isCorrect: false,
          label:
            "Kesamaan volume dan suhu awal membuat laju tersebut dapat diterapkan langsung pada semua wadah aluminium dan plastik.",
        },
        {
          isCorrect: false,
          label:
            "Definisi konduksi sudah cukup membuktikan bahwa perbedaan laju berasal dari bahan, meskipun ketebalan dan penguapan belum disamakan.",
        },
        {
          isCorrect: true,
          label:
            "Laju pendinginan rata-rata sekitar 1,27°C per menit pada aluminium dan 0,73°C per menit pada polipropilena mendukung adanya perbedaan, tetapi rancangan belum mengisolasi bahan sebagai penyebabnya.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
