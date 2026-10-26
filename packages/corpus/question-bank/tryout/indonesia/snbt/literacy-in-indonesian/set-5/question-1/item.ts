import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Simulasi membandingkan kemampuan susunan kerikil, pasir, dan arang dengan ketebalan sama dalam menyaring air keruh, sambil mengendalikan faktor yang disebutkan tetapi menjadikan satu uji singkat sebagai bukti yang berlaku umum.",
        },
        {
          correct: true,
          label:
            "Simulasi membandingkan kemampuan susunan kerikil, pasir, dan arang dengan ketebalan sama dalam menyaring air keruh, sambil mengendalikan faktor lain dan mengakui keterbatasan pengukuran.",
        },
        {
          correct: false,
          label:
            "Simulasi membandingkan kemampuan susunan kerikil, pasir, dan arang dengan ketebalan sama dalam menyaring air keruh, sambil menyebut keterbatasan tetapi mengeluarkan kondisi pembanding dari penafsiran hasil.",
        },
        {
          correct: false,
          label:
            "Simulasi membandingkan kemampuan susunan kerikil, pasir, dan arang dengan ketebalan sama dalam menyaring air keruh, sambil menjadikan definisi istilah ilmiah sebagai hasil ukur yang menutup penelitian.",
        },
        {
          correct: false,
          label:
            "Simulasi membandingkan kemampuan susunan kerikil, pasir, dan arang dengan ketebalan sama dalam menyaring air keruh, sambil memakai pembanding hanya untuk mengukuhkan hipotesis awal dan menghapus ketidakpastian yang tersisa.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
