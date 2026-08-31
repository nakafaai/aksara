import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Die Teilnehmer des zweiten Tests hatten die richtige Evakuierungsroute schon vor der neuen Nachricht auswendig gelernt.",
        },
        {
          isCorrect: false,
          label:
            "Eine neue Gruppe aus einem weiteren Dorf versteht nach der Überarbeitung Route und Zeit ebenfalls richtig.",
        },
        {
          isCorrect: false,
          label:
            "Eine zweite Ausstrahlung derselben überarbeiteten Fassung wird langsamer vorgelesen und führt zu einer etwas genaueren Wiedergabe der Route.",
        },
        {
          isCorrect: false,
          label:
            "Jede Fassung wird vor dem Einsatz erneut mit Bewohnern getestet.",
        },
        {
          isCorrect: false,
          label:
            "Das Team stellte in der neuen Nachricht die Handlung vor die Begründung.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The second-test participants had memorised the correct evacuation route before hearing the revised message.",
        },
        {
          isCorrect: false,
          label:
            "A new group from another village also understands the route and timing accurately after hearing the revision.",
        },
        {
          isCorrect: false,
          label:
            "A second broadcast of the same revised version is delivered more slowly and produces slightly more accurate recall of the route.",
        },
        {
          isCorrect: false,
          label: "Each version will be tested again with residents before use.",
        },
        {
          isCorrect: false,
          label:
            "The team placed the action before the reason in the revised message.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Peserta uji kedua ternyata telah menghafal rute evakuasi yang benar sebelum mendengar pesan revisi.",
        },
        {
          isCorrect: false,
          label:
            "Kelompok baru dari kampung lain juga memahami rute dan waktu secara tepat setelah mendengar versi revisi.",
        },
        {
          isCorrect: false,
          label:
            "Siaran kedua dengan versi revisi yang sama dibacakan lebih lambat dan menghasilkan ingatan rute yang sedikit lebih akurat.",
        },
        {
          isCorrect: false,
          label:
            "Setiap versi akan diuji lagi bersama warga sebelum digunakan.",
        },
        {
          isCorrect: false,
          label:
            "Tim menempatkan tindakan sebelum alasan dalam susunan pesan baru.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
