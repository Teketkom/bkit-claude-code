/**
 * BkitError - Standardized Error Class
 * @module lib/core/errors
 * @version 2.0.0
 *
 * Unified error handling with error codes, severity levels, and context.
 * Error code format: ROSSI_{DOMAIN}_{DETAIL}
 */

// ============================================================
// Error Severity Levels
// ============================================================

/**
 * @typedef {'critical'|'error'|'warning'|'info'} ErrorSeverity
 */
const SEVERITY = {
  /** Immediate action required, workflow halted */
  CRITICAL: 'critical',
  /** Operation failed, fallback used */
  ERROR: 'error',
  /** Non-fatal issue, operation continues */
  WARNING: 'warning',
  /** Informational, logged only */
  INFO: 'info',
};

// ============================================================
// Error Codes by Domain
// ============================================================

const ERROR_CODES = {
  // PDCA Domain
  ROSSI_PDCA_STATUS_READ: 'ROSSI_PDCA_STATUS_READ',
  ROSSI_PDCA_STATUS_WRITE: 'ROSSI_PDCA_STATUS_WRITE',
  ROSSI_PDCA_STATUS_MIGRATE: 'ROSSI_PDCA_STATUS_MIGRATE',
  ROSSI_PDCA_PHASE_INVALID: 'ROSSI_PDCA_PHASE_INVALID',
  ROSSI_PDCA_TRANSITION_FAIL: 'ROSSI_PDCA_TRANSITION_FAIL',
  ROSSI_PDCA_FEATURE_LIMIT: 'ROSSI_PDCA_FEATURE_LIMIT',
  ROSSI_PDCA_ITERATION_LIMIT: 'ROSSI_PDCA_ITERATION_LIMIT',

  // State Domain
  ROSSI_STATE_READ: 'ROSSI_STATE_READ',
  ROSSI_STATE_WRITE: 'ROSSI_STATE_WRITE',
  ROSSI_STATE_LOCK_TIMEOUT: 'ROSSI_STATE_LOCK_TIMEOUT',
  ROSSI_STATE_LOCK_STALE: 'ROSSI_STATE_LOCK_STALE',
  ROSSI_STATE_CORRUPT: 'ROSSI_STATE_CORRUPT',
  ROSSI_STATE_MIGRATION: 'ROSSI_STATE_MIGRATION',

  // Hook Domain
  ROSSI_HOOK_STDIN_PARSE: 'ROSSI_HOOK_STDIN_PARSE',
  ROSSI_HOOK_OUTPUT_FAIL: 'ROSSI_HOOK_OUTPUT_FAIL',
  ROSSI_HOOK_TIMEOUT: 'ROSSI_HOOK_TIMEOUT',
  ROSSI_HOOK_MODULE_LOAD: 'ROSSI_HOOK_MODULE_LOAD',

  // Team Domain
  ROSSI_TEAM_STATE_READ: 'ROSSI_TEAM_STATE_READ',
  ROSSI_TEAM_STATE_WRITE: 'ROSSI_TEAM_STATE_WRITE',
  ROSSI_TEAM_MAX_TEAMMATES: 'ROSSI_TEAM_MAX_TEAMMATES',
  ROSSI_TEAM_NOT_AVAILABLE: 'ROSSI_TEAM_NOT_AVAILABLE',

  // Config Domain
  ROSSI_CONFIG_LOAD: 'ROSSI_CONFIG_LOAD',
  ROSSI_CONFIG_PARSE: 'ROSSI_CONFIG_PARSE',
  ROSSI_CONFIG_MISSING: 'ROSSI_CONFIG_MISSING',

  // Intent Domain
  ROSSI_INTENT_DETECT: 'ROSSI_INTENT_DETECT',
  ROSSI_INTENT_AMBIGUOUS: 'ROSSI_INTENT_AMBIGUOUS',

  // Plugin Domain
  ROSSI_PLUGIN_DATA_BACKUP: 'ROSSI_PLUGIN_DATA_BACKUP',
  ROSSI_PLUGIN_DATA_RESTORE: 'ROSSI_PLUGIN_DATA_RESTORE',
  ROSSI_PLUGIN_INIT: 'ROSSI_PLUGIN_INIT',
};

// ============================================================
// BkitError Class
// ============================================================

/**
 * Standardized ROSSI error with code, severity, and context.
 * @extends Error
 */
class BkitError extends Error {
  /**
   * @param {string} message - Human-readable error message
   * @param {Object} [options]
   * @param {string} [options.code='ROSSI_UNKNOWN'] - Error code from ERROR_CODES
   * @param {ErrorSeverity} [options.severity='error'] - Severity level
   * @param {Error} [options.cause] - Original error that caused this
   * @param {Object} [options.context] - Additional context (file path, feature name, etc.)
   */
  constructor(message, { code, severity, cause, context } = {}) {
    super(message);
    this.name = 'BkitError';
    this.code = code || 'ROSSI_UNKNOWN';
    this.severity = severity || SEVERITY.ERROR;
    this.cause = cause || null;
    this.context = context || {};
    this.timestamp = new Date().toISOString();
  }

  /**
   * Convert to JSON-safe object for logging/serialization
   * @returns {Object}
   */
  toJSON() {
    return {
      name: this.name,
      code: this.code,
      severity: this.severity,
      message: this.message,
      context: this.context,
      timestamp: this.timestamp,
      cause: this.cause
        ? { name: this.cause.name, message: this.cause.message, code: this.cause.code }
        : null,
    };
  }

  /**
   * Check if this is a critical error requiring workflow halt
   * @returns {boolean}
   */
  isCritical() {
    return this.severity === SEVERITY.CRITICAL;
  }

  /**
   * Format for debug log output
   * @returns {string}
   */
  toDebugString() {
    const causePart = this.cause ? ` (caused by: ${this.cause.message})` : '';
    return `[${this.code}] ${this.message}${causePart}`;
  }
}

// ============================================================
// Helper: Safe Catch Wrapper
// ============================================================

/**
 * Wrap a synchronous function call with standardized error handling.
 * On error, logs via debugLog (if available) and returns fallback.
 *
 * @param {Function} fn - Synchronous function to execute
 * @param {*} fallback - Fallback value returned on error
 * @param {Object} [context] - Error context options
 * @param {string} [context.code] - Error code for wrapping
 * @param {string} [context.module='ROSSI'] - Module name for debug logging
 * @returns {*} Function result or fallback value
 */
function safeCatch(fn, fallback, context) {
  const { code, module: mod } = context || {};
  try {
    return fn();
  } catch (e) {
    const rossiError =
      e instanceof BkitError
        ? e
        : new BkitError(e.message, {
            code: code || 'ROSSI_UNKNOWN',
            severity: SEVERITY.WARNING,
            cause: e,
          });

    // Log via debugLog if available (lazy require to avoid circular deps)
    try {
      const { debugLog } = require('./debug');
      debugLog(mod || 'ROSSI', rossiError.toDebugString(), rossiError.context);
    } catch (_) {
      // Debug module unavailable — silently ignore
    }

    return fallback;
  }
}

// ============================================================
// Exports
// ============================================================

module.exports = {
  BkitError,
  ERROR_CODES,
  SEVERITY,
  safeCatch,
};
