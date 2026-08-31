import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Feldverfahren wird bei verändertem Wetter angepasst, ohne das Hauptziel oder die zentralen Messregeln zu ändern.",
        },
        {
          isCorrect: true,
          label:
            "Das Verfahren wird überarbeitet, nachdem bestätigte Beschwerden eine im ersten Test übersehene Hürde zeigen.",
        },
        {
          isCorrect: false,
          label:
            "Die Ausrüstung wird geprüft und verschlissene Teile werden ersetzt, bevor ein Ausfall eintritt.",
        },
        {
          isCorrect: false,
          label:
            "Die Methode erlaubt mehrere Durchführungswege, die denselben Ergebniskriterien unterliegen.",
        },
        {
          isCorrect: false,
          label:
            "Die Bewertung bezieht betroffene Gruppen mit unterschiedlichen Mobilitäts-, Sprach- und Zugangsbedürfnissen ein.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The field procedure is adjusted when the weather changes without altering the main objective or measurement rules.",
        },
        {
          isCorrect: true,
          label:
            "The procedure is revised after verified complaints reveal a barrier missed in the initial trial.",
        },
        {
          isCorrect: false,
          label:
            "Equipment is inspected and worn parts are replaced before a failure occurs.",
        },
        {
          isCorrect: false,
          label:
            "The method allows several implementation paths that remain subject to the same outcome criteria.",
        },
        {
          isCorrect: false,
          label:
            "The evaluation involves affected groups with different mobility, language, and access needs.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Prosedur lapangan disesuaikan saat cuaca berubah tanpa mengubah tujuan dan aturan ukur utama.",
        },
        {
          isCorrect: true,
          label:
            "Prosedur direvisi setelah keluhan terverifikasi menunjukkan hambatan yang tidak terdeteksi pada uji awal.",
        },
        {
          isCorrect: false,
          label:
            "Peralatan diperiksa dan komponen aus diganti sebelum kegagalan terjadi.",
        },
        {
          isCorrect: false,
          label:
            "Metode menyediakan beberapa jalur pelaksanaan yang tetap tunduk pada kriteria hasil yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Evaluasi melibatkan kelompok terdampak dengan kebutuhan mobilitas, bahasa, dan akses yang berbeda.",
        },
      ],
    },
  },
};

export default item;
