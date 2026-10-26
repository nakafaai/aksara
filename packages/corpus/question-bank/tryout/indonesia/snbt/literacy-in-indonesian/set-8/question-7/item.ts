import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Laju pendinginan rata-rata aluminium sekitar $$1{,}27^\\circ\\text{C}$$ per menit, sehingga bahan aluminium pasti menjadi satu-satunya penyebab seluruh penurunan suhu.",
        },
        {
          correct: false,
          label:
            "Perbedaan ketebalan dinding membuat laju pendinginan yang tampak pada tabel tidak dapat dibandingkan sama sekali.",
        },
        {
          correct: false,
          label:
            "Kesamaan volume dan suhu awal membuat laju tersebut dapat diterapkan langsung pada semua wadah aluminium dan plastik.",
        },
        {
          correct: false,
          label:
            "Definisi konduksi sudah cukup membuktikan bahwa perbedaan laju berasal dari bahan, meskipun ketebalan dan penguapan belum disamakan.",
        },
        {
          correct: true,
          label:
            "Laju pendinginan rata-rata sekitar $$1{,}27^\\circ\\text{C}$$ per menit pada aluminium dan $$0{,}73^\\circ\\text{C}$$ per menit pada polipropilena mendukung adanya perbedaan, tetapi rancangan belum mengisolasi bahan sebagai penyebabnya.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
