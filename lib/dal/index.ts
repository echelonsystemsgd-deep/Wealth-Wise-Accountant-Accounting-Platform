/**
 * Wealth Wise Accountant — Data Access Layer (DAL) Root Module
 * Central entrypoint for multi-tenant data access, double-entry ledger operations, and audit trails.
 */

export * from "./types";
export * from "./interfaces";
export * from "./memoryRepository";
export * from "./postgresConnector";

import { IDataAccessLayer } from "./interfaces";
import { MemoryDataAccessLayer } from "./memoryRepository";

let dalInstance: IDataAccessLayer | null = null;

/**
 * Returns the active Data Access Layer instance.
 * Defaults to the in-memory transactional DAL with full tenancy enforcement.
 */
export function getDal(): IDataAccessLayer {
  if (!dalInstance) {
    dalInstance = new MemoryDataAccessLayer();
  }
  return dalInstance;
}

/**
 * Reset DAL instance (primarily for isolated test fixtures).
 */
export function resetDal(newInstance?: IDataAccessLayer): void {
  dalInstance = newInstance || null;
}
