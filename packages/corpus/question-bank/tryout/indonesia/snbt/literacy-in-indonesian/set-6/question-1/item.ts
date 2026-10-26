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
            "Simulasi membandingkan pengaruh tali sepanjang $$60$$ sentimeter terhadap periode ayunan bandul, sambil mengendalikan faktor yang disebutkan tetapi menjadikan satu uji singkat sebagai bukti yang berlaku umum.",
        },
        {
          correct: false,
          label:
            "Simulasi membandingkan pengaruh tali sepanjang $$60$$ sentimeter terhadap periode ayunan bandul, sambil menyebut keterbatasan tetapi mengeluarkan kondisi pembanding dari penafsiran hasil.",
        },
        {
          correct: true,
          label:
            "Percobaan membandingkan periode bandul bertali $$60$$ dan $$100$$ sentimeter dalam kondisi terkontrol, lalu membatasi simpulan karena baru dua panjang yang diuji dan waktu dicatat manual.",
        },
        {
          correct: false,
          label:
            "Simulasi membandingkan pengaruh tali sepanjang $$60$$ sentimeter terhadap periode ayunan bandul, sambil menjadikan definisi istilah ilmiah sebagai hasil ukur yang menutup penelitian.",
        },
        {
          correct: false,
          label:
            "Simulasi membandingkan pengaruh tali sepanjang $$60$$ sentimeter terhadap periode ayunan bandul, sambil memakai pembanding hanya untuk mengukuhkan hipotesis awal dan menghapus ketidakpastian yang tersisa.",
        },
      ],
    },
  },
};

export default item;
