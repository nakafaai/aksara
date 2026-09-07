import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Nach Einführung und Quellenangaben können Zuschauer künstlerische Entscheidungen von überlieferten Varianten unterscheiden.",
        },
        {
          isCorrect: false,
          label:
            "Eine neue Anzeige im Foyer nennt die drei Aufnahmen, ohne zu erklären, welche Bühnenszenen aus welcher Fassung stammen.",
        },
        {
          isCorrect: false,
          label:
            "Die Gruppe wird Quellen und dramaturgische Änderungen im Programm nennen.",
        },
        {
          isCorrect: false,
          label:
            "Das gefundene schriftliche Stück wurde in den 1970er-Jahren veröffentlicht.",
        },
        {
          isCorrect: true,
          label:
            "Überprüfte Produktionsunterlagen zeigen, dass ein Veranstalter die Unterschiede eigens für das Aufnahmeprojekt schrieb und sie nicht aus der jeweiligen örtlichen Überlieferung stammten.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "After the introduction and sources are shown, viewers can distinguish artistic choices from variations present in the recordings.",
        },
        {
          isCorrect: false,
          label:
            "A new lobby display lists the three recordings without explaining which staged scenes came from each version.",
        },
        {
          isCorrect: false,
          label:
            "The group will identify sources and dramatic changes in the programme notes.",
        },
        {
          isCorrect: false,
          label:
            "The written script that was found was published in the 1970s.",
        },
        {
          isCorrect: true,
          label:
            "Verified production records show that one organiser scripted the differences specifically for the recording project, rather than each community inheriting its own variant.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Setelah pengantar dan sumber ditampilkan, penonton dapat membedakan pilihan artistik dari variasi yang memang terdapat dalam rekaman.",
        },
        {
          isCorrect: false,
          label:
            "Panel baru di lobi mencantumkan ketiga rekaman tanpa menjelaskan adegan panggung mana yang berasal dari setiap versi.",
        },
        {
          isCorrect: false,
          label:
            "Kelompok akan mencantumkan sumber dan perubahan dramatik dalam catatan program.",
        },
        {
          isCorrect: false,
          label: "Naskah tertulis yang ditemukan diterbitkan pada 1970-an.",
        },
        {
          isCorrect: true,
          label:
            "Catatan produksi terverifikasi menunjukkan bahwa perbedaan ketiga rekaman ditulis oleh satu penyelenggara khusus untuk proyek rekaman tersebut, bukan diwariskan oleh komunitas masing-masing.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
