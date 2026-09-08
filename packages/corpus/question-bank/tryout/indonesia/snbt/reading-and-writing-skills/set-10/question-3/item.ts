import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Ausgangsbeobachtung bewies, dass die Zutatenordnung den Unterschied verursachte.",
        },
        {
          isCorrect: false,
          label:
            "Das Team musste vor einer neuen Messung mehrere Kursmerkmale zugleich ändern.",
        },
        {
          isCorrect: false,
          label:
            "Das Ausgangsmuster rechtfertigte eine dauerhafte Zutatenordnung nach Rezeptschritten.",
        },
        {
          isCorrect: true,
          label:
            "Die Vermutung musste deshalb durch eine Ordnung der Zutaten nach Rezeptschritten geprüft werden.",
        },
        {
          isCorrect: false,
          label:
            "Die verbleibende Unsicherheit machte weitere Vergleiche überflüssig.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The baseline observation proved that grouping ingredients caused the difference.",
        },
        {
          isCorrect: false,
          label:
            "The team needed to change several class features at once before measuring again.",
        },
        {
          isCorrect: false,
          label:
            "The baseline pattern justified permanent grouping of ingredients by recipe stage.",
        },
        {
          isCorrect: true,
          label:
            "The hypothesis therefore needed to be tested by grouping ingredients by recipe stage.",
        },
        {
          isCorrect: false,
          label:
            "The remaining uncertainty made another comparison unnecessary.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pengamatan awal membuktikan bahwa pengelompokan bahan menyebabkan perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Tim perlu mengubah beberapa unsur kelas sekaligus sebelum mengukur ulang.",
        },
        {
          isCorrect: false,
          label: "Pola awal membenarkan pengelompokan bahan secara permanen.",
        },
        {
          isCorrect: true,
          label:
            "Oleh karena itu, dugaan tersebut perlu diuji dengan mengelompokkan bahan menurut tahap resep.",
        },
        {
          isCorrect: false,
          label:
            "Ketidakpastian yang tersisa membuat perbandingan lanjutan tidak diperlukan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
