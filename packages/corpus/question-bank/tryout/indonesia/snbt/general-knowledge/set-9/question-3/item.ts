import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Feldverfahren wird bei verändertem Wetter unterbrochen und nach Wetterbesserung unverändert fortgesetzt.",
        },
        {
          isCorrect: false,
          label:
            "Das Verfahren wird überarbeitet, nachdem bestätigte Beschwerden eine im ersten Test übersehene Hürde zeigen.",
        },
        {
          isCorrect: false,
          label:
            "Die Bewertung bezieht betroffene Gruppen mit unterschiedlichen Mobilitäts-, Sprach- und Zugangsbedürfnissen ein.",
        },
        {
          isCorrect: true,
          label:
            "Die Methode erlaubt mehrere Durchführungswege, die denselben Ergebniskriterien unterliegen.",
        },
        {
          isCorrect: false,
          label:
            "Dieselbe Kodierregel wird auf jede Gruppe und jeden Messzeitraum angewendet.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The field procedure stops when the weather changes and resumes unchanged once conditions recover.",
        },
        {
          isCorrect: false,
          label:
            "The procedure is revised after verified complaints reveal a barrier missed in the initial trial.",
        },
        {
          isCorrect: false,
          label:
            "The evaluation involves affected groups with different mobility, language, and access needs.",
        },
        {
          isCorrect: true,
          label:
            "The method allows several implementation paths that remain subject to the same outcome criteria.",
        },
        {
          isCorrect: false,
          label:
            "The same coding rule is applied to every group and every measurement period.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Prosedur lapangan dihentikan saat cuaca berubah, lalu dilanjutkan dengan cara yang sama setelah cuaca pulih.",
        },
        {
          isCorrect: false,
          label:
            "Prosedur direvisi setelah keluhan terverifikasi menunjukkan hambatan yang tidak terdeteksi pada uji awal.",
        },
        {
          isCorrect: false,
          label:
            "Evaluasi melibatkan kelompok terdampak dengan kebutuhan mobilitas, bahasa, dan akses yang berbeda.",
        },
        {
          isCorrect: true,
          label:
            "Metode menyediakan beberapa jalur pelaksanaan yang tetap tunduk pada kriteria hasil yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Aturan pengodean yang sama diterapkan pada setiap kelompok dan setiap waktu pengukuran.",
        },
      ],
    },
  },
};

export default item;
