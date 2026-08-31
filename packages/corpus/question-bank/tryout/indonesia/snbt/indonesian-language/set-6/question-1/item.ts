import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Simulasi membandingkan pengaruh tali sepanjang 60 sentimeter terhadap periode ayunan bandul, sambil mengendalikan faktor yang disebutkan tetapi menjadikan satu uji singkat sebagai bukti yang berlaku umum.",
        },
        {
          isCorrect: false,
          label:
            "Simulasi membandingkan pengaruh tali sepanjang 60 sentimeter terhadap periode ayunan bandul, sambil menyebut keterbatasan tetapi mengeluarkan kondisi pembanding dari penafsiran hasil.",
        },
        {
          isCorrect: true,
          label:
            "Percobaan membandingkan periode bandul bertali 60 dan 100 sentimeter dalam kondisi terkontrol, lalu membatasi simpulan karena baru dua panjang yang diuji dan waktu dicatat manual.",
        },
        {
          isCorrect: false,
          label:
            "Simulasi membandingkan pengaruh tali sepanjang 60 sentimeter terhadap periode ayunan bandul, sambil menjadikan definisi istilah ilmiah sebagai hasil ukur yang menutup penelitian.",
        },
        {
          isCorrect: false,
          label:
            "Simulasi membandingkan pengaruh tali sepanjang 60 sentimeter terhadap periode ayunan bandul, sambil memakai pembanding hanya untuk mengukuhkan hipotesis awal dan menghapus ketidakpastian yang tersisa.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
