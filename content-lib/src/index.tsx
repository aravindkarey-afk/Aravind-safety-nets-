import type { ReactNode } from 'react';

// The Airo editor is not shipped with the export. Its list wrappers carry
// editorial metadata only; render the existing list without adding DOM.
export function ContentListContext({ children }: { field: string; children: ReactNode }) {
  return children;
}
