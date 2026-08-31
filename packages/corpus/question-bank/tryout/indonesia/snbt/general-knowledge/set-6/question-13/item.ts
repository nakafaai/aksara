import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Zwei Vorschläge lösen eine Debatte über Authentizität aus; die Materialprüfung führt zum minimalen Eingriff.",
        },
        {
          isCorrect: false,
          label:
            'Der erste Teil vertritt die Behauptung "Die älteste Farbe wurde nur in wenigen Räumen gefunden"; der folgende nutzt "Jedes alte Material muss erhalten bleiben, selbst wenn es Besucher gefährdet" als Hauptbeleg.',
        },
        {
          isCorrect: false,
          label:
            'Der erste Teil legt "Das Gebäude kann nur authentisch sein, wenn jede Fläche eine einzige alte Farbe erhält" als endgültigen Schluss fest; der folgende nennt nur den Plan "Jedes neue Teil wird dokumentiert, damit Veränderungen erkennbar bleiben".',
        },
        {
          isCorrect: false,
          label:
            'Beide Teile halten ohne zusätzliche Prüfung aus derselben Sicht an "Jedes alte Material muss erhalten bleiben, selbst wenn es Besucher gefährdet" fest.',
        },
        {
          isCorrect: false,
          label:
            'Der folgende Teil kehrt die Argumentation um und leitet "Das Gebäude kann nur authentisch sein, wenn jede Fläche eine einzige alte Farbe erhält" aus dem Beleg "Die älteste Farbe wurde nur in wenigen Räumen gefunden" ab.',
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Two proposals raise a debate about authenticity, and material investigation guides the minimum-intervention choice.",
        },
        {
          isCorrect: false,
          label:
            'The first part advances the claim "The oldest paint was found in only a few rooms", and the later part uses "Every old material must be retained even when it endangers visitors" as its main support.',
        },
        {
          isCorrect: false,
          label:
            'The first part establishes "The building can be authentic only if every surface is returned to one old colour" as a final conclusion; the later part only states the plan "Every new part will be recorded so changes remain legible".',
        },
        {
          isCorrect: false,
          label:
            'Both parts maintain the claim "Every old material must be retained even when it endangers visitors" from the same perspective without adding a test.',
        },
        {
          isCorrect: false,
          label:
            'The later part reverses the argument by deriving "The building can be authentic only if every surface is returned to one old colour" from the evidence "The oldest paint was found in only a few rooms".',
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Dua usulan memunculkan perdebatan tentang keaslian, lalu pemeriksaan material mengarahkan pilihan intervensi minimum.",
        },
        {
          isCorrect: false,
          label:
            'Bagian awal mengajukan klaim "Cat tertua hanya ditemukan di beberapa ruang", lalu bagian kedua memakai "Semua bahan lama harus dipertahankan meskipun membahayakan pengunjung" sebagai dukungan utama.',
        },
        {
          isCorrect: false,
          label:
            'Bagian pertama menetapkan "Bangunan hanya dapat disebut autentik jika seluruh permukaannya dikembalikan ke satu warna lama" sebagai simpulan final; bagian berikutnya hanya menyebut rencana "Setiap bagian baru akan dicatat agar perubahan tetap terbaca".',
        },
        {
          isCorrect: false,
          label:
            'Kedua bagian mempertahankan klaim "Semua bahan lama harus dipertahankan meskipun membahayakan pengunjung" dari sudut yang sama tanpa menambahkan pemeriksaan.',
        },
        {
          isCorrect: false,
          label:
            'Bagian kedua membalik arah pembahasan dengan menyimpulkan "Bangunan hanya dapat disebut autentik jika seluruh permukaannya dikembalikan ke satu warna lama" dari bukti "Cat tertua hanya ditemukan di beberapa ruang".',
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
