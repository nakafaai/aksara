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
            "Authentizität verlangt, alle Pflegespuren aus der Zeit nach der ersten Nutzung zu entfernen.",
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
            "Authenticity requires removing every trace of care added after the building first came into use.",
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
            "Keaslian mensyaratkan penghapusan seluruh jejak perawatan yang dilakukan setelah bangunan pertama kali digunakan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
