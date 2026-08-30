import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team prüfte Karten zur Erfassung jeder Bewässerungszeit (Saatgutversuch im Unterricht) und bewertete die Befunde vorsichtig.",
        },
        {
          isCorrect: true,
          label:
            "Die Änderung verdient eine längere Prüfung, doch der kurze Versuch erlaubt keine allgemeine Gewissheit.",
        },
        {
          isCorrect: false,
          label: "Der Wert mit Änderung, 30, lag über 20 und 22.",
        },
        {
          isCorrect: false,
          label:
            "Tage, an denen der bisherige Ablauf ohne die geprüfte Änderung beibehalten wurde",
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
          label:
            "The team tested cards recording each watering time in the classroom seed trial and interpreted the evidence cautiously.",
        },
        {
          isCorrect: true,
          label:
            "The change deserves a longer test, but the short trial does not support universal certainty.",
        },
        {
          isCorrect: false,
          label: "The intervention value, 30, exceeded both 20 and 22.",
        },
        {
          isCorrect: false,
          label:
            "days when the earlier process continued without the tested change",
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
          label:
            "Tim menguji kartu pencatatan waktu penyiraman pada percobaan benih kelas dan menafsirkan buktinya secara hati-hati.",
        },
        {
          isCorrect: true,
          label:
            "Perubahan layak diuji lebih lama, tetapi uji singkat itu belum mendukung kepastian universal.",
        },
        {
          isCorrect: false,
          label: "Nilai pada hari dengan perubahan, 30, melampaui 20 dan 22.",
        },
        {
          isCorrect: false,
          label:
            "hari ketika alur lama tetap digunakan tanpa perubahan yang diuji",
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
