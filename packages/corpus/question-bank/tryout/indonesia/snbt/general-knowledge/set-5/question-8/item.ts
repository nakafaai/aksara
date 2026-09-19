import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Dokumente am Anfang belegen einen einzigen Umzugstag, der folgende Teil entfernt die Aussage zum schrittweisen Umzug.",
        },
        {
          isCorrect: false,
          label:
            "Der erste Teil vergleicht die Sicherheit der Aussagen, der folgende wählt die überzeugendste Stimme für die Ausstellung.",
        },
        {
          isCorrect: false,
          label:
            "Der erste Teil erklärt Gebäudeschäden, der folgende bewertet Bautechniken, die den Umzug beschleunigten.",
        },
        {
          isCorrect: true,
          label:
            "Der Widerspruch führt zur Dokumentenprüfung, deren Ergebnis eine Deutung ermöglicht, die beide Stimmen bewahrt.",
        },
        {
          isCorrect: false,
          label:
            "Der erste Teil sammelt schriftliche Quellen, der folgende erklärt die Rekonstruktion für endgültig und nicht mehr prüfbedürftig.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The initial documents establish one moving day, and the later part removes the account of a staged move.",
        },
        {
          isCorrect: false,
          label:
            "The first part compares witness confidence, and the later part selects the most convincing voice for the exhibition.",
        },
        {
          isCorrect: false,
          label:
            "The first part explains building damage, and the later part evaluates construction techniques that accelerated the move.",
        },
        {
          isCorrect: true,
          label:
            "Conflicting testimony prompts document checking, whose results support an interpretation that retains both voices.",
        },
        {
          isCorrect: false,
          label:
            "The first part gathers written sources, and the later part declares the reconstruction final and beyond reassessment.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dokumen pada bagian awal menetapkan satu hari perpindahan, lalu bagian berikutnya menghapus kesaksian tentang perpindahan bertahap.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal membandingkan keyakinan narasumber, lalu bagian berikutnya memilih suara yang paling meyakinkan untuk pameran.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menjelaskan kerusakan gedung, lalu bagian berikutnya menilai teknik pembangunan yang mempercepat perpindahan.",
        },
        {
          isCorrect: true,
          label:
            "Pertentangan kesaksian memicu pemeriksaan dokumen, lalu hasilnya dipakai untuk menyusun tafsir yang tetap menampilkan kedua suara.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal mengumpulkan sumber tertulis, lalu bagian berikutnya menyatakan rekonstruksi sudah final dan tidak perlu diperiksa ulang.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
