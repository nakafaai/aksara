import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Der erste Teil vergleicht Zahlungsarten bei gleichartigen Nutzergruppen, der folgende überträgt das Ergebnis auf den gesamten Markt.",
        },
        {
          isCorrect: false,
          label:
            "Der erste Teil beschließt die Abschaffung der digitalen Spur, der folgende plant nur noch die Netzverbesserung.",
        },
        {
          isCorrect: false,
          label:
            "Der erste Teil findet einen Vorteil bei großen Einkäufen, der folgende erweitert digitale Zahlungen für diese Gruppe.",
        },
        {
          isCorrect: false,
          label:
            "Der erste Teil nennt Einwände der Nutzer, der folgende begegnet ihnen durch eine Pflicht zum Besitz geeigneter Geräte.",
        },
        {
          isCorrect: true,
          label:
            "Erste Daten führen zu einem Vorschlag, aufgeteilte Daten zeigen seine Grenzen und führen zu einer gemischten Lösung.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The first part compares payment methods among equivalent users, and the later part extends the result to the whole market.",
        },
        {
          isCorrect: false,
          label:
            "The first part decides to remove the digital lane, and the later part only schedules network improvements.",
        },
        {
          isCorrect: false,
          label:
            "The first part finds an advantage for large purchases, and the later part expands digital payment for that group.",
        },
        {
          isCorrect: false,
          label:
            "The first part presents user objections, and the later part addresses them by requiring everyone to own a suitable device.",
        },
        {
          isCorrect: true,
          label:
            "Initial data prompt a policy proposal, then disaggregated data reveal its limits and lead to a mixed decision.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bagian awal membandingkan dua cara pembayaran pada pengguna yang setara, lalu bagian berikutnya memperluas hasil itu ke seluruh pasar.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal memutuskan penghapusan jalur digital, lalu bagian berikutnya hanya merinci jadwal perbaikan jaringan.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menemukan keunggulan pada belanja besar, lalu bagian berikutnya menjelaskan perluasan digital untuk kelompok tersebut.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menyajikan keberatan pengguna, lalu bagian berikutnya mengatasinya dengan mewajibkan kepemilikan perangkat digital.",
        },
        {
          isCorrect: true,
          label:
            "Data awal memunculkan usulan kebijakan, lalu pemisahan data mengungkap batas usulan dan mengarahkan keputusan campuran.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
