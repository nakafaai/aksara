import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Studienanfänger der Universität $$P$$ gehören zur Gruppe der Schulabgänger ohne Abschluss",
        },
        {
          isCorrect: false,
          label:
            "Jeder Studienanfänger der Universität $$P$$ hat die Schule abgeschlossen",
        },
        {
          isCorrect: false,
          label:
            "Kein Schüler ohne Abschluss beginnt im selben Jahrgang an der Universität $$P$$",
        },
        {
          isCorrect: false,
          label:
            "Jeder Schüler ohne Abschluss nimmt am Vermittlungsprogramm der Schule teil",
        },
        {
          isCorrect: false,
          label:
            "Die beiden Gruppen Schulabschluss und Abgang ohne Abschluss überschneiden sich nicht",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Students entering University $$P$$ belong to the withdrawal category",
        },
        {
          isCorrect: false,
          label: "Every student entering University $$P$$ completed school",
        },
        {
          isCorrect: false,
          label:
            "No withdrawn student enters University $$P$$ in the same intake",
        },
        {
          isCorrect: false,
          label:
            "Every withdrawn student joins the school's job-placement program",
        },
        {
          isCorrect: false,
          label:
            "The completed-school and withdrawal categories do not overlap",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Siswa yang masuk Universitas $$P$$ termasuk kategori mengundurkan diri",
        },
        {
          isCorrect: false,
          label:
            "Setiap siswa yang masuk Universitas $$P$$ telah lulus sekolah",
        },
        {
          isCorrect: false,
          label:
            "Tidak ada siswa yang mengundurkan diri lalu masuk Universitas $$P$$ pada angkatan yang sama",
        },
        {
          isCorrect: false,
          label:
            "Setiap siswa yang mengundurkan diri mengikuti program penempatan kerja sekolah",
        },
        {
          isCorrect: false,
          label:
            "Kategori lulus dan kategori mengundurkan diri tidak saling tumpang tindih",
        },
      ],
    },
  },
};

export default item;
