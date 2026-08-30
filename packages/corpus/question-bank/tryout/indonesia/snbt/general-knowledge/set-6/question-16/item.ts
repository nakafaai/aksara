import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Töpfe mit vollständigen Aufzeichnungen und kurze Aussagen von Nutzenden",
        },
        {
          isCorrect: true,
          label: "Der Wert mit Änderung, 30, lag über 20 und 22.",
        },
        {
          isCorrect: false,
          label:
            "Die Änderung verdient eine längere Prüfung, doch der kurze Versuch erlaubt keine allgemeine Gewissheit.",
        },
        {
          isCorrect: false,
          label:
            "Die Aussagen der Nutzenden stützten das Zahlenmuster, bewiesen aber keine einzelne Ursache.",
        },
        {
          isCorrect: false,
          label:
            "Vorsichtige Prüfung im Kontext Saatgutversuch im Unterricht: Karten zur Erfassung jeder Bewässerungszeit",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "pots with complete records and short comments from users",
        },
        {
          isCorrect: true,
          label: "The intervention value, 30, exceeded both 20 and 22.",
        },
        {
          isCorrect: false,
          label:
            "The change deserves a longer test, but the short trial does not support universal certainty.",
        },
        {
          isCorrect: false,
          label:
            "User comments supported the numerical pattern but did not prove a single cause.",
        },
        {
          isCorrect: false,
          label:
            "A cautious trial of cards recording each watering time: classroom seed trial",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "pot dengan catatan lengkap dan komentar singkat pengguna",
        },
        {
          isCorrect: true,
          label: "Nilai pada hari dengan perubahan, 30, melampaui 20 dan 22.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan layak diuji lebih lama, tetapi uji singkat itu belum mendukung kepastian universal.",
        },
        {
          isCorrect: false,
          label:
            "Komentar pengguna mendukung pola angka, tetapi tidak membuktikan satu penyebab tunggal.",
        },
        {
          isCorrect: false,
          label:
            "Uji Hati-hati dalam percobaan benih kelas: kartu pencatatan waktu penyiraman",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
