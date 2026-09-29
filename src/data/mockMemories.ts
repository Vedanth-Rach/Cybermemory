import { HindsightMemory, MemoryStats } from '../types/memory';

export const INITIAL_MEMORIES: HindsightMemory[] = [
  {
    id: 'MEM-8902',
    incidentId: 'INC-2026-00317',
    originalAlert: 'Repeated authentication failures followed by a successful login from the same external IP range.',
    similarity: 94,
    rootCause: 'Compromised administrator credentials used in targeted spray following leaked VPN dump.',
    actionsTaken: [
      'Blocked source IP subnet (185.73.20.0/22)',
      'Revoked active Kerberos tickets and session tokens',
      'Forced administrative password reset',
      'Enforced FIDO2 hardware MFA requirement'
    ],
    resolution: 'Account credentials were compromised. Password reset and MFA enforcement resolved the incident.',
    outcome: 'Resolved',
    date: '2026-09-17 14:22',
    analyst: 'Elena Rostova',
    host: 'DC-01',
    target: 'admin@company.local',
    indicators: ['185.73.20.14', 'admin@company.local', 'DC-01', 'EventID 4625', 'EventID 4624'],
    tags: ['Credential Compromise', 'Brute Force', 'Domain Controller', 'External Threat'],
    matchRationale: 'Identical source IP ASN (AS49870), identical target account (admin@company.local), and identical initial pattern of 25+ failed 4625 events within 10 minutes.',
    learningImpact: 'Established strict automated rate-limiting on NTLM auth endpoints and reduced mean-time-to-contain from 45m to 8m.'
  },
  {
    id: 'MEM-8874',
    incidentId: 'INC-2026-00281',
    originalAlert: 'Credential stuffing attempt against privileged accounts.',
    similarity: 87,
    rootCause: 'Automated botnet leveraging public breach password dictionary against administrative endpoints.',
    actionsTaken: [
      'IP blocked at cloud WAF edge',
      'Affected accounts forced through password reset',
      'Audited concurrent logins for anomalies',
      'Added IP to corporate SOC intelligence blocklist'
    ],
    resolution: 'IP blocked and affected accounts forced through password reset.',
    outcome: 'Resolved',
    date: '2026-09-02 09:15',
    analyst: 'Marcus Vance',
    host: 'AUTH-GATEWAY-02',
    target: 'Domain Admins Group',
    indicators: ['185.73.18.99', 'Multiple Admin Accounts', 'User-Agent: Python-requests/2.28'],
    tags: ['Credential Stuffing', 'Botnet', 'WAF Rule', 'Password Policy'],
    matchRationale: 'Matching attacker infrastructure origin and velocity of failed logins targeting elevated security identifiers.',
    learningImpact: 'Triggered immediate perimeter block rule on similar proxy ranges.'
  },
  {
    id: 'MEM-8741',
    incidentId: 'INC-2026-00192',
    originalAlert: 'Multiple failed login attempts originating from an unfamiliar geographic location.',
    similarity: 79,
    rootCause: 'Off-hours unauthorized brute-force probing against external-facing management interface.',
    actionsTaken: [
      'Source blocked after confirming unauthorized activity',
      'Disabled legacy authentication protocols on exposed interface',
      'Reviewed Azure AD conditional access logs'
    ],
    resolution: 'Source blocked after confirming unauthorized activity.',
    outcome: 'Resolved',
    date: '2026-08-11 03:40',
    analyst: 'Sarah Jenkins',
    host: 'VPN-EDGE-01',
    target: 'sec_admin',
    indicators: ['185.73.22.10', 'VPN-EDGE-01', 'RADIUS Failures'],
    tags: ['Anomalous Location', 'VPN Access', 'Brute Force'],
    matchRationale: 'Overlapping geographic ASN and repeated failed authentications on perimeter gateways.',
    learningImpact: 'Enforced geofencing blocking on high-risk bulletproof hosting providers.'
  },
  {
    id: 'MEM-8610',
    incidentId: 'INC-2026-00143',
    originalAlert: 'Brute force attack on RDP gateway from compromised hosting provider.',
    similarity: 74,
    rootCause: 'External scanning node searching for exposed Remote Desktop services with default credentials.',
    actionsTaken: [
      'Rate limiting applied at perimeter firewall',
      'IP range added to perimeter blocklist',
      'Isolated edge gateway segment from internal DMZ'
    ],
    resolution: 'Rate limiting applied and IP range added to perimeter blocklist.',
    outcome: 'Resolved',
    date: '2026-07-28 22:10',
    analyst: 'Alex Mercer',
    host: 'RDP-GW-01',
    target: 'administrator',
    indicators: ['194.26.29.112', 'Port 3389', 'NLM Protocol'],
    tags: ['RDP', 'Brute Force', 'Firewall Rule'],
    matchRationale: 'High volume dictionary attack with identical target account namespace.',
    learningImpact: 'Deprecated exposed RDP gateways in favor of client VPN with mandatory MFA.'
  },
  {
    id: 'MEM-8502',
    incidentId: 'INC-2026-00098',
    originalAlert: 'Spraying attack against service principal accounts via legacy auth endpoint.',
    similarity: 68,
    rootCause: 'Low-and-slow authentication spray attempting to evade volumetric IDS detection thresholds.',
    actionsTaken: [
      'Disabled basic authentication protocol across tenant',
      'Cycled service principal client secrets',
      'Enabled real-time risk-based identity protection'
    ],
    resolution: 'Disabled basic authentication protocol and cycled secrets.',
    outcome: 'Resolved',
    date: '2026-06-19 11:05',
    analyst: 'Elena Rostova',
    host: 'AUTH-STS-01',
    target: 'svc_backup_cloud',
    indicators: ['45.154.255.8', 'Legacy IMAP/POP3', 'Distributed IPs'],
    tags: ['Password Spraying', 'Legacy Auth', 'Identity Protection'],
    matchRationale: 'Targeting enterprise service principals using credential spraying heuristics.',
    learningImpact: 'Created global tenant policy blocking non-modern authentication.'
  },
  {
    id: 'MEM-8950',
    incidentId: 'INC-2026-00402',
    originalAlert: 'Suspicious PowerShell DownloadString execution in user temp folder.',
    similarity: 52,
    rootCause: 'Malicious macro document delivered via spear-phishing attachment spawned child powershell.exe.',
    actionsTaken: [
      'Isolated infected host WS-984 from corporate LAN',
      'Killed parent WINWORD.EXE and powershell.exe processes',
      'Extracted C2 beacon URL and pushed global DNS sinkhole rule',
      'Initiated full EDR forensic disk snapshot'
    ],
    resolution: 'Endpoint isolated within 4 minutes. Phishing email purged from all user inboxes.',
    outcome: 'Resolved',
    date: '2026-09-24 16:30',
    analyst: 'Alex Mercer',
    host: 'WS-984',
    target: 'FINANCE-USERS',
    indicators: ['evil-c2-update.org', 'powershell.exe -enc', 'hash: 99a12c48...'],
    tags: ['PowerShell', 'Spear Phishing', 'Endpoint Isolation', 'C2'],
    matchRationale: 'Execution of encoded PowerShell commands with remote web client payload invocation.',
    learningImpact: 'Implemented PowerShell Constrained Language Mode on finance workstation OU.'
  },
  {
    id: 'MEM-8931',
    incidentId: 'INC-2026-00388',
    originalAlert: 'Unauthorized Domain Admins group membership modification.',
    similarity: 45,
    rootCause: 'Stolen IT contractor credentials used to elevate privileges via unmonitored script.',
    actionsTaken: [
      'Revoked rogue group membership immediately',
      'Disabled compromised contractor account and expired active sessions',
      'Audited Active Directory replication logs for persistence backdoors'
    ],
    resolution: 'Privileges stripped and Active Directory audited for backdoors. Zero lateral movement detected.',
    outcome: 'Resolved',
    date: '2026-09-20 18:00',
    analyst: 'Sarah Jenkins',
    host: 'DC-PRIMARY',
    target: 'Domain Admins',
    indicators: ['Event 4728', 'svc_it_helper', 'DC-PRIMARY'],
    tags: ['Privilege Escalation', 'Active Directory', 'Insider Threat'],
    matchRationale: 'Unscheduled membership change in Tier 0 Active Directory groups.',
    learningImpact: 'Enforced just-in-time PAM workflow for all Domain Admin assignments.'
  },
  {
    id: 'MEM-8890',
    incidentId: 'INC-2026-00344',
    originalAlert: 'Cobalt Strike malleable C2 beaconing over HTTPS to unregistered domain.',
    similarity: 40,
    rootCause: 'Zero-day vulnerability in third-party remote assist software exploited for initial beacon.',
    actionsTaken: [
      'Killed rogue process injected into explorer.exe',
      'Pushed firewall block for destination IP 193.106.191.24',
      'Updated vendor software across fleet via emergency patch'
    ],
    resolution: 'Beacon severed, host rebuilt from golden image, patch deployed enterprise-wide.',
    outcome: 'Resolved',
    date: '2026-09-12 10:14',
    analyst: 'Marcus Vance',
    host: 'WS-1002',
    target: 'SYSTEM',
    indicators: ['193.106.191.24', 'explorer.exe injection', 'Jitter 20%'],
    tags: ['Cobalt Strike', 'C2 Beacon', 'Memory Injection'],
    matchRationale: 'Periodic HTTP/S beaconing with high entropy payload profile.',
    learningImpact: 'Created proactive YARA rule for in-memory beacon detection.'
  }
];

export const INITIAL_MEMORY_STATS: MemoryStats = {
  totalMemories: 142,
  incidentsStored: 118,
  successfulRecalls: 894,
  averageSimilarity: 86.4,
  knowledgeGrowthRate: '+38% this quarter'
};
