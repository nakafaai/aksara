import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'Der erste Teil vertritt die Behauptung "Das gefundene schriftliche Stück wurde in den 1970er-Jahren veröffentlicht"; der folgende nutzt "Jede Änderung einer Bearbeitung schadet zwangsläufig der Tradition" als Hauptbeleg.',
        },
        {
          isCorrect: true,
          label:
            "Die Quellenvielfalt erzeugt ein Authentizitätsproblem; Inszenierung und Programmheft bilden eine am Publikum prüfbare Antwort.",
        },
        {
          isCorrect: false,
          label:
            'Der erste Teil legt "Weil die Fassungen verschieden sind, muss die Gruppe weder Quellen noch Änderungen erklären" als endgültigen Schluss fest; der folgende nennt nur den Plan "Die Gruppe wird Quellen und dramaturgische Änderungen im Programm nennen".',
        },
        {
          isCorrect: false,
          label:
            'Beide Teile halten ohne zusätzliche Prüfung aus derselben Sicht an "Jede Änderung einer Bearbeitung schadet zwangsläufig der Tradition" fest.',
        },
        {
          isCorrect: false,
          label:
            'Der folgende Teil kehrt die Argumentation um und leitet "Weil die Fassungen verschieden sind, muss die Gruppe weder Quellen noch Änderungen erklären" aus dem Beleg "Das gefundene schriftliche Stück wurde in den 1970er-Jahren veröffentlicht" ab.',
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'The first part advances the claim "The written script that was found was published in the 1970s", and the later part uses "Every change in an adaptation necessarily damages tradition" as its main support.',
        },
        {
          isCorrect: true,
          label:
            "Source diversity creates a problem of authenticity, and staging plus programme notes provide a response that can be tested with audiences.",
        },
        {
          isCorrect: false,
          label:
            'The first part establishes "Because versions differ, the group need not explain any source or change" as a final conclusion; the later part only states the plan "The group will identify sources and dramatic changes in the programme notes".',
        },
        {
          isCorrect: false,
          label:
            'Both parts maintain the claim "Every change in an adaptation necessarily damages tradition" from the same perspective without adding a test.',
        },
        {
          isCorrect: false,
          label:
            'The later part reverses the argument by deriving "Because versions differ, the group need not explain any source or change" from the evidence "The written script that was found was published in the 1970s".',
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'Bagian awal mengajukan klaim "Naskah tertulis yang ditemukan diterbitkan pada 1970-an", lalu bagian kedua memakai "Setiap perubahan dalam adaptasi pasti merusak tradisi" sebagai dukungan utama.',
        },
        {
          isCorrect: true,
          label:
            "Keragaman sumber menimbulkan masalah keaslian, lalu rancangan panggung dan catatan program menjadi jawaban yang dapat diuji penonton.",
        },
        {
          isCorrect: false,
          label:
            'Bagian pertama menetapkan "Karena versi berbeda, kelompok tidak perlu menjelaskan sumber atau perubahan apa pun" sebagai simpulan final; bagian berikutnya hanya menyebut rencana "Kelompok akan mencantumkan sumber dan perubahan dramatik dalam catatan program".',
        },
        {
          isCorrect: false,
          label:
            'Kedua bagian mempertahankan klaim "Setiap perubahan dalam adaptasi pasti merusak tradisi" dari sudut yang sama tanpa menambahkan pemeriksaan.',
        },
        {
          isCorrect: false,
          label:
            'Bagian kedua membalik arah pembahasan dengan menyimpulkan "Karena versi berbeda, kelompok tidak perlu menjelaskan sumber atau perubahan apa pun" dari bukti "Naskah tertulis yang ditemukan diterbitkan pada 1970-an".',
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
