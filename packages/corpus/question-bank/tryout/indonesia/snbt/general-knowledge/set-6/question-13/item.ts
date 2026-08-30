import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
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
          isCorrect: true,
          label:
            "Das Team prüfte Karten zur Erfassung jeder Bewässerungszeit (Saatgutversuch im Unterricht) und bewertete die Befunde vorsichtig.",
        },
        {
          isCorrect: false,
          label:
            "Vorsichtige Prüfung im Kontext Saatgutversuch im Unterricht: Karten zur Erfassung jeder Bewässerungszeit",
        },
        {
          isCorrect: false,
          label: "Der Wert mit Änderung, 30, lag über 20 und 22.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
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
          isCorrect: true,
          label:
            "The team tested cards recording each watering time in the classroom seed trial and interpreted the evidence cautiously.",
        },
        {
          isCorrect: false,
          label:
            "A cautious trial of cards recording each watering time: classroom seed trial",
        },
        {
          isCorrect: false,
          label: "The intervention value, 30, exceeded both 20 and 22.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
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
          isCorrect: true,
          label:
            "Tim menguji kartu pencatatan waktu penyiraman pada percobaan benih kelas dan menafsirkan buktinya secara hati-hati.",
        },
        {
          isCorrect: false,
          label:
            "Uji Hati-hati dalam percobaan benih kelas: kartu pencatatan waktu penyiraman",
        },
        {
          isCorrect: false,
          label: "Nilai pada hari dengan perubahan, 30, melampaui 20 dan 22.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
