"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Returns true only after the component has mounted on the client. Use it to
 * gate client-only rendering (theme icons, random values) without hydration
 * mismatches or setState-in-effect lint errors.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
