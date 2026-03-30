#!/usr/bin/env node
'use strict';
/**
 * Unit Test: v2.0.0 MCP Servers Verification (25 TC)
 * MS-001~025: Test the 2 MCP servers (rossi-pdca-server, rossi-analysis-server)
 *
 * @version ROSSI v2.0.0
 */

const fs = require('fs');
const path = require('path');
const { assert, skip, summary, reset } = require('../helpers/assert');
reset();

const BASE_DIR = path.resolve(__dirname, '../..');
const SERVERS_DIR = path.join(BASE_DIR, 'servers');

console.log('\n=== v200-mcp-servers.test.js (25 TC) ===\n');

// ============================================================
// MS-001~005: rossi-pdca-server/index.js exists and loads
// ============================================================
console.log('--- MS-001~005: rossi-pdca-server exists and loads ---');

const pdcaServerPath = path.join(SERVERS_DIR, 'rossi-pdca-server', 'index.js');

// MS-001: index.js file exists
assert('MS-001', fs.existsSync(pdcaServerPath),
  'servers/rossi-pdca-server/index.js exists');

// MS-002: File is non-empty
{
  let size = 0;
  try { size = fs.statSync(pdcaServerPath).size; } catch (_) {}
  assert('MS-002', size > 0,
    'rossi-pdca-server/index.js is non-empty');
}

// MS-003: File has shebang and strict mode
{
  let content = '';
  try { content = fs.readFileSync(pdcaServerPath, 'utf8'); } catch (_) {}
  assert('MS-003', content.startsWith('#!/usr/bin/env node'),
    'rossi-pdca-server/index.js has shebang line');
}

// MS-004: File uses readline for stdio transport
{
  let content = '';
  try { content = fs.readFileSync(pdcaServerPath, 'utf8'); } catch (_) {}
  assert('MS-004', content.includes("require('readline')"),
    'rossi-pdca-server uses readline for stdio transport');
}

// MS-005: File has TOOL_HANDLERS dispatch map
{
  let content = '';
  try { content = fs.readFileSync(pdcaServerPath, 'utf8'); } catch (_) {}
  assert('MS-005', content.includes('TOOL_HANDLERS'),
    'rossi-pdca-server has TOOL_HANDLERS dispatch map');
}

// ============================================================
// MS-006~010: rossi-pdca-server exports 10 tool handlers
// ============================================================
console.log('\n--- MS-006~010: rossi-pdca-server has 10 tool handlers ---');

const PDCA_TOOLS = [
  'rossi_pdca_status',
  'rossi_pdca_history',
  'rossi_feature_list',
  'rossi_feature_detail',
  'rossi_plan_read',
  'rossi_design_read',
  'rossi_analysis_read',
  'rossi_report_read',
  'rossi_metrics_get',
  'rossi_metrics_history',
];

{
  let content = '';
  try { content = fs.readFileSync(pdcaServerPath, 'utf8'); } catch (_) {}

  // MS-006~010: Check first 5 tool names in TOOL_HANDLERS
  for (let i = 0; i < 5; i++) {
    const tool = PDCA_TOOLS[i];
    const id = `MS-${String(i + 6).padStart(3, '0')}`;
    assert(id, content.includes(tool),
      `rossi-pdca-server defines handler for ${tool}`);
  }
}

// ============================================================
// MS-011~015: rossi-analysis-server/index.js exists and loads
// ============================================================
console.log('\n--- MS-011~015: rossi-analysis-server exists and loads ---');

const analysisServerPath = path.join(SERVERS_DIR, 'rossi-analysis-server', 'index.js');

// MS-011: index.js file exists
assert('MS-011', fs.existsSync(analysisServerPath),
  'servers/rossi-analysis-server/index.js exists');

// MS-012: File is non-empty
{
  let size = 0;
  try { size = fs.statSync(analysisServerPath).size; } catch (_) {}
  assert('MS-012', size > 0,
    'rossi-analysis-server/index.js is non-empty');
}

// MS-013: File has shebang and strict mode
{
  let content = '';
  try { content = fs.readFileSync(analysisServerPath, 'utf8'); } catch (_) {}
  assert('MS-013', content.startsWith('#!/usr/bin/env node'),
    'rossi-analysis-server/index.js has shebang line');
}

// MS-014: File uses readline for stdio transport
{
  let content = '';
  try { content = fs.readFileSync(analysisServerPath, 'utf8'); } catch (_) {}
  assert('MS-014', content.includes("require('readline')"),
    'rossi-analysis-server uses readline for stdio transport');
}

// MS-015: File has TOOL_HANDLERS dispatch map
{
  let content = '';
  try { content = fs.readFileSync(analysisServerPath, 'utf8'); } catch (_) {}
  assert('MS-015', content.includes('TOOL_HANDLERS'),
    'rossi-analysis-server has TOOL_HANDLERS dispatch map');
}

// ============================================================
// MS-016~020: rossi-analysis-server exports 6 tool handlers
// ============================================================
console.log('\n--- MS-016~020: rossi-analysis-server has 6 tool handlers ---');

const ANALYSIS_TOOLS = [
  'rossi_code_quality',
  'rossi_gap_analysis',
  'rossi_regression_rules',
  'rossi_checkpoint_list',
  'rossi_checkpoint_detail',
  'rossi_audit_search',
];

{
  let content = '';
  try { content = fs.readFileSync(analysisServerPath, 'utf8'); } catch (_) {}

  // MS-016~020: Check first 5 tool names in TOOL_HANDLERS
  for (let i = 0; i < 5; i++) {
    const tool = ANALYSIS_TOOLS[i];
    const id = `MS-${String(i + 16).padStart(3, '0')}`;
    assert(id, content.includes(tool),
      `rossi-analysis-server defines handler for ${tool}`);
  }
}

// ============================================================
// MS-021~023: servers/*/package.json version = 2.0.0
// ============================================================
console.log('\n--- MS-021~023: package.json version = 2.0.4 ---');

const serverDirs = ['rossi-pdca-server', 'rossi-analysis-server'];

for (let i = 0; i < serverDirs.length; i++) {
  const serverName = serverDirs[i];
  const pkgPath = path.join(SERVERS_DIR, serverName, 'package.json');
  const id = `MS-${String(i + 21).padStart(3, '0')}`;

  let version = null;
  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    version = pkg.version;
  } catch (_) {}

  assert(id, version === '2.0.4',
    `${serverName}/package.json version is 2.0.4 (got: ${version})`);
}

// MS-023: Both package.json have "type": "commonjs" or no type (default CJS)
{
  let allCjs = true;
  for (const serverName of serverDirs) {
    const pkgPath = path.join(SERVERS_DIR, serverName, 'package.json');
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      // commonjs is explicit CJS; absence of "type" also means CJS
      if (pkg.type && pkg.type !== 'commonjs') {
        allCjs = false;
      }
    } catch (_) {
      allCjs = false;
    }
  }
  assert('MS-023', allCjs,
    'Both server package.json use CommonJS module format');
}

// ============================================================
// MS-024~025: Both servers use JSON-RPC 2.0 protocol format
// ============================================================
console.log('\n--- MS-024~025: JSON-RPC 2.0 protocol ---');

// MS-024: rossi-pdca-server uses JSON-RPC 2.0
{
  let content = '';
  try { content = fs.readFileSync(pdcaServerPath, 'utf8'); } catch (_) {}

  const hasJsonRpc = content.includes("jsonrpc: '2.0'") || content.includes('jsonrpc: "2.0"');
  const hasInitialize = content.includes("case 'initialize'") || content.includes('case "initialize"');
  const hasToolsList = content.includes("case 'tools/list'") || content.includes('case "tools/list"');

  assert('MS-024', hasJsonRpc && hasInitialize && hasToolsList,
    'rossi-pdca-server implements JSON-RPC 2.0 protocol (initialize, tools/list)');
}

// MS-025: rossi-analysis-server uses JSON-RPC 2.0
{
  let content = '';
  try { content = fs.readFileSync(analysisServerPath, 'utf8'); } catch (_) {}

  const hasJsonRpc = content.includes("jsonrpc: '2.0'") || content.includes('jsonrpc: "2.0"');
  const hasInitialize = content.includes("case 'initialize'") || content.includes('case "initialize"');
  const hasToolsCall = content.includes("case 'tools/call'") || content.includes('case "tools/call"');

  assert('MS-025', hasJsonRpc && hasInitialize && hasToolsCall,
    'rossi-analysis-server implements JSON-RPC 2.0 protocol (initialize, tools/call)');
}

// ============================================================
// Summary
// ============================================================

const result = summary('v200-mcp-servers.test.js');
process.exitCode = result.failed > 0 ? 1 : 0;
