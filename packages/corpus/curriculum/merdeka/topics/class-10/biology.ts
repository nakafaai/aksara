import {
  merdekaLearningOutcomes,
  scienceBookX,
} from "#corpus/curriculum/merdeka/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

export const merdekaClass10BiologyTopicNodes = [
  unitNode({
    children: [
      materialNode({
        key: "class-10-biology-biodiversity-material",
        level: "lesson",
        materialKeys: ["lesson.biology.biodiversity"],
        order: 10,
        outcomes: [
          {
            code: "IPA, Fase E, elemen Pemahaman IPA",
            ...merdekaLearningOutcomes,
          },
          {
            code: "Bab VI Keanekaragaman Makhluk Hidup, Interaksi dan Peranannya di Lingkungan",
            ...scienceBookX,
          },
        ],
      }),
    ],
    key: "class-10-biology-biodiversity",
    materialCard: {
      de: {
        description: "Untersuche Vielfalt, Ökosysteme, Bakterien und Pilze.",
        title: "Vielfalt der Lebewesen",
      },
      en: {
        description: "Connect bacterial shapes and life roles.",
        title: "Biodiversity of Living Organisms",
      },
      id: {
        description: "Kenali bentuk bakteri dan perannya.",
        title: "Keanekaragaman Makhluk Hidup",
      },
      ms: {
        description: "Kaitkan bentuk bakteria dengan peranannya.",
        title: "Biodiversiti Organisma Hidup",
      },
    },
    order: 10,
    translations: {
      de: {
        routeSlug: "vielfalt-der-lebewesen",
        title: "Vielfalt der Lebewesen",
      },
      en: {
        routeSlug: "biodiversity",
        title: "Biodiversity of Living Organisms",
      },
      id: {
        routeSlug: "keanekaragaman-makhluk-hidup",
        title: "Keanekaragaman Makhluk Hidup",
      },
      ms: {
        routeSlug: "biodiversiti",
        title: "Biodiversiti Organisma Hidup",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "class-10-biology-climate-change-material",
        level: "lesson",
        materialKeys: ["lesson.biology.climate-change"],
        order: 10,
        outcomes: [
          {
            code: "IPA, Fase E, elemen Pemahaman IPA",
            ...merdekaLearningOutcomes,
          },
          { code: "Bab VIII Perubahan Iklim", ...scienceBookX },
        ],
      }),
    ],
    key: "class-10-biology-climate-change",
    materialCard: {
      de: {
        description: "Untersuche Aktivitäten, die Wärme in der Luft halten.",
        title: "Klimawandel",
      },
      en: {
        description: "Trace how human activity traps heat.",
        title: "Climate Change",
      },
      id: {
        description: "Telusuri aktivitas yang memerangkap panas.",
        title: "Perubahan Iklim",
      },
      ms: {
        description: "Jejaki cara aktiviti manusia memerangkap haba.",
        title: "Perubahan Iklim",
      },
    },
    order: 20,
    translations: {
      de: { routeSlug: "klimawandel", title: "Klimawandel" },
      en: { routeSlug: "climate-change", title: "Climate Change" },
      id: { routeSlug: "perubahan-iklim", title: "Perubahan Iklim" },
      ms: { routeSlug: "perubahan-iklim", title: "Perubahan Iklim" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "class-10-biology-virus-role-material",
        level: "lesson",
        materialKeys: ["lesson.biology.virus-role"],
        order: 10,
        outcomes: [
          {
            code: "IPA, Fase E, elemen Pemahaman IPA",
            ...merdekaLearningOutcomes,
          },
          { code: "Bab II Virus dan Peranannya", ...scienceBookX },
        ],
      }),
    ],
    key: "class-10-biology-virus-role",
    materialCard: {
      de: {
        description: "Verfolge, wie Viren sich vermehren.",
        title: "Viren und ihre Rolle",
      },
      en: {
        description: "Follow how viruses copy inside host cells.",
        title: "Viruses and Their Role",
      },
      id: {
        description: "Ikuti cara virus menggandakan diri.",
        title: "Virus dan Peranannya",
      },
      ms: {
        description: "Ikuti cara virus membiak dalam sel perumah.",
        title: "Virus dan Peranannya",
      },
    },
    order: 30,
    translations: {
      de: { routeSlug: "viren-und-ihre-rolle", title: "Viren und ihre Rolle" },
      en: { routeSlug: "virus-role", title: "Viruses and Their Role" },
      id: { routeSlug: "virus-dan-peranannya", title: "Virus dan Peranannya" },
      ms: { routeSlug: "virus-dan-peranannya", title: "Virus dan Peranannya" },
    },
  }),
];
