import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Die Bewertung bezieht betroffene Gruppen mit unterschiedlichen Mobilitäts-, Sprach- und Zugangsbedürfnissen ein.",
        },
        {
          isCorrect: false,
          label:
            "Der Bericht vergleicht nur Gesamtkosten und Durchschnittsnutzen, ohne unterschiedliche Nutzerbedürfnisse zu berücksichtigen.",
        },
        {
          isCorrect: false,
          label:
            "Das Verfahren wird überarbeitet, nachdem bestätigte Beschwerden eine im ersten Test übersehene Hürde zeigen.",
        },
        {
          isCorrect: false,
          label:
            "Die Methode erlaubt mehrere Durchführungswege, die denselben Ergebniskriterien unterliegen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team legt Daten, Methoden, Ausschlussgründe und Grenzen offen, damit der Prozess geprüft werden kann.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The evaluation involves affected groups with different mobility, language, and access needs.",
        },
        {
          isCorrect: false,
          label:
            "The report compares only total costs and average benefits without distinguishing user needs.",
        },
        {
          isCorrect: false,
          label:
            "The procedure is revised after verified complaints reveal a barrier missed in the initial trial.",
        },
        {
          isCorrect: false,
          label:
            "The method allows several implementation paths that remain subject to the same outcome criteria.",
        },
        {
          isCorrect: false,
          label:
            "The team discloses data, methods, exclusion reasons, and limitations so the process can be examined.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Evaluasi melibatkan kelompok terdampak dengan kebutuhan mobilitas, bahasa, dan akses yang berbeda.",
        },
        {
          isCorrect: false,
          label:
            "Laporan hanya membandingkan biaya total dan manfaat rata-rata tanpa membedakan kebutuhan pengguna.",
        },
        {
          isCorrect: false,
          label:
            "Prosedur direvisi setelah keluhan terverifikasi menunjukkan hambatan yang tidak terdeteksi pada uji awal.",
        },
        {
          isCorrect: false,
          label:
            "Metode menyediakan beberapa jalur pelaksanaan yang tetap tunduk pada kriteria hasil yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Tim membuka data, metode, alasan pengecualian, dan keterbatasan agar proses dapat diperiksa.",
        },
      ],
    },
  },
};

export default item;
