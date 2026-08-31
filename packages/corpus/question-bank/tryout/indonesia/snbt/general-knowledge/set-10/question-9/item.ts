import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'Der erste Teil vertritt die Behauptung "Der Maniok wurde im Dorf Rawa geschnitten und in der Stadt frittiert"; der folgende nutzt "Jede Produktionsstufe muss vollständig auf die Vorderseite jeder Packung gedruckt werden" als Hauptbeleg.',
        },
        {
          isCorrect: false,
          label:
            'Der erste Teil legt "Mit einem Code müssen Lieferantendaten nicht mehr aktualisiert werden" als endgültigen Schluss fest; der folgende nennt nur den Plan "Ein Verpackungscode wird zu einem vollständigen Lieferkettendatensatz führen".',
        },
        {
          isCorrect: true,
          label:
            "Die Mehrdeutigkeit der Herkunftsangabe verlangt getrennte Stufen; eine Rückrufsimulation prüft anschließend den Entwurf.",
        },
        {
          isCorrect: false,
          label:
            'Beide Teile halten ohne zusätzliche Prüfung aus derselben Sicht an "Jede Produktionsstufe muss vollständig auf die Vorderseite jeder Packung gedruckt werden" fest.',
        },
        {
          isCorrect: false,
          label:
            'Der folgende Teil kehrt die Argumentation um und leitet "Mit einem Code müssen Lieferantendaten nicht mehr aktualisiert werden" aus dem Beleg "Der Maniok wurde im Dorf Rawa geschnitten und in der Stadt frittiert" ab.',
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'The first part advances the claim "The cassava was sliced in Rawa Village and fried in the city", and the later part uses "Every production stage must be printed in full on the front of every package" as its main support.',
        },
        {
          isCorrect: false,
          label:
            'The first part establishes "Once a code exists, supplier records no longer need updating" as a final conclusion; the later part only states the plan "A package code will link to a fuller supply-chain record".',
        },
        {
          isCorrect: true,
          label:
            "Ambiguity in origin labels creates a need to separate stages, and a recall simulation then tests the new design.",
        },
        {
          isCorrect: false,
          label:
            'Both parts maintain the claim "Every production stage must be printed in full on the front of every package" from the same perspective without adding a test.',
        },
        {
          isCorrect: false,
          label:
            'The later part reverses the argument by deriving "Once a code exists, supplier records no longer need updating" from the evidence "The cassava was sliced in Rawa Village and fried in the city".',
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'Bagian awal mengajukan klaim "Singkong diiris di Desa Rawa dan digoreng di kota", lalu bagian kedua memakai "Semua tahap produksi harus dicetak lengkap di bagian depan setiap kemasan" sebagai dukungan utama.',
        },
        {
          isCorrect: false,
          label:
            'Bagian pertama menetapkan "Jika kode tersedia, catatan pemasok tidak perlu lagi diperbarui" sebagai simpulan final; bagian berikutnya hanya menyebut rencana "Kode kemasan akan mengarah ke catatan rantai pasok yang lebih lengkap".',
        },
        {
          isCorrect: true,
          label:
            "Ambiguitas label asal memunculkan kebutuhan pemisahan tahap, lalu simulasi penarikan menguji kegunaan rancangan baru.",
        },
        {
          isCorrect: false,
          label:
            'Kedua bagian mempertahankan klaim "Semua tahap produksi harus dicetak lengkap di bagian depan setiap kemasan" dari sudut yang sama tanpa menambahkan pemeriksaan.',
        },
        {
          isCorrect: false,
          label:
            'Bagian kedua membalik arah pembahasan dengan menyimpulkan "Jika kode tersedia, catatan pemasok tidak perlu lagi diperbarui" dari bukti "Singkong diiris di Desa Rawa dan digoreng di kota".',
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
