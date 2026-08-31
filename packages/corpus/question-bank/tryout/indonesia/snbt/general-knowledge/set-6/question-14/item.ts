import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Authentizität kann Veränderungsspuren mehrerer Zeiten umfassen statt die perfekte Nachahmung einer Phase.",
        },
        {
          isCorrect: false,
          label:
            "Jedes alte Material muss erhalten bleiben, selbst wenn es Besucher gefährdet.",
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
            "Authentische Restaurierung verbindet Sicherheit, materielle Belege und sichtbare Veränderungen, statt ein Gebäude nur neu oder alt erscheinen zu lassen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Authenticity can include traces of change across periods rather than a perfect imitation of one historical stage.",
        },
        {
          isCorrect: false,
          label:
            "Every old material must be retained even when it endangers visitors.",
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
          label:
            "Authentic restoration balances safety, material evidence, and visible change rather than merely making a building look new or old.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Keaslian dapat mencakup jejak perubahan lintas masa, bukan tiruan sempurna atas satu tahap sejarah.",
        },
        {
          isCorrect: false,
          label:
            "Semua bahan lama harus dipertahankan meskipun membahayakan pengunjung.",
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
            "Pemugaran yang autentik menyeimbangkan keselamatan, bukti material, dan keterbacaan perubahan, bukan sekadar membuat bangunan tampak baru atau tua.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
