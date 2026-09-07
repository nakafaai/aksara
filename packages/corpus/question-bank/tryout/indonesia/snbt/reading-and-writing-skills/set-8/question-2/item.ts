import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "frühere Ergebnisse ohne neue Datenerhebung verwenden",
        },
        {
          isCorrect: true,
          label:
            "die Vorgaben zur Gruppengröße beibehalten, damit die Teilnahmebedingungen vergleichbar bleiben",
        },
        {
          isCorrect: false,
          label: "die Teilnehmerzahl bei unerwarteten Ergebnissen ändern",
        },
        {
          isCorrect: false,
          label: "alle Ergebnisse vor der Mittelwertbildung angleichen",
        },
        {
          isCorrect: false,
          label: "alle Teilnehmenden zu derselben Frage verpflichten",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "using earlier results without collecting new data",
        },
        {
          isCorrect: true,
          label:
            "retaining group-size requirements so that participant conditions remain comparable",
        },
        {
          isCorrect: false,
          label:
            "changing participant numbers whenever results do not meet expectations",
        },
        {
          isCorrect: false,
          label: "making all results equal before calculating a mean",
        },
        {
          isCorrect: false,
          label: "requiring every participant to ask the same question",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "menggunakan hasil lama tanpa mengumpulkan data baru",
        },
        {
          isCorrect: true,
          label:
            "mempertahankan ketentuan ukuran kelompok agar kondisi peserta tetap sebanding",
        },
        {
          isCorrect: false,
          label:
            "mengubah jumlah peserta setiap kali hasil tidak sesuai harapan",
        },
        {
          isCorrect: false,
          label: "menyamakan semua hasil sebelum menghitung rata-rata",
        },
        {
          isCorrect: false,
          label: "mewajibkan seluruh peserta memberikan pertanyaan yang sama",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
