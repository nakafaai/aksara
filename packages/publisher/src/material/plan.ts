import type { LocalCache } from "@nakafa/aksara-compiler/incremental";
import {
  type ContentLocale,
  compareContentHeads,
  headIdentity,
} from "@nakafa/aksara-contracts/content";
import type { ContentKey } from "@nakafa/aksara-contracts/ids";
import {
  type ContentChange,
  ContentDeleteSchema,
} from "@nakafa/aksara-contracts/release";
import type { MaterialEntry } from "@nakafa/aksara-corpus/material/registry";

/** Ephemeral prior-head view derived from compiler-owned cache identity. */
interface MaterialHeadState {
  readonly cache?: LocalCache;
  readonly contentKey: ContentKey;
  readonly locale: ContentLocale;
  readonly publicationIdentity?: string;
}

/** Canonical material work derived from current registry and prior local state. */
export type MaterialPlanTask =
  | {
      readonly change: Extract<ContentChange, { readonly operation: "delete" }>;
      readonly kind: "delete";
    }
  | {
      readonly entry: MaterialEntry;
      readonly kind: "upsert";
      readonly previousCache: LocalCache | undefined;
      readonly previousPublicationIdentity: string | undefined;
    };

/** Selects the real content head already owned by one planned operation. */
function taskHead(task: MaterialPlanTask) {
  if (task.kind === "delete") {
    return task.change;
  }
  return task.entry.route;
}

/**
 * Diffs canonical registry identities against opaque local state.
 * A new identity becomes an upsert and the removed identity becomes a tombstone.
 */
export function planMaterialEntries(
  entries: readonly MaterialEntry[],
  previous: readonly MaterialHeadState[]
) {
  const currentIdentities = new Set(
    entries.map(({ route }) => headIdentity(route))
  );
  const previousByIdentity = new Map(
    previous.map((entry) => [headIdentity(entry), entry])
  );
  const upserts: MaterialPlanTask[] = entries.map((entry) => {
    const prior = previousByIdentity.get(headIdentity(entry.route));
    return {
      entry,
      kind: "upsert",
      previousCache: prior?.cache,
      previousPublicationIdentity: prior?.publicationIdentity,
    };
  });
  const deletes: MaterialPlanTask[] = previous
    .filter((entry) => !currentIdentities.has(headIdentity(entry)))
    .map((entry) => ({
      change: ContentDeleteSchema.make({
        contentKey: entry.contentKey,
        locale: entry.locale,
        operation: "delete",
      }),
      kind: "delete",
    }));

  return [...upserts, ...deletes].sort((left, right) =>
    compareContentHeads(taskHead(left), taskHead(right))
  );
}
