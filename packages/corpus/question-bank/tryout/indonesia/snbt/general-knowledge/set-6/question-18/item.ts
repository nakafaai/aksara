import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Jedes alte Material muss erhalten bleiben, selbst wenn es Besucher gefährdet.",
        },
        {
          isCorrect: true,
          label:
            "Ein minimaler Eingriff kann mehr historische Informationen bewahren und dennoch Gefahren beseitigen.",
        },
        {
          isCorrect: false,
          label:
            "Das Gebäude kann nur authentisch sein, wenn jede Fläche eine einzige alte Farbe erhält.",
        },
        {
          isCorrect: false,
          label: "Die älteste Farbe wurde nur in wenigen Räumen gefunden.",
        },
        {
          isCorrect: false,
          label:
            "Jedes neue Teil wird dokumentiert, damit Veränderungen erkennbar bleiben.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Every old material must be retained even when it endangers visitors.",
        },
        {
          isCorrect: true,
          label:
            "Minimum intervention can preserve more historical information while still addressing dangerous elements.",
        },
        {
          isCorrect: false,
          label:
            "The building can be authentic only if every surface is returned to one old colour.",
        },
        {
          isCorrect: false,
          label: "The oldest paint was found in only a few rooms.",
        },
        {
          isCorrect: false,
          label: "Every new part will be recorded so changes remain legible.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Semua bahan lama harus dipertahankan meskipun membahayakan pengunjung.",
        },
        {
          isCorrect: true,
          label:
            "Intervensi minimum dapat mempertahankan lebih banyak informasi sejarah selama bagian berbahaya tetap ditangani.",
        },
        {
          isCorrect: false,
          label:
            "Bangunan hanya dapat disebut autentik jika seluruh permukaannya dikembalikan ke satu warna lama.",
        },
        {
          isCorrect: false,
          label: "Cat tertua hanya ditemukan di beberapa ruang.",
        },
        {
          isCorrect: false,
          label:
            "Setiap bagian baru akan dicatat agar perubahan tetap terbaca.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
